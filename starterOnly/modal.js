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
  if(validate()){
    closeModal();
    setTimeout(() => {
      handleDisplayMessage();
    }, 300);
  }
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
const firstMessage = document.getElementById("first-message")
const lastMessage = document.getElementById("last-message")
const emailMessage = document.getElementById("email-message")
const birthMessage = document.getElementById("birthdate-message")
const quantityMessage = document.getElementById("quantity-message")
const locationMessage = document.getElementById("location-message")
const termsMessage = document.getElementById("terms-message")
const checkboxes = document.querySelectorAll(".checkbox-input")

formData.forEach(input => {
  input.addEventListener("input", handleChange)
})

// conditional logic for inputs on change
function handleChange(e) {
  const { value, id } = e.target;
  const el = e.target;
  let isValid = true;

  switch (id) {
    case "first":
      if (value.length < 2) {
        handleFormMessage(firstMessage, "Pas assez long. Veuillez entrer 2 caractères ou plus.", "red");
        isValid = false;
      } else {
        handleFormMessage(firstMessage, "");
      }
      break;
    case "last":
      if (value.length >= 2) {
        handleFormMessage(lastMessage, "");
      } else {
        handleFormMessage(lastMessage, "Pas assez long. Veuillez entrer 2 caractères ou plus.", "red");
        isValid = false;
      }
      break;
    case "email":
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (emailPattern.test(value)) {
        handleFormMessage(emailMessage, "");
      } else {
        handleFormMessage(emailMessage, "Veuillez entrer une adresse email valide.", "red");
        isValid = false;
      }
      break;
    case "birthdate":
      if (value) {
        handleFormMessage(birthMessage, "");
      } else {
        handleFormMessage(birthMessage, "Veuillez entrer une date", "red");
        isValid = false;
      }
      break;
    case "quantity":
      const quantityValue = parseInt(value, 10);
      if (isNaN(quantityValue) || quantityValue < 0 || quantityValue > 99) {
        handleFormMessage(quantityMessage, "La valeur doit être un nombre entre 0 et 99", "red");
        isValid = false;
      } else {
        handleFormMessage(quantityMessage, "");
      }
      break;
    case "location1":
    case "location2":
    case "location3":
    case "location4":
      const isOneRadioSelected = isAtLeastOneRadioSelected();
      if (isOneRadioSelected) {
        handleFormMessage(locationMessage, "");
      } else {
        handleFormMessage(locationMessage, "Vous devez choisir une option", "red");
        isValid = false;
      }
      break;
    case "checkbox1":
      if (checkbox1.checked) {
        handleFormMessage(termsMessage, "");
      } else {
        handleFormMessage(termsMessage, "Vous devez accepter les termes et conditions", "red");
        isValid = false;
      }
      break;
  }

  if (isValid) {
    handleStyleInput(el, "");
  } else {
    handleStyleInput(el, "red");
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

function handleStyleInput(el, color) {
  el.style.outline = `1px solid ${color}`
}

// final check before submit
function validate() {
  const errorMessages = document.querySelectorAll(".input-message");
  errorMessages.forEach(message => {
    message.textContent = "";
  });

  const formFields = document.querySelectorAll("input[type='text'], input[type='email'], input[type='date'], input[type='number'], input[type='radio'], input[type='checkbox']");

  let isValid = true;

  // loop in form fields
  formFields.forEach(field => {
    if (field.type === "radio") {
      const radioName = field.name;
      const radioButtons = document.querySelectorAll(`input[name='${radioName}']`);
      const isAnyRadioButtonChecked = Array.from(radioButtons).some(button => button.checked);

      if (!isAnyRadioButtonChecked) {
        const errorMessage = document.getElementById(`${radioName}-message`);
        handleFormMessage(errorMessage,"Vous devez choisir une option.", "red")
        handleStyleInput(field, "red")
        isValid = false;
      }
    } else if (field.type === "checkbox") {
      if (field.id === "checkbox1" && !field.checked) {
        const errorMessage = document.getElementById(`terms-message`);
        handleFormMessage(errorMessage,"Vous devez accepter les conditions d'utilisation.", "red")
        handleStyleInput(field, "red")
        isValid = false;
      }
    } else if (!field.value.trim()) {
      const errorMessage = document.getElementById(`${field.id}-message`);
      handleFormMessage(errorMessage,"Ce champ doit être remplis.", "red")
      handleStyleInput(field, "red")
      isValid = false;
    }
  });

  return isValid;
}


