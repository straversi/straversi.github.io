$(".tab").hide();

$("document").ready(function() {
  $("li").click(function() {
  	var str = $(this).text();
  	var strId = str.replace(" ", "-");

  	$(this).siblings().css("color", "black");
  	$(this).siblings().css("background", "#eee");
    $(this).siblings().css("border-right", "1px solid #eee");
    $(this).siblings().css("border-bottom", "1px solid #eee");
    if ($(this).parent().parent().attr("class") == "tab") {
      $(this).css("color", "#2B9A9A");
    } else {
      $(this).css("color", "orange");
    }
  	$(this).css("background", "white");
    $(this).css("border-right", "1px solid #ccc");
    $(this).css("border-bottom", "1px solid #ccc");

  	$(this).parent().next().find(".tab").hide();
    $(this).parent().next().find("#" + strId).show();

    var outerContentHeight = $(this).parent().next().height() + 100;
    $(this).parents(".content").css("height", outerContentHeight);
  });
});

$("document").ready(function() {
  var iframes = $(".tab > iframe");
  console.log(iframes.length);
  console.log(iframes);
  var iframe;
  for (iframe in iframes) {
    console.log(iframe);
    iframe.height = iframe.get(0).contentDocument.body.style.height;
    console.log(iframe.height);
  }
  // console.log($(".tab > iframe").contents());
  // console.log($(".tab > iframe").get(0).contentDocument.body.style.height);
});