$("document").ready(function() {
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
})