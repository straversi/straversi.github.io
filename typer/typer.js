// A script for ghostly typing words, by Steven Traversi.
// Add the words you want to the array WORDS.

$(document).ready(function() {
	var toDo = 0;
	function animateBubble() {
		if (toDo == 0) {
			toDo = 0.5;
			$("#hiderBox")
				.animate({ width: "100%" }, 250)
				.animate({ height: "6px" }, 400)
				.animate({ width: "0px" }, 300, 
					function() {
						toDo = 1;
						var h1 = $("h1");
						if (!h1.is(":hover")) {
							animateBubble();
						}
				});
			$("#bigBox")
				.animate({ width: "100%" }, 300);
		} else if (toDo == 1) {
			toDo = -0.5;
			$("#hiderBox")
				.animate({ width: "100%" }, 250)
				.animate({ height: "56px" }, 400)
				.animate({ width: "67%" }, 300);
			$("#bigBox").delay(650)
				.animate({ width: "65%" }, 300,
					function() {
						toDo = 0;
				});
		}
		return;
	}


	$("h1").mouseenter(function(){
		animateBubble();
	});
	$("h1").mouseleave(function(){
		animateBubble();
	});
})

$(document).ready(function() {
	var typedWords = ["python", "java", "jquery", "javascript", "html5", "css3", "whatever you want, baby."];
	var typedWordsLength = typedWords.length;
	type(typedWords[0], 0, typedWords, 0);
	function type(word, letterIndex, list, wordIndex){

		var letterToAdd = word.substring(letterIndex, letterIndex + 1);
		$("#typer").append(letterToAdd);

		if (letterIndex == word.length - 1) {
			if (wordIndex == list.length - 1) {
				return;
			}
			setTimeout(function(){
				detype(list[wordIndex], letterIndex, list, wordIndex);
			}, 800);
			return;
		} else {
			letterIndex += 1;
		}

		setTimeout(function() {
			type(list[wordIndex], letterIndex, list, wordIndex);
		}, 200);
	}
	function detype(word, letterIndex, list, wordIndex){

		var deprecated = word.substring(0, letterIndex + 1);
		$("#typer").html(deprecated);

		if (letterIndex == -1) {
			wordIndex += 1;
			letterIndex = 0;
			setTimeout(function() {
				type(list[wordIndex], letterIndex, list, wordIndex);
			}, 300);
			return;
		} else {
			letterIndex -= 1;
		}

		setTimeout(function() {
			detype(list[wordIndex], letterIndex, list, wordIndex);
		}, 150);
	}
})
