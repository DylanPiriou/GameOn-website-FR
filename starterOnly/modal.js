function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close")
const btnSubmit = document.querySelector(".btn-submit")
const confirmMessage = document.querySelector(".confirm-message");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
closeBtn.addEventListener("click", closeModal);
// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// launch form event
btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal();
  setTimeout(() => {
    handleDisplayMessage();
  }, 300);
});

// display confirm message when form is submitted
function handleDisplayMessage() {
  confirmMessage.style.display = "block";
  setTimeout(() => {
    confirmMessage.style.display = "none";
  }, 3000);
}

// get inputs value
const inputs = document.querySelectorAll("input")
const firstMessage = document.querySelector(".message-first");
const lastMessage = document.querySelector(".message-last");
const emailMessage = document.querySelector(".message-email");
const birthMessage = document.querySelector(".message-birthdate")
const locationMessage = document.querySelector(".message-location")
const termsMessage = document.querySelector(".message-terms")
const checkboxes = document.querySelectorAll(".checkbox-input")
formData.forEach(input => {
  input.addEventListener("change", handleChange)
})

// conditional logic for inputs on change
function handleChange(e) {
  const value = e.target.value;
  const id = e.target.id

  switch (id) {
    case "first":
      if (value.length >= 2) {
        handleFormMessage(firstMessage, "Parfait !", "green");
      } else {
        handleFormMessage(firstMessage, "Pas assez long. Veuillez entrer 2 caractères ou plus.", "red");
      }
      break;
    case "last":
      if (value.length >= 2) {
        handleFormMessage(lastMessage, "Parfait !", "green");
      } else {
        handleFormMessage(lastMessage, "Pas assez long. Veuillez entrer 2 caractères ou plus.", "red");
      }
      break;
    case "email":
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (emailPattern.test(value)) {
        handleFormMessage(emailMessage, "Parfait !", "green");
      } else {
        handleFormMessage(emailMessage, "Veuillez entrer un email valide.", "red");
      }
    case "birthdate":
      if (value) {
        handleFormMessage(birthMessage, "Parfait !", "green");
      } else {
        handleFormMessage(birthMessage, "Veuillez entrer une date", "red");
      }
      break;
    case "location1":
    case "location2":
    case "location3":
    case "location4":
      const isOneRadioSelected = isAtLeastOneRadioSelected();
      if (isOneRadioSelected) {
        handleFormMessage(locationMessage, "Excellent choix !", "green");
      } else {
        handleFormMessage(locationMessage, "Vous devez choisir une option", "red");
      }
      break;
    case "checkbox1":
      if (checkbox1.checked) {
        handleFormMessage(termsMessage, "Parfait !", "green");
      } else {
        handleFormMessage(termsMessage, "Vous devez accepter les termes et conditions", "red");
      }
  }
}

// check if at least one radio button is selected
function isAtLeastOneRadioSelected() {
  const radioButtons = document.querySelectorAll('input[name="location"]');
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      return true;
    }
  }
  return false;
}

// function to handle conditional message
function handleFormMessage(el, txt, color) {
  el.textContent = txt;
  el.style.color = color;
}





