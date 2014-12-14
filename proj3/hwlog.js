// A basic way to graph things. Will be improved.
// (c) 2014 Steven Traversi
//

var commits = [{revision:"r49004", message:"First commit.", y:0},
	{revision:"r49005", message:"update to 3-2", y:0},
	{revision:"r49035", message:"Wrote an Edge class, edge and vertex storage, vertexSize(), maxVertex(), and add().", y:15},
	{revision:"r49581", message:"Switching to ArrayLists for an EdgeList implementation.", y:30},
	{revision:"r49763", message:"Finished basic shtuffs, including iterations, in GraphObj.java. Woo! Time to submit basics.", y:45},
	{revision:"r49773", message:"Finished DirectedGraph.java and some unit tests in GraphTesting.java!", y:60},
	{revision:"r49866", message:"Going to go test basics now. Hopefully did directed/undirected correctly.", y:70},
	{revision:"r49876", message:"Well directed/undirected pass MY tests...", y:75},
	{revision:"r49895", message:"proj3-basics", y:75},
	{revision:"r49921", message:"Adding more tests.... Cleaned some stuff up... Please pass", y:70},
	{revision:"r50403", message:"proj3-basics2", y:65},
	{revision:"r50422", message:"proj3-basics2", y:55},
	{revision:"r50424", message:"proj3-basics2", y:45},
	{revision:"r50610", message:"proj3-basics2", y:35},
	{revision:"r50641", message:"proj3-basics2", y:20},
	{revision:"r50660", message:"proj3-basics2", y:5},
	{revision:"r50662", message:"proj3-basics2", y:-10},
	{revision:"r50880", message:"proj3-basics2", y:-25},
	{revision:"r50895", message:"proj3-basics2", y:-40},
	{revision:"r50916", message:"proj3-basics2", y:-55},
	{revision:"r50932", message:"proj3-basics2", y:-70},
	{revision:"r50951", message:"proj3-basics2", y:-85},
	{revision:"r51315", message:"Have completed basic-tests2, and traversals. Hopefully.", y:0},
	{revision:"r56480", message:"Chuggin' along on A* search ...", y:10},
	{revision:"r57520", message:"Almost done with trip!!!", y:40},
	{revision:"r57525", message:"FINISHED TRIP. BEST NIGHT EVER. I LOVE COMPUTER SCIENCE. ALSO MY REPOSRTSEGMENT METHOD IS REALLY BBAD. I HOPE TO REDO IT SOON.", y:90},
	{revision:"r59026", message:"proj3-basics3", y:70},
	{revision:"r59041", message:"proj3-basics3", y:70},
	{revision:"r59054", message:"Removed a file with a changed name.", y:70},
	{revision:"r59066", message:"Chnged file name AGAIN for proj3 basics testing", y:70},
	{revision:"r59071", message:"proj3-basics3", y:65},
	{revision:"r59394", message:"Started make. very confusing.", y:60},
	{revision:"r62815", message:"Need to crack the Make!", y:60},
	{revision:"r63368", message:"PASSED THE MAKE CHECK YES!", y:100},
	{revision:"r63373", message:"whoops", y:100},
	{revision:"r63375", message:"resubmit", y:100},
	{revision:"r63387", message:"Added heurisitic for trip.", y:105},
	{revision:"r63434", message:"proj3-basics3", y:100},
	{revision:"r63617", message:"Tidied up Trip.java's reportSegment().", y:105},
	{revision:"r63636", message:"Added && statement thing", y:105},
	{revision:"r63659", message:"toString not needed in print statements doofus", y:105},
	{revision:"r65224", message:"The Positive Infinity update", y:110},
	{revision:"r66059", message:"GraphTest instead of GraphTesting", y:105},
	{revision:"r66303", message:"hopefully fixed trip.", y:100},
	{revision:"r66882", message:"FIXED FERKING POSTVISIT!", y:110},
	{revision:"r67412", message:"Woooo", y:110},
	{revision:"r67421", message:"Name change again.", y:110},
	{revision:"r67481", message:"Trying an '_actualTargets' list in make", y:110},
	{revision:"r67737", message:"Success! Trying with updated ages.", y:120},
	{revision:"r68565", message:"Whfidosljk", y:-140}, // First Autograder
	{revision:"r69138", message:"Fixed something in simpleshortestpaths...", y:-150},
	{revision:"r69215", message:"Iterator to Iterable.", y:-130},
	{revision:"r72024", message:"removed decimal format", y:-130},
	{revision:"r72031", message:"removed decimalformat import and construction", y:-130},
	{revision:"r72091", message:"Some updates", y:-100},
	{revision:"r72173", message:"woooooo not", y:-140},
	{revision:"r73445", message:"post visit fix hopefully", y:-110},
	{revision:"r73582", message:"fix astar maybe", y:-105},
	{revision:"r74273", message:"improved runtime of graphobj...", y:-100},
	{revision:"r74428", message:"Fixed postVisit??", y:-95},
	{revision:"r74853", message:"RTFM", y:-50},
	{revision:"r75023", message:"Updated postvisit-y stuff with a new data structure!", y:-45},
	{revision:"r75740", message:"Deleted private _G which was there for some reason.", y:-40},
	{revision:"r75757", message:"Hopefully fixed end of path issues", y:-35},
	{revision:"r75777", message:"OMGOMGOMG I may have fixed A* searching.", y:20},
	{revision:"r75889", message:"uhhgg.", y:-50},
	{revision:"r76085", message:"kdjslfjkdslfjdskl", y:-70},
	{revision:"r77063", message:"Added an invalid-ifier in pathTo(int v)", y:-70},
	{revision:"r77102", message:"put traversal in set paths like I was supposed to in the last commit", y:-71},
	{revision:"r77435", message:"wahhh", y:-80},
	{revision:"r77503", message:"Let's go Let's go", y:-60},
	{revision:"r77695", message:"jkljkl", y:-80},
	{revision:"r77714", message:"starting location can be different", y:-70},
	{revision:"r77994", message:"changed the while loop", y:-65},
	{revision:"r78012", message:"moved fringe.remove", y:-65},
	{revision:"r78127", message:"updated pathTo check", y:-60},
	{revision:"r78354", message:"FINISHED DAT STYLE CHECK YO", y:-59},
	{revision:"r78367", message:"wtf is this", y:-90},
	{revision:"r78513", message:"sdfklj", y:-120},
	{revision:"r78657", message:"I need to be taught something", y:-120},
	{revision:"r79365", message:"testing location of fringe.remove() ONLY", y:-115},
	{revision:"r79410", message:"confirmed remove should happen outside", y:-110},
	{revision:"r80164", message:"Did ah finish le make?", y:-100},
	{revision:"r80214", message:"Trying cur equals v", y:-100},
	{revision:"r80224", message:"Literally added the word Error: to the rebuild message", y:-90},
	{revision:"r80271", message:"SDKJFLDSKJFDLSFKJDS", y:120},
	{revision:"r81051", message:"Added a make check", y:120},
	];
$(document).ready(function() {
	var top;
	var y1;
	var y2;
	var color;
	var nodeSize = 4;
	var shift = 200;
	var scaleY = 1.5;
	var scaleX = 13;
	// Lay down some scalable vector graphics
	for (var i = 0; i < commits.length - 1; i++) {
		top = -scaleY * commits[i].y;
		y1 = (top + shift);
		y2 = (commits[i + 1].y * -scaleY + shift);
		if (y1 >= y2) {
			color = "#0D6A2A";
		} else {
			color = "#6C1609";
		}
		$("#graph").append(
			"<svg width='" + 1500 + "px' height='" + 2000 + "px' xmlns='http://www.w3.org/2000/svg'>"
			+ "<line x1='" + i * scaleX + "' y1='" + (top + shift) + "' "
			+ "x2='" + (i + 1) * scaleX + "' y2='" + (commits[i + 1].y * -scaleY + shift) + "' "
			+ "stroke-width='" + 2 + "' stroke='" + color + "'/>"
			+ "/svg>"
			);
	}
	// Rub up some nodes and slap em on top
	// Kept separate for layering, would need z-index loop anyway (can't z-index added element live) 
	for (var i = 0; i < commits.length; i++) {
		top = -scaleY * commits[i].y;
		$("#graph").append("<div class='node' style='position: absolute;top: " + (top + shift - nodeSize) + "px;left: " + i * scaleX + "px;'>"
			+ "<div class='box'>"
			+ "<span class='revision'>"
			+ commits[i].revision
			+ "</span>"
			+ "<span class='message'>"
			+ commits[i].message
			+ "</span>"
			+ "</div>"
			+ "</div>");
	}
	// $("body").html($("body").html()); svg reset if needed
});




