// This is not a merge function. It does simple animations. Sorry.

function tileSetup() {
  var tiles = document.querySelectorAll(".tile");
  for (var i = 0; i < tiles.length; i++) {
    tile = tiles[i];
    var tileValue = tile.dataset.val;
    tile.src = "2048_tiles/2048_" + tileValue + ".png";
    var fromNumber = tile.dataset.begin;
    var fromPercent = parseInt(fromNumber) * 25;
    tile.style.top = fromPercent + "%";
  }
}
function mergeBoard(lab) {
  var tiles = lab.previousElementSibling.children;
  var input = lab.querySelectorAll(":scope > input")[0];
  for (var i = 0; i < tiles.length; i++) {
    tile = tiles[i];
    if (input.checked) {
      var fromNumber = tile.dataset.end;
      var tileValue = tile.dataset.endval;
      input.nextElementSibling.innerHTML = "un-merge";
      setDownStyle(lab);
    } else {
      var fromNumber = tile.dataset.begin;
      var tileValue = tile.dataset.val;
      input.nextElementSibling.innerHTML = "merge up";
      setUpStyle(lab);
    }
    var fromPercent = parseInt(fromNumber) * 25;
    tile.style.top = fromPercent + "%";
    tile.style.opacity = tileValue == "0" ? "0.0" : "1.0";
    changeTileSource(tile, tileValue);
  }
}
function changeTileSource(tileElement, newValue) {
  tileElement.src = "2048_tiles/2048_" + newValue + ".png";
}



// Button styles
function setDownStyle(lab) {
  lab.style.borderBottom = "none";
  lab.style.marginTop = "12px";
  lab.style.backgroundColor = "rgb(1, 109, 184)";
}
function setUpStyle(lab) {
  lab.style.borderBottom = "2px solid rgb(7, 80, 136)";
  lab.style.marginTop = "10px";
  lab.style.backgroundColor = "rgb(46, 129, 193)";
}
