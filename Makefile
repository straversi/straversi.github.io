all:
	rm -rf blog/*
	rm -rf projects/*
	jekyll _3.1.6_ build --source ../blog/ --destination blog/
	jekyll _3.1.6_ build --source ../projects/ --destination projects/

the_blog:
	rm -rf blog/*
	jekyll _3.1.6_ build --source ../blog/ --destination blog/

the_projects:
	rm -rf projects/*
	jekyll _3.1.6_ build --source ../projects/ --destination projects/

clean:
	rm -rf blog/*
	rm -rf projects/*

# Jekyll support for -d with clean coming very soon...?
# clean:
	# jekyll clean --destination blog/
