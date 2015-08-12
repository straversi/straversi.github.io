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
  this.currentPiece = 0;
  this.hammer = new Hammer(this.element, {velocity:0.001,threshold:0});
  var myself = this;
  this.hammer.on('panmove', function(e) {
    console.log(e);
    myself.pieces[myself.currentPiece].style.left = e.deltaX.toString() + "px";
    // console.log(myself.pieces[myself.currentPiece].style.left);
  });
  this.hammer.on('panend', function(e) {
    myself.pieces[myself.currentPiece].style.left = "0px";
  })
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

function applyFuncOnEach(func, collection) {
  var result = [];
  for (var i = 0; i < collection.length; i++) {
    result[i] = func(collection[i]);
  }
  return result;
}

carousels = applyFuncOnEach(function(e) {return new Carousel(e)}, carousels);
