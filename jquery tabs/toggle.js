$('document').ready(function() {
  $('button').click(function() {
    $(this).next().toggle();
  });
});