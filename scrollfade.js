// Function for translating scrolling into fading.
$(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    var opacity;
    if (scroll > 100) {
        opacity = 0;
    } else {
        opacity = 1 - scroll / 100;
    }
    $('h1').css({
        'opacity': opacity,
        'bottom': scroll / 6,
    });
});