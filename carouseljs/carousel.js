//     ___                               _    _
//    / __\__ _ _ __ ___  _   _ ___  ___| |  (_)___
//   / /  / _` | '__/ _ \| | | / __|/ _ \ |  | / __|
//  / /__| (_| | | | (_) | |_| \__ \  __/ |_ | \__ \
//  \____/\__,_|_|  \___/ \__,_|___/\___|_(_)/ |___/
//                             Carousel.js |__/
//
//  Element Structure:
//  div.carousel
//  |- div.carousel-container
//     |- div.carousel-piece
//     |- ...
//  |- ul.carousel-tracker
//     |- li.carousel-select
//     |- li.carousel-dot
//     |- ...
//     |- li.carousel-spacer
//  |- img.carousel-left
//  |- img.carousel-right
//

// Classes
// Return a Carousel object for a given element ELEMENT.
var Carousel = function(element) {
  this.element = element; // div.carousel
  this.container = childrenWithClass(this.element, 'carousel-container')[0]; // Holds the pieces
  this.pieces = childrenWithClass(this.container, 'carousel-piece'); // List of piece boxes
  this.totalWidth = this.pieces.length * this.element.offsetWidth; // Width off all pieces combined
  this.parallaxImages = childrenWithClass(this.container, 'carousel-parallax'); // List of parllax images
  this.tracker = new Tracker(childrenWithClass(this.element, 'carousel-tracker')[0], this);
  // this.tracker = childrenWithClass(this.element, 'carousel-tracker')[0]; //
  // this.trackerDots = childrenWithClass(this.tracker, 'carousel-dot');
  // this.trackerStep = this.trackerDots[1].getBoundingClientRect().left - this.trackerDots[0].getBoundingClientRect().left;
  // this.trackerSelector = childrenWithClass(this.tracker, 'carousel-select')[0];
  // this.trackerSelector.style.setProperty("-webkit-transform", "translate3d(" + this.trackerStep.toString() + "px,0,0)") // THIS is with spacer dot...
  this.currentPiece = 0;
  this.hammer = new Hammer(this.container, {velocity:0.001,threshold:0});
  var myself = this;
  this.hammer.on('panmove', function(e) {
    updateActiveThreePositions(myself, e.deltaX, false);
    myself.tracker.panSelector(e.deltaX);
    // updatePosition(myself.trackerSelector, -1 * (e.deltaX / myself.element.offsetWidth) * myself.trackerStep + myself.currentPiece * myself.trackerStep + myself.trackerStep, 0, false); // ...in conjunction with + myself.trackerStep
    for (var i = 0, img; img = myself.parallaxImages[i++];) {
      updatePosition(img, e.deltaX / parseFloat(img.dataset.z) + -1 * myself.element.offsetWidth / parseFloat(img.dataset.z) * myself.currentPiece, '-50%', false);
    }
  });
  this.hammer.on('panend', function(e) {
    if (Math.abs(e.velocityX) > 1.0) {
      myself.cycle(e.velocityX > 0 ? 1 : -1);
    } else if (Math.abs(e.deltaX) > myself.container.offsetWidth / 2) {
      myself.cycle(e.deltaX > 0 ? -1 : 1);
    } else {
      myself.cycle(0);
    }
  });
}

function createElementWithClass(type, theClass) {
  var result = document.createElement(type);
  result.className = theClass;
  return result;
}

// Return a tracker object for a given element ELEMENT and Carousel object OWNER.
var Tracker = function(element, owner) {
  this.carousel = owner;
  this.element = element;

  // this.element.appendChild(createElementWithClass("li", "carousel-select"));
  // for (var _ = 0; _ < this.carousel.pieces.length; _++) {
  //   var dot = createElementWithClass("li", "carousel-dot");
  //   this.element.appendChild(dot);
  //   console.log("added dot");
  // }
  // this.element.appendChild(createElementWithClass("li", "carousel-spacer"));

  this.pageDots = childrenWithClass(this.element, 'carousel-dot');
  this.selectorDot = childrenWithClass(this.element, 'carousel-select')[0];
  this.step = this.pageDots[1].getBoundingClientRect().left - this.pageDots[0].getBoundingClientRect().left;

  this.selectorDot.style.setProperty("-webkit-transform", "translate3d(" + this.step.toString() + "px,0,0)") // THIS is with spacer dot...
  // this.selectorDot.style.setProperty("-webkit-transform", "translateX(" + this.step.toString() + "px)") // THIS is with spacer dot...
}
Tracker.prototype.panSelector = function(netChange) {
  var c = this.carousel;
  updatePosition(this.selectorDot, -1 * (netChange / c.element.offsetWidth) * this.step + c.currentPiece * this.step + this.step, 0, false);
}
Tracker.prototype.cycleSelector = function() {
  var c = this.carousel;
  updatePosition(this.selectorDot, c.currentPiece * this.step + this.step, 0, true);
}

Carousel.prototype.cycle = function(n) {
  // Flip n pieces. N may be negative or positive.
  this.currentPiece += n;
  if (this.currentPiece < 0) { this.currentPiece = 0; }
  else if (this.currentPiece > this.pieces.length - 1) { this.currentPiece = this.pieces.length - 1; }
  updateActiveThreePositions(this, 0, true);
  this.tracker.cycleSelector();
  // updatePosition(this.trackerSelector, this.currentPiece * this.trackerStep + this.trackerStep, 0, true);
  for (var i = 0, img; img = this.parallaxImages[i++];) {
    updatePosition(img, -1 * this.element.offsetWidth / parseFloat(img.dataset.z) * this.currentPiece, '-50%', true);
  }
}
function updateActiveThreePositions(carousel, leftOffset, smooth) {
  leftOffset += -1 * carousel.container.offsetWidth * carousel.currentPiece;
  var active = carousel.currentPiece;
  updatePosition(carousel.pieces[carousel.currentPiece], leftOffset, 0, smooth);
  if (carousel.currentPiece > 0) {
    var previousNumber = active - 1;
    updatePosition(carousel.pieces[previousNumber], leftOffset, 0, smooth);
  }
  if (carousel.currentPiece < carousel.pieces.length - 1) {
    var nextNumber = active + 1;
    updatePosition(carousel.pieces[nextNumber], leftOffset, 0, smooth);
  }
}
function updatePosition(element, leftOffset, topOffset, smooth) {
  if (smooth) {
    element.style.setProperty("-webkit-transition", "all .13s linear");
    element.style.setProperty("-moz-transition", "all .13s linear");
    element.style.setProperty("-o-transition", "all .13s linear");
    element.style.setProperty("transition", "all .13s linear");
  }
  element.style.setProperty("-webkit-transform", "translate3d(" + leftOffset.toString() + "px," + topOffset.toString() + ",0)");
  element.style.setProperty("transform", "translate3d(" + leftOffset.toString() + "px," + topOffset.toString() + ",0)");
  // element.style.setProperty("-webkit-transform", "translate(" + leftOffset.toString() + "px," + topOffset.toString() + ")");
  // element.style.setProperty("transform", "translate(" + leftOffset.toString() + "px," + topOffset.toString() + ")");
  if (smooth) {
    window.setTimeout(function() {
      element.style.setProperty("-webkit-transition", "none");
      element.style.setProperty("-moz-transition", "none");
      element.style.setProperty("-o-transition", "none");
      element.style.setProperty("transition", "none");
    }, 130); // 130ms = transition time
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
