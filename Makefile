build:
	rm -rf blog/*
	jekyll build --source ../steven.codes\ blog/ --destination blog/

clean:
	rm -rf blog/*

# Jekyll support for -d with clean coming very soon
# clean:
	# jekyll clean --destination blog/
