#!/bin/bash

set -euo pipefail

# convert -strip -interlace Plane  -quality 85% cover.jpg result.jpg

FILES=$(find content -name "cover.jpg")
PERCENT="60%"

for f in $FILES; do
    FOLDER=$(dirname "$f")
    echo "Compressing $f to $PERCENT"
    convert -strip -interlace Plane  -quality "$PERCENT" "$f" "$FOLDER/thumb.jpg"
done