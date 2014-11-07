$('document').ready(function() {
  $('button').click(function() {
    $(this).next().fadeToggle(100);
  });
});