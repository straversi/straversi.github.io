var lst = ["c", "e", "g", "b", "cH"];

$(document).on('mouseover', 'div', function(event) {
  $("<audio></audio>").attr({
  	"src":"notes2/" + lst[Math.floor(Math.random()*lst.length)] + ".mp3",
  	"autoplay":"autoplay"
  }).appendTo("body");
});

  // var r = lst[Math.floor(Math.random()*lst.length)];
  // console.log(r);
  // var audio = $("#" + r)[0];
  // audio.play();