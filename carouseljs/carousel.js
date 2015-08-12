//
//    Carousel.js
//
//    Element Structure:
//    div.carousel
//    |- div.carousel-piece
//    |- div.carousel-piece
//    |- div.carousel-tracker
//    |- img.carousel-left
//    |- img.carousel-right
//
//

// Class
var Carousel = function(element) {
  this.element = element;
  this.pieces = childrenWithClass(this.element, 'carousel-piece');
  for (var i = 0; i < this.pieces.length; i++) {
    this.pieces[i].childNumber = i;
  }
  this.currentPiece = 0;
  this.hammer = new Hammer(this.element, {velocity:0.001,threshold:0});
  var myself = this;
  this.hammer.on('panmove', function(e) {
    updateActiveThreePositions(myself, e.deltaX, false);
  });
  this.hammer.on('panend', function(e) {
    if (Math.abs(e.velocityX) > 0.2) {
      myself.cycle(e.velocityX > 0 ? 1 : -1);
    } else if (Math.abs(e.deltaX) > myself.element.offsetWidth / 2) {
      myself.cycle(e.deltaX > 0 ? -1 : 1);
    } else {
      myself.cycle(0);
    }
  });
}
Carousel.prototype.cycle = function(n) {
  // Flip n pieces. N may be negative or positive.
  this.currentPiece += n;
  if (this.currentPiece < 0) { this.currentPiece = 0; }
  else if (this.currentPiece > this.pieces.length - 1) { this.currentPiece = this.pieces.length - 1; }
  updateActiveThreePositions(this, 0, true);
}
function updateActiveThreePositions(carousel, leftOffset, smooth) {
  leftOffset += -1 * carousel.element.offsetWidth * carousel.currentPiece;
  var active = carousel.currentPiece;
  updatePosition(carousel.pieces[carousel.currentPiece], leftOffset, smooth);
  if (carousel.currentPiece > 0) {
    var previousNumber = active - 1;
    updatePosition(carousel.pieces[previousNumber], leftOffset, smooth);
  } else if (carousel.currentPiece < carousel.pieces.length - 1) {
    var nextNumber = active + 1;
    updatePosition(carousel.pieces[nextNumber], leftOffset, smooth);
  }
}
function updatePosition(element, leftOffset, smooth) {
  if (smooth) {
    element.style.setProperty("-webkit-transition", "left .1s linear");
    element.style.setProperty("-moz-transition", "left .1s linear");
    element.style.setProperty("-o-transition", "left .1s linear");
    element.style.setProperty("transition", "left .1s linear");
  }
  element.style.left = leftOffset.toString() + "px";
  if (smooth) {
    window.setTimeout(function() {
      element.style.setProperty("-webkit-transition", "none");
      element.style.setProperty("-moz-transition", "none");
      element.style.setProperty("-o-transition", "none");
      element.style.setProperty("transition", "none");
    }, 100);
  }
}

function childrenWithClass(element, targetClass) {
  var result = [];
  var children = element.children;
  for (var i = 0, e; e = element.children[i++];) {
    if (e.className.split(" ").indexOf(targetClass) > -1) {
      result.push(e);
    }
  }
  return result;
}

// Application
carousels = document.getElementsByClassName('carousel');

function map(func, collection) {
  var result = [];
  for (var i = 0; i < collection.length; i++) {
    result[i] = func(collection[i]);
  }
  return result;
}

carousels = map(function(e) {return new Carousel(e)}, carousels);
