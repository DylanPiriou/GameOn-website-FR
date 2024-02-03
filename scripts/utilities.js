// function to check if at least one radio button is selected
const radioButtons = document.querySelectorAll('input[name="location"]');
export function isAtLeastOneRadioSelected() {
	for (const radioButton of radioButtons) {
		if (radioButton.checked) {
			return true;
		}
	}
	return false;
}

// function to handle messages
export function handleFormMessage(el, txt, color) {
	el.textContent = txt;
	el.style.color = color;
}

// function to handle input style
export function handleStyleInput(el, color) {
	el.style.outline = `1px solid ${color}`;
}

// display confirm message when form is submitted
const finalStep = document.querySelector(".final-step");
const modal = document.querySelector(".content");
export function handleDisplayMessage(style) {
	modal.style.overflow = "hidden";
	finalStep.style.display = style;
}
