// Google Sheets POST handling
window.addEventListener("load", function () {
  function sendData() {
    var XHR = new XMLHttpRequest();

    // We bind the FormData object and the form element
    var FD  = new FormData(form);

    // We define what will happen if the data are successfully sent
    XHR.addEventListener("load", function(event) {
      // alert(event.target.responseText);
      form.reset();
    });

    // We define what will happen in case of error
    XHR.addEventListener("error", function(event) {
      alert('Oops! Something went wrong.');
    });

    // We define what happens in any case (error or not)
    XHR.addEventListener("loadend", function(event) {
      // Button is usable again
      form.querySelector("button").style.opacity = 1;
      // Inputs are invalid again
      var inputs = form.querySelectorAll("input");
      console.log(inputs);
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].style.borderBottom = "2px solid #F29696";
      }
      document.getElementById('firstInput').focus();
    });

    // We setup our request
    XHR.open("POST", "https://script.google.com/macros/s/AKfycbwkm80dfFdbHXfjekFxsiK-5v6i-KG0BHngPGGSwwwOXvsSfofg/exec");

    // We alert the user that the request is processing
    form.querySelector("button").style.opacity = 0.5;

    // The data sent are the one the user provide in the form
    XHR.send(FD);
  }

  // We need to access the form element
  var form = document.getElementById("form-contribute");

  // to takeover its submit event.
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (form.checkValidity()) {
      sendData();
    }
  });
});

// Form validation handling
window.addEventListener("load", function () {
  window.addEventListener("input", function(e) {
    element = e.target;
    if (element.checkValidity()) {
      // Green for OK
      element.style.borderBottom = "2px solid #89CD7C";
    } else {
      // Red for invalid
      element.style.borderBottom = "2px solid #F29696";
    }
  });
});
