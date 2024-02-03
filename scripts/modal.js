import { handleDisplayMessage, handleFormMessage, handleStyleInput, isAtLeastOneRadioSelected } from "./utilities.js";

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const closeBtnFinalStep = document.querySelector(".final-step__btn");
const btnSubmit = document.querySelector(".btn-submit");
const confirmMessage = document.querySelector(".confirm-message");
const firstMessage = document.getElementById("first-message");
const lastMessage = document.getElementById("last-message");
const emailMessage = document.getElementById("email-message");
const birthMessage = document.getElementById("birthdate-message");
const quantityMessage = document.getElementById("quantity-message");
const locationMessage = document.getElementById("location-message");
const termsMessage = document.getElementById("terms-message");
const checkboxes = document.querySelectorAll(".checkbox-input");
const errorMessages = document.querySelectorAll(".input-message");
const formFields = document.querySelectorAll("input[type='text'], input[type='email'], input[type='date'], input[type='number'], input[type='radio'], input[type='checkbox']");

// function to reset all inputs value and err messages
function resetForm() {
  formFields.forEach(input => {
    input.value = '';
    handleStyleInput(input, '');
  });

  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
    handleStyleInput(checkbox, '');
  });

  errorMessages.forEach(message => {
    message.textContent = '';
  });

}

// launch modal
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
function launchModal() {
  modalbg.style.display = "block";
}

// close modal
closeBtn.addEventListener("click", closeModal);
closeBtnFinalStep.addEventListener("click", closeModal);
function closeModal() {
  modalbg.style.display = "none";
  handleDisplayMessage("none");
  resetForm();
}

// launch form event
btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  if (validate()) {
    handleDisplayMessage("flex");
  }
});

// event on all inputs
formData.forEach(input => {
  input.addEventListener("input", handleChange)
})

// conditional logic for inputs on change
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
function handleChange(e) {
  const { value, id } = e.target;
  const el = e.target;
  let isValid = true;

  switch (id) {
    case "first":
      if (value.trim().length < 2) {
        handleFormMessage(firstMessage, "Pas assez long. Veuillez entrer 2 caractères ou plus.", "red");
        isValid = false;
      } else {
        handleFormMessage(firstMessage, "");
      }
      break;
    case "last":
      if (value.trim().length >= 2) {
        handleFormMessage(lastMessage, "");
      } else {
        handleFormMessage(lastMessage, "Pas assez long. Veuillez entrer 2 caractères ou plus.", "red");
        isValid = false;
      }
      break;
    case "email":
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
        handleFormMessage(termsMessage, "Vous devez accepter les conditions d'utilisation.", "red");
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

// final check before submit
function validate() {
  errorMessages.forEach(message => {
    message.textContent = "";
  });

  let isValid = true;

  // loop in form fields
  formFields.forEach(field => {
    if (field.type === "radio") {
      const radioName = field.name;
      const radioButtons = document.querySelectorAll(`input[name='${radioName}']`);
      const isAnyRadioButtonChecked = Array.from(radioButtons).some(button => button.checked);

      if (!isAnyRadioButtonChecked) {
        const errorMessage = document.getElementById(`${radioName}-message`);
        handleFormMessage(errorMessage, "Vous devez choisir une option.", "red")
        handleStyleInput(field, "red")
        isValid = false;
      }
    } else if (field.type === "checkbox") {
      if (field.id === "checkbox1" && !field.checked) {
        const errorMessage = document.getElementById(`terms-message`);
        handleFormMessage(errorMessage, "Vous devez accepter les conditions d'utilisation.", "red")
        handleStyleInput(field, "red")
        isValid = false;
      }
    } else if (field.type === "text") {
      if (field.value.trim().length < 2) {
        const errorMessage = document.getElementById(`${field.id}-message`);
        handleFormMessage(errorMessage, "Pas assez long. Veuillez entrer 2 caractères ou plus.", "red")
        handleStyleInput(field, "red")
        isValid = false;
      }
    } else if (field.type === "email") {
      if (!emailPattern.test(field.value)) {
        const errorMessage = document.getElementById(`${field.id}-message`);
        handleFormMessage(errorMessage, "Veuillez entrer une adresse email valide.", "red")
        handleStyleInput(field, "red")
        isValid = false;
      }
    } else if(field.type === "number") {
      const quantityValue = parseInt(field.value, 10);
      if (isNaN(quantityValue) || quantityValue < 0 || quantityValue > 99) {
        const errorMessage = document.getElementById(`${field.id}-message`);
        handleFormMessage(errorMessage, "La valeur doit être un nombre entre 0 et 99", "red")
        handleStyleInput(field, "red")
        isValid = false;
      }
    } else if (!field.value.trim()) {
      const errorMessage = document.getElementById(`${field.id}-message`);
      handleFormMessage(errorMessage, "Ce champ doit être remplis.", "red")
      handleStyleInput(field, "red")
      isValid = false;
    }
  });

  return isValid;
}


