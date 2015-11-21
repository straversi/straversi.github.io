$.ajax({
  url: "https://www.wikipedia.org/wiki/Science",
  dataType: 'jsonp',
  context: document.body
}).done(function( data ) {
  console.log(data);
});
