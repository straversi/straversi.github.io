all: blog projects index

blog:
	rm -rf blog/*
	jekyll _3.1.6_ build --source ../blog/ --destination blog/

projects:
	rm -rf projects/*
	jekyll _3.1.6_ build --source ../projects/ --destination projects/

index:
	rm index.html
	rm -rf kite/*
	cp ../kite/index.html .
	cp -r ../kite/kite/* ./kite
	wget --post-data="input=`cat ./kite/main.css`" --output-document=./kite/main.css https://cssminifier.com/raw

clean:
	rm -rf blog/*
	rm -rf projects/*

# Jekyll support for -d with clean coming very soon...?
# clean:
	# jekyll clean --destination blog/
