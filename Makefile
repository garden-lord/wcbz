dev: images
	hugo server -D

dist: images
	hugo -D

images:
	bash ./images.sh

setup:
	sudo apt install hugo imagemagick-6.q16 libimage-exiftool-perl
	# heic conversion:
	# sudo apt install libheif-examples

	# brew install hugo exiftool imagemagick