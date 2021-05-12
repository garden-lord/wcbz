dev: images
	/snap/bin/hugo -F server -D

dist: images
	/snap/bin/hugo -D

wordcount:
	cd content
	find . -type f -name '*.md' -exec bash -c 'cat {} | wc -w'  \; | jq -s add

images:
	bash ./images.sh

setup:
	sudo apt install hugo imagemagick-6.q16 libimage-exiftool-perl
	# heic conversion:
	# sudo apt install libheif-examples

	# brew install hugo exiftool imagemagick
