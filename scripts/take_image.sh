#!/bin/bash

os=$(uname)

check() {
    local bin=$1
    if ! $(which $bin &>/dev/null);then
        echo "Binary not found <$bin>. Bailing out."
        exit 1
    fi
}

# Binary checks
for b in uuencode sed grep tr rm;do
    check $b
done


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
