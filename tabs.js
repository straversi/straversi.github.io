$(".tab").hide();

// DON'T JUDGE ME, I WAS YOUNG AND UNEDUCATED
$("document").ready(function() {
  $(".tabs li").click(function() {
  	var str = $(this).text();
  	var strId = str.replace(/ /g, "-");

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

    $(this).parent().next().css("height", newH + 30);
    var outerContentHeight = newH + 100;
    $(this).parents(".content").css("height", outerContentHeight);
  });

  $("Button").click(function(){
    $(this).next().toggle();
    
    var problem = $(this).closest(".tab");
    var newH = problem.height();

    $(this).closest(".content").css("height", newH + 30);
    var outerContentHeight = newH + 100;
    $(this).closest(".content").parents(".content").css("height", outerContentHeight);
  });
});

// function renderHeight(name) {
//   var obj = document.getElementById(name).firstElementChild;
//   var newHeight = obj.contentDocument.body.style.height;
//   var newHeightNum = Number(newHeight.substring(0, newHeight.length - 2)) + 50;
//   obj.height = newHeightNum.toString() + "px";
// }


// $("document").ready(function() {
//   $("h1").click(function() {
//     var iframes = $(".tab > iframe");
//     console.log(iframes);
//     for (i = 0; i < iframes.length; i++) {
//         console.log($(iframes[i]));
//         console.log($(iframes[i]).get(0).contentDocument.body.offsetHeight);
//         $(iframes[i]).css("height", $(iframes[i]).get(0).contentDocument.body.offsetHeight);
//     }
//     console.log("-?-");
//   });
// });

// $("document").ready(function() {
//   var iframes = $(".tab > iframe");
//   console.log(iframes);
//   $(iframes[0]).load(function(){
//     console.log($(this));
//     console.log($(this).get(0).contentDocument.body.offsetHeight);
//     $(this).css("height", $(this).get(0).contentDocument.body.offsetHeight);
//   });
//   $(iframes[1]).load(function(){
//     console.log($(this));
//     console.log($(this).get(0).contentDocument.body.offsetHeight);
//     $(this).css("height", $(this).get(0).contentDocument.body.offsetHeight);
//   });
//   $(iframes[2]).load(function(){
//     console.log($(this));
//     console.log($(this).get(0).contentDocument.body.offsetHeight);
//     $(this).css("height", $(this).get(0).contentDocument.body.offsetHeight);
//   });
//   $(iframes[3]).load(function(){
//     console.log($(this));
//     console.log($(this).get(0).contentDocument.body.offsetHeight);
//     $(this).css("height", $(this).get(0).contentDocument.body.offsetHeight);
//   });
//   $(iframes[4]).load(function(){
//     console.log($(this));
//     console.log($(this).get(0).contentDocument.body.offsetHeight);
//     $(this).css("height", $(this).get(0).contentDocument.body.offsetHeight);
//   });
//   console.log("---");
// });