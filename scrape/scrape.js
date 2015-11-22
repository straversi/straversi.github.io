function getWiki(title) {
 $.getJSON(
  "http://en.wikipedia.org/w/api.php?callback=?",
  {
   titles: title,
   action: "query",
   prop: "revisions",
   rvprop: "content",
   format: "json"
  },
  function(data) {
   console.log(data);
  }
 );
}

getWiki("Science");
