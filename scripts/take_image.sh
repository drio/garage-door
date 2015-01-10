#!/bin/bash

imagesnap - > snapshot.jpg
convert -resize 50% snapshot.jpg snapshot.png
cat snapshot.png | uuencode -m - | sed '$d' | grep -v begin-base64 | tr '\n' ' '
rm -f *.jpg *.png
