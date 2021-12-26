#!/bin/bash

# Generate a compressed thumb.jpg adjacent to any cover.jpg in content/

set -euo pipefail

FILES=$(find content -name "cover.jpg")
PERCENT="60%"

for f in $FILES; do
    FOLDER=$(dirname "$f")
    echo "Compressing $f to $PERCENT"
    convert -strip -interlace Plane  -quality "$PERCENT" "$f" "$FOLDER/thumb.jpg"
done

