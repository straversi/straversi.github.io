// A script for scrolling words, by Steven Traversi.
// Add the words you want to the array WORDS.

function gentlyFloat(thing, startY, size) {
	var windowWidth = $(window).width() + 300;
  var newLeft = "+=" + windowWidth.toString();

  $(thing).css("font-size", size);
  $(thing).css("position", "fixed");
  $(thing).css("top", startY);
  $(thing).css("left", -100);
  $(thing).animate({
    left: newLeft,
  }, 20000 - 400 * size, "linear", function() {
  	  // Animation complete, remove.
  	  $(thing).remove();
  });
};

var maxFontSize = 20; // actual: add 10
var words = ["html", "css", "javascript", "hello", "guitar", "java", "python", "design", "teaching", "wow", "such", "svg", "jquery", "junit", "coffee", "Snap", "git", "osx", "iworks"];
var count = 0;

(function play() {
	var item = words[Math.floor(Math.random()*words.length)];
	// console.log(item);
	$("body").append("<div id='" + item + count + "'>" + item + "</div>");
	myDiv = $("#" + item + count);

	var windowHeight = $(window).height();
	var rHeight = Math.floor(Math.random()*windowHeight) - 10;
	var rSize = Math.floor(Math.random()*maxFontSize) + 10;

	count = count + 1;
	gentlyFloat(myDiv, rHeight, rSize);
	
	setTimeout(function() {
		play();
	}, 300);
})();

