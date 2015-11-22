$.ajax({
  url: "https://en.wikipedia.org/w/api.php?action=parse&page=Science"
}).done(function(data) {
  console.log(data);
});
