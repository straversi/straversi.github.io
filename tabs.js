strictTabStructure = true;

$("document").ready(function() {
  $(".tab").hide();
  $(".tabs > li").addClass("off");

  // Apply on/off styles and show content
  $(".tabs > li").click(function() {
    if (!strictTabStructure) {
      var str = $(this).text();
      var strId = str.replace(/ /g, "-");
    }

    $(this).siblings().removeClass("on").addClass("off").css("color", "black");
    $(this).removeClass("off");
    $(this).addClass("on");
    if ($(this).parent().parent().attr("class") == "tab") {
      $(this).css("color", "#2B9A9A");
    } else {
      $(this).css("color", "orange");
    }

    $(this).parent().next().find(".tab").hide();
    var problem;
    if (!strictTabStructure) {
      problem = $(this).parent().next().find("#" + strId);
    } else {
      var me = $(this).index();
      problem = $(this).parent().next().children(".tab:eq(" + me + ")");
    }
    problem.show();
    // Image Loading
    $(problem).find(".image").each(function() {
      imageCount = $(this).children().length;
      if (imageCount < 1) {
        console.log("fire");
        $(this).append("<image style='width:100%' src='" + this.dataset.src + "' alt='img load failed'/>");
      }
    });

    var newH = problem.height();
    $(this).parent().next().css("height", newH + 30);
    var outerContentHeight = newH + 100;
    $(this).parents(".content").css("height", outerContentHeight);
  });

  // Unselect secondary tabs
  $("body > .tabs > li").click(function() {
    $(this).parent().next().find(".tabs > li").removeClass("on").addClass("off").css("color", "black");
    $(this).parent().next().find(".content").css("height", "200px");
    $(this).parent().next().css("height", "280px");
  });

  $("Button").click(function(){
    $(this).next().toggle();
    
    var problem = $(this).closest(".tab");
    var newH = problem.height();

    $(this).closest(".content").css("height", newH + 30);
    var outerContentHeight = newH + 100;
    $(this).closest(".content").parents(".content").css("height", outerContentHeight);
  });

  $("#load-button").click(function () {
    $(".image").each(function() {
      imageCount = $(this).children().length;
      if (imageCount < 1) {
        console.log("fire");
        $(this).append("<image style='width:100%' src='" + this.dataset.src + "' alt='img load failed'/>");
      }
    });
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