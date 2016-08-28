// Gallery representing a group of images
// this.state = -1 when Gallery is off, (+) when Gallery is on.
var Gallery = function(className, imgurThumbnailFormat, assetPath) {
  this.className = className;
  this.images = document.getElementsByClassName(className);
  this.size = this.images.length;
  this.assetPath = assetPath;
  this.state = -1;
  this.galleryElement = false;
  this.imgElement = 0;
  this.captionElement = 0;
  this.buttonSize = 30;
  this.imgurThumbnailFormat = imgurThumbnailFormat;
  this.padding = "56px";
  this.smallWidth = "500px";

  // this.onclick = this.toggleOn()
  for (var i = 0, img; img = this.images[i]; i++) {
    var gallery = this;
    img.onclick = (function(initialState) {
      return function() { gallery.toggleOn(initialState); }
    }(i));
  }

  window.addEventListener("keydown", function(e) {
    switch (e.keyCode) {
      case 27: // escape
        gallery.toggleOff();
        break;
      case 37: // left arrow
        gallery.cycle(-1);
        break;
      case 39: // right arrow
        gallery.cycle(1);
        break;
    }
  });
}

Gallery.prototype.toggleOn = function(state) {
  this.state = state;
  if (!this.galleryElement) {
    this.createSelf();
  } else {
    this.getImageAndShow();
  }
};

Gallery.prototype.toggleOff = function() {
  this.state = -1;
  this.hideSelf();
};

Gallery.prototype.cycle = function(n) {
  // takes care of negative % problem
  this.state = ((this.state + this.size) + n) % this.size
  this.getImageAndShow();
};

Gallery.prototype.createSelf = function() {
  var element = document.createElement('div');
  element.className += "easy-gallery";
  element.id = "gallery-main";
  element.style.position = "fixed";
  element.style.left = "0";
  element.style.top = "0";
  element.style.right = "0";
  element.style.bottom = "0";
  element.style.zIndex = "10";
  element.style.padding = this.padding;
  var theCSS = "@media screen and (max-width:" + this.smallWidth + ") { .easy-gallery { padding: 0 !important; }}";
  if (document.querySelector('style')) {
    document.querySelector('style').textContent += theCSS;
  } else {
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(theCSS));
    head.appendChild(style);
  }
  element.style.background = "rgba(0,0,0,0.9)";
  element.style.textAlign = "center";
  document.body.appendChild(element);
  this.galleryElement = element;

  var imageContainer = document.createElement('div');
  imageContainer.id = "gallery-image-container";
  imageContainer.style.width = "100%";
  imageContainer.style.height = "100%";
  element.appendChild(imageContainer);

  var caption = document.createElement('div');
  caption.id = "gallery-caption";
  caption.style.color = "#fff";
  caption.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  caption.style.padding = "2px";
  caption.style.textAlign = "center";
  caption.style.position = "absolute";
  caption.style.bottom = "0";
  caption.style.left = "0";
  caption.style.width = "100%";
  // caption.style.height = "38px";
  this.captionElement = caption;
  element.appendChild(caption);

  this.imgElement = createImageElement();
  this.imgElement.id = "gallery-image-main";
  imageContainer.appendChild(this.imgElement);
  // Resize handling
  ;(function() {
      var throttle = function(type, name, obj) {
          obj = obj || window;
          var running = false;
          var func = function() {
              if (running) { return; }
              running = true;
               requestAnimationFrame(function() {
                  obj.dispatchEvent(new CustomEvent(name));
                  running = false;
              });
          };
          obj.addEventListener(type, func);
      };

      /* init - you can init any event */
      throttle("resize", "optimizedResize");
  })();
  var gallery = this;
  window.addEventListener("optimizedResize", function() {
    resizeImage(gallery.imgElement);
  });
  var gallery = this; // Use gallery over 'this' in click handlers
  var leftArrow  = createArrow('left', this.buttonSize, this.assetPath);
  var rightArrow = createArrow('right', this.buttonSize, this.assetPath);
  var x          = createX(this.buttonSize, this.assetPath);
  leftArrow.id = "gallery-left-arrow";
  rightArrow.id = "gallery-right-arrow";
  x.id = "gallery-x";
  element.onclick = function(e) {
    e = e || event;
    var target = e.target || e.srcElement;
    switch (target.id) {
      case "gallery-main":
      case "gallery-image-container":
      case "gallery-x":
        gallery.toggleOff();
        break;
      case "gallery-left-arrow":
        gallery.cycle(-1);
        break;
      case "gallery-right-arrow":
        gallery.cycle(1);
        break;
      case "gallery-image-main":
        window.open(target.src);
        break;
    }
  };
  element.appendChild(leftArrow);
  element.appendChild(rightArrow);
  element.appendChild(x);
  this.getImageAndShow();
}

function createImageElement() {
  var img = document.createElement('img');
  img.style.position = "relative";
  img.style.objectFit = "contain";
  return img;
}

// Create an arrow element with DIRECTION [left, right]
function createArrow(direction, size, assetPath) {
  var arrow = document.createElement('img');
  arrow.style.width = size + "px";
  arrow.style.position = "absolute";
  arrow.style.transform = "translateY(-50%)";
  arrow.style.top = "50%";
  arrow.style[direction] = 0;
  arrow.src = assetPath + direction + "-arrow.svg"
  return arrow;
}
function createX(size, assetPath) {
  var x = document.createElement('img');
  x.style.width = size + "px";
  x.style.position = "absolute";
  x.style.top = "0";
  x.style.left = "0";
  x.style.transform = "translate(12.5%, 12.5%)";
  x.src = assetPath + "x.svg";
  return x;
}

function resizeImage(img) {
  // width and heights are backups for img.objectFit = 'contain'.
  if (useFullHeight(img)) {
    img.style.height = "100%";
    img.style.width = "";
    img.style.transform = "";
    img.style.top = "";
  } else {
    img.style.width = "100%";
    img.style.height = "";
    img.style.transform = "translateY(-50%)";
    img.style.top = "50%";
  }
}

Gallery.prototype.showSelf = function() {
  this.galleryElement.style.display = "block";
}

Gallery.prototype.hideSelf = function() {
  this.galleryElement.style.display = "none";
}

Gallery.prototype.getImageAndShow = function() {
  // img = this.galleryElement.getElementsByTagName('img')[0];
  var img = this.imgElement;
  img.onload = function() {
    resizeImage(img);
  }
  var thumbnailSource = this.images[this.state].src;
  if (this.imgurThumbnailFormat) {
    var re = /^(.+)b\.(jpg|png)$/;
    var result = thumbnailSource.match(re);
    var fullSizeSource = result[1] + "." + result[2]; // removes the "b" for thumbnail
    img.src = fullSizeSource;
  } else {
    img.src = thumbnailSource;
  }
  var captionText = this.images[this.state].dataset.caption;
  if (captionText) {
    this.captionElement.innerHTML = captionText;
  } else {
    this.captionElement.innerHTML = "";
  }
  if (this.galleryElement.style.display != "block") {
    this.showSelf();
  }
}

function useFullHeight(img) {
  var imgW = img.width;
  var imgH = img.height;
  var windowW = window.innerWidth;
  var windowH = window.innerHeight;
  return (imgW / imgH < windowW / windowH);
}
