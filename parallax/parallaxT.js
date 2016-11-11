// Function for translating scrolling into y-transforms.
var max = -1;
var scroll = 0;
$(document).ready(function() {
    var scene = $('.scene');
    for (i = 0; i < scene.length; i++) {
        var current = scene[i];
        if (Number($(current).css("z-index")) > max) {
            max = Number($(current).css("z-index"))
        }
    }
})

$(window).scroll(function (event) {
    // var scroll = Math.max($(window).scrollTop(), 0);
    scroll = $(window).scrollTop()
    var scene = $('.scene');
    for (i = 0; i < scene.length; i++) {
        var current = scene[i];
        var curID = current.id;
        var weight = Number($(current).css("z-index"));
        // var offset = $(current).parent().offset().top;
        var newDepth;
        if (scroll < 0) {
            newDepth = -scroll;
        } else {
            newDepth = -1 * weight/max * scroll + Number(current.dataset.inity);
        }
        $(current).css({
            '-webkit-transform': 'translateY(' + newDepth + 'px)',
            '-moz-transform': 'translateY(' + newDepth + 'px)',
            'transform': 'translateY(' + newDepth + 'px)',
        });
    }

    // var targetOffset = $("#target").offset().top;
    // var windowHeight = window.innerHeight;
    // var distance = targetOffset - scroll - windowHeight;
    // targetInWindow = distance <= 0 && distance >= -(windowHeight + $("#target").height());
    // $("#dial").html(distance + " " + targetInWindow + inWindow("#target"));
});

function inWindow (selector) {
    // var scroll = $(window).scrollTop()
    var targetOffset = $(selector).offset().top;
    var windowHeight = window.innerHeight;
    var distance = targetOffset - scroll - windowHeight;
    targetInWindow = distance <= 0 && distance >= -(windowHeight + $(selector).height());
    return targetInWindow;
}