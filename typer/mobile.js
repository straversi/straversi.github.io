$(document).ready(function() {
    if ((/iPhone|iPod|iPad|Android|BlackBerry/).test(navigator.userAgent)) {
        $("nav > li").click(function() {
            $(this).child(".menu").toggleClass("mobile-menu-on");
        });
    }
});