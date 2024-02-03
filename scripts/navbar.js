// burger menu for mobile
const burgerIcon = document.querySelector(".icon");
burgerIcon.addEventListener("click", editNav);
function editNav() {
	var x = document.getElementById("myTopnav");
	if (x.className === "topnav") {
		x.className += " responsive";
	} else {
		x.className = "topnav";
	}
}
