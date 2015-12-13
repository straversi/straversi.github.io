// Google Sheets POST handling
window.addEventListener("load", function () {
  function sendData() {
    var XHR = new XMLHttpRequest();

    // We bind the FormData object and the form element
    var FD  = new FormData(form);

    // We define what will happen if the data are successfully sent
    XHR.addEventListener("load", function(event) {
      // alert(event.target.responseText);
      statusElement.src = "check.png";
      statusElement.classList.add("animate-appear-and-fade");

      form.reset();
      // Inputs are invalid again, button is disabled again.
      var inputs = form.querySelectorAll("input");
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].style.borderBottom = "2px solid #F29696";
      }
      statusButton.disabled = true;
    });

    // We define what will happen in case of error
    XHR.addEventListener("error", function(event) {
      console.log(event);
      statusElement.src = "x.png";
      statusElement.classList.add("animate-appear-and-fade");

      // If form is valid, keep button enabled.
      if (form.checkValidity()) {
        statusButton.disabled = false;
      }
    });

    // We define what happens in any case (error or not)
    XHR.addEventListener("loadend", function(event) {
      document.getElementById('firstInput').focus();
    });

    // We setup our request
    XHR.open("POST", "https://script.google.com/macros/s/AKfycbwkm80dfFdbHXfjekFxsiK-5v6i-KG0BHngPGGSwwwOXvsSfofg/exec");

    // We alert the user that the request is processing
    statusButton.disabled = true;

    // The data sent are the one the user provide in the form
    XHR.send(FD);
  }

  // We need to access the form element...
  var form = document.getElementById("form-contribute");

  // Access to the submit button, submit image
  var statusButton = form.querySelector("button");
  var statusElement = document.getElementById("submit-status");
  // Animation end handlers for all browsers
  statusElement.addEventListener('animationend', function(e) { removeAnimationClass(e.target); });
  statusElement.addEventListener('webkitAnimationEnd', function(e) { removeAnimationClass(e.target); });
  statusElement.addEventListener('oanimationend', function(e) { removeAnimationClass(e.target); });
  statusElement.addEventListener('MSAnimationEnd', function(e) { removeAnimationClass(e.target); });
  function removeAnimationClass(element) {
    element.classList.remove("animate-appear-and-fade");
  }

  // ...to takeover its submit event.
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (form.checkValidity()) {
      sendData();
    }
  });
});

// Form validation handling
window.addEventListener("load", function () {
  var form = document.getElementById("form-contribute");
  var submitButton = form.querySelector("button");
  window.addEventListener("input", function(e) {
    element = e.target;
    if (element.checkValidity()) {
      // Green for OK
      element.style.borderBottom = "2px solid #89CD7C";
    } else {
      // Red for invalid
      element.style.borderBottom = "2px solid #F29696";
    }
    if (form.checkValidity()) {
      // Solid for OK
      submitButton.disabled = false;
    } else {
      // Opaque for invalid
      submitButton.disabled = true;
    }
  });
});
