//
//    Carousel.js
//
//    Element Structure:
//    div.carousel
//    |- div.carousel-container
//       |- div.carousel-piece
//       |- ...
//    |- div.carousel-tracker
//    |- img.carousel-left
//    |- img.carousel-right
//
//

// Class
var Carousel = function(element) {
  this.element = element; // The highest element
  this.container = childrenWithClass(this.element, 'carousel-container')[0]; // Holds the pieces
  this.pieces = childrenWithClass(this.container, 'carousel-piece');
  this.totalWidth = this.pieces.length * this.element.offsetWidth;
  this.tracker = childrenWithClass(this.element, 'carousel-tracker')[0];
  this.trackerDots = childrenWithClass(this.tracker, 'carousel-dot');
  this.trackerStep = this.trackerDots[1].getBoundingClientRect().left - this.trackerDots[0].getBoundingClientRect().left;
  this.trackerSelector = childrenWithClass(this.tracker, 'carousel-select')[0];
  // this.trackerSelector.style.left = this.trackerSelector.getBoundingClientRect().left.toString() + "px"; // initialize for transitions
  for (var i = 0; i < this.pieces.length; i++) {
    this.pieces[i].childNumber = i;
  }
  this.currentPiece = 0;
  this.hammer = new Hammer(this.container, {velocity:0.001,threshold:0});
  var myself = this;
  this.hammer.on('panmove', function(e) {
    updateActiveThreePositions(myself, e.deltaX, false);
    updatePosition(myself.trackerSelector, -1 * (e.deltaX / myself.element.offsetWidth) * myself.trackerStep + myself.currentPiece * myself.trackerStep, false);
  });
  this.hammer.on('panend', function(e) {
    if (Math.abs(e.velocityX) > 0.1) {
      myself.cycle(e.velocityX > 0 ? 1 : -1);
    } else if (Math.abs(e.deltaX) > myself.container.offsetWidth / 2) {
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
  updatePosition(this.trackerSelector, this.currentPiece * this.trackerStep, true);
}
function updateActiveThreePositions(carousel, leftOffset, smooth) {
  leftOffset += -1 * carousel.container.offsetWidth * carousel.currentPiece;
  var active = carousel.currentPiece;
  updatePosition(carousel.pieces[carousel.currentPiece], leftOffset, smooth);
  if (carousel.currentPiece > 0) {
    var previousNumber = active - 1;
    updatePosition(carousel.pieces[previousNumber], leftOffset, smooth);
  }
  if (carousel.currentPiece < carousel.pieces.length - 1) {
    var nextNumber = active + 1;
    updatePosition(carousel.pieces[nextNumber], leftOffset, smooth);
  }
}
function updatePosition(element, leftOffset, smooth) {
  if (smooth) {
    element.style.setProperty("-webkit-transition", "all .13s linear");
    element.style.setProperty("-moz-transition", "all .13s linear");
    element.style.setProperty("-o-transition", "all .13s linear");
    element.style.setProperty("transition", "all .13s linear");
  }
  element.style.setProperty("-webkit-transform", "translateX(" + leftOffset.toString() + "px)")
  if (smooth) {
    window.setTimeout(function() {
      element.style.setProperty("-webkit-transition", "none");
      element.style.setProperty("-moz-transition", "none");
      element.style.setProperty("-o-transition", "none");
      element.style.setProperty("transition", "none");
    }, 130); // 100ms = transition time
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
