$.ajax({
  url: "https://www.wikipedia.org/wiki/Science",
  context: document.body
}).done(function( data ) {
  console.log(data);
});
