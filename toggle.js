$('document').ready(function() {
  $('button').click(function() {
    $(this).next().toggle();
  });
});

// Credit to Ollie O'Donnell for convincing me to write this jQuery.