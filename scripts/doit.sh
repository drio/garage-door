#!/bin/bash

usage() {
    cat <<EOF
$ take_image.sh <action>
Actions are:
    toggle: Toogle relay.
    image : Take a picture and uuencode to stdout.
EOF
}


error() {
    local msg=$1
    echo "ERROR: $msg"
    usage
    exit 1
}


check() {
    local bin=$1
    if ! $(which $bin &>/dev/null);then
        error "Binary not found <$bin>. Bailing out."
    fi
}


image() {
    # Capture image
    if [ $os == "Darwin" ];then
        check imagesnap; check convert
        imagesnap -w 1 - > snapshot.jpg
        convert -resize 50% snapshot.jpg snapshot.png
    else
        check fswebcam
        fswebcam snapshot.png
    fi

    # Uuencode image
    cat snapshot.png | uuencode -m - | sed '$d' | grep -v begin-base64 | tr '\n' ' '
    rm -f *.jpg *.png
}

toggle() {
    if [ $os == "Linux" ];then
        check gpio
        sudo gpio write 7 0 ; sleep 1; sudo gpio write 7 1
    fi 
}


## Main
os=$(uname)
action=$1
[ ".$action" == "." ] && error "Need action"

# Binary checks
for b in uuencode sed grep tr rm;do
    check $b
done

$action
