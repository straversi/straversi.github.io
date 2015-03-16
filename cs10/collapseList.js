var collapseWidth = 680

$("document").ready(function() {
	$(".collapsible > li").append("<image class='toggler' src='Images/plus.svg'>");

	$(".collapsible > li").click(function() {
		$(this).find(".toggler").toggleClass("rotated");
		$(this).next().slideToggle(200);
	});
	$(".menu").click(function() {
		if ($(window).width() < collapseWidth) {
			$(this).children().toggleClass("rotated");
			$(this).next().slideToggle(200);
		};
	});
	$(window).resize(function() {
		if ($(window).width() > collapseWidth) {
			$(".collapsible").slideDown(function() {
				$(".collapsible").css("display", "inline-block");
			});
			$(".menu .toggler").addClass("rotated");
		};
	});

	$(".collapsible > ul > li").click(function() {
		var title = $(this).text();
		title = title.replace(/ /g, "-");
		var topic = $(this).parent().prev().text();
		topic = topic.replace(/ /g, "-");
		$("#view").load("cs10/Problems/" + topic + "/" + title + ".html", function() {
			$("button.Question").unbind("click", false);
			$("button.Question").bind("click", function() {
				$(this).next().toggle()
			});
			if (title == "Generator") {
				generator_setup();
			};
		});
		// var script = document.createElement("script");
		// script.src = "toggle.js"
		// $("#view").append(script);
		$("html, body").animate({
			scrollTop: $("#view").offset().top
    	}, 200);
	});
});

function generator_setup() {
	var decimal;
	var binary;
	var hex;
	$("#GO").click(function() {
		decimal = Math.floor((Math.random() * 400) + 1).toString();
		binary = Number(decimal).toString(2);
		hex = Number(decimal).toString(16);
		$("#DecimalArea, #BinaryArea, #HexArea").unbind("click");
		if ($("#radio1").is(":checked")) {
			// do decimal
			$("#DecimalArea").html(decimal).removeClass("reveal");
			$("#BinaryArea, #HexArea").html("").addClass("reveal").bind("click", reveal);
		} else if ($("#radio2").is(":checked")) {
			// do binary
			$("#BinaryArea").html(binary).removeClass("reveal");
			$("#DecimalArea, #HexArea").html("").addClass("reveal").bind("click", reveal);
		} else {
			// do hex
			$("#HexArea").html(hex).removeClass("reveal");
			$("#DecimalArea, #BinaryArea").html("").addClass("reveal").bind("click", reveal);
		}
	})

	function reveal(event) {
		$(this).removeClass("reveal");
		if ($(this).is("#DecimalArea")) {
			$(this).html(decimal).unbind("click");
		} else if ($(this).is("#BinaryArea")) {
			$(this).html(binary).unbind("click");
		} else {
			$(this).html(hex).unbind("click");
		}
	}
}