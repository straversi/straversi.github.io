tipSource = [
  ["Use Your Microwave as a Timer", "Did you know that your microwave can time things? Search how to use your microwave's 'timer' functionality on the <a href='http://www.google.com'>internet</a> to get started."],
  ["Use Flash on Your Camera at Night", "Are your pictures too dark? Try using the 'flash' functionality next time you take a photo of your friends."],
  ["Apples Make Good Banana Substitutes", "Did you run out of Bananas? An Apple is another common fruit that you could use instead."],
  ["Bored? Use a Television", "Bored? Try watching entertainment television. It is designed specifically to be fun to watch."],
  ["Use a Couch or Bed to Nap When Tired", "If you're feeling tired, try a brief nap. A couch or bed make great locations for falling asleep. Try using your microwave to set a timer so you don't sleep for too long!"],
  ["Substitute Pepsi for Coca-Cola", "If the restaurant you are eating at does not have any Coca-Cola in stock, try asking for a Pepsi instead. They taste similar."]
  // ["",""],
]

function chooseTip() {
  return pickRandomFromArray(tipSource);
}

function pickRandomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function setTip() {
  tip = chooseTip();
  document.getElementById('pro-tip-title').innerHTML = tip[0];
  document.getElementById('pro-tip-description').innerHTML = tip[1];
}

setTip()
