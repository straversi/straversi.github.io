function pickBackupTip() {
  backupTipSource = [
    {title:"Use Your Microwave as a Timer", description:"Did you know that your microwave can time things? Search how to use your microwave's 'timer' functionality on the <a href='http://www.google.com'>internet</a> to get started."},
    {title:"Use Flash on Your Camera at Night", description:"Are your pictures too dark? Try using the 'flash' functionality next time you take a photo of your friends."},
    {title:"Apples Make Good Banana Substitutes", description:"Did you run out of Bananas? An Apple is another common fruit that you could use instead."},
    {title:"Bored? Use a Television", description:"Bored? Try watching entertainment television. It is designed specifically to be fun to watch."},
    {title:"Use a Couch or Bed to Nap When Tired", description:"If you're feeling tired, try a brief nap. A couch or bed make great locations for falling asleep. Try using your microwave to set a timer so you don't sleep for too long!"},
    {title:"Substitute Pepsi for Coca-Cola", description:"If the restaurant you are eating at does not have any Coca-Cola in stock, try asking for a Pepsi instead. They taste similar."}
    // ["",""],
  ];
  return randomFromArray(backupTipSource);
}
function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function setTip() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      tip = JSON.parse(httpRequest.responseText);
    } else {
      tip = pickBackupTip();
    }
    document.getElementById('pro-tip-title').innerHTML = tip.title;
    document.getElementById('pro-tip-description').innerHTML = tip.description;
  }
}

function makeRequest(url) {
  httpRequest = new XMLHttpRequest();

  if (!httpRequest) {
    return false;
  }
  httpRequest.onreadystatechange = setTip;
  httpRequest.open('GET', url);
  httpRequest.send();
}

function loadTip() {
  url = "https://script.google.com/macros/s/AKfycbwkm80dfFdbHXfjekFxsiK-5v6i-KG0BHngPGGSwwwOXvsSfofg/exec";
  url_safari = "http://crossorigin.me/https://script.google.com/macros/s/AKfycbwkm80dfFdbHXfjekFxsiK-5v6i-KG0BHngPGGSwwwOXvsSfofg/exec";
  if (navigator.sayswho.match("Safari")) {
	  makeRequest(url_safari);
  } else {
    makeRequest(url);
  }
}

loadTip();
