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







