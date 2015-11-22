$.ajax({
  url: "https://www.wikipedia.org/wiki/Science",
  dataType: "html",
}).done(function(data) {
  console.log(data);
});
