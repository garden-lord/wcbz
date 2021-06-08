dev: images
	hugo server -D

dist: images
	hugo -D

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

post:
	@mkdir -p content/$(TITLE)
	@rm -f content/$(TITLE)/index.md
	@echo '---' >> content/$(TITLE)/index.md
	@echo 'title: "The Title"' >> content/$(TITLE)/index.md
	@echo 'date: 2020-01-31' >> content/$(TITLE)/index.md
	@echo '---' >> content/$(TITLE)/index.md
	@echo '' >> content/$(TITLE)/index.md
	@echo '' >> content/$(TITLE)/index.md
	@echo '{{<img>}}![](something.jpg){{</img>}}' >> content/$(TITLE)/index.md
	@echo made content/$(TITLE)/index.md
