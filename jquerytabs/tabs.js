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
    var problem = $(this).parent().next().find("#" + strId);
    problem.show();
    var newH = problem.height();

    $(this).parent().next().css("height", newH + 50);
    var outerContentHeight = newH + 120;
    $(this).parents(".content").css("height", outerContentHeight);
  });
});

$("document").ready(function() {
  var iframes = $(".tab > iframe");
  for (i = 0; i < iframes.length; i++) {
    var current = iframes[i];
    $(current).load(function(){
      console.log($(this));
      console.log($(this).get(0).contentDocument.body.offsetHeight);
      $(this).css("height", $(this).get(0).contentDocument.body.offsetHeight + 50);
    });
  }
  console.log("---");
  // console.log($(".tab > iframe").contents());
  // console.log($(".tab > iframe").get(0).contentDocument.body.style.height);
});