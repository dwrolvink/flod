// Get context
// ----------------------------------------------------------
var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");

// Main list of drawable Objects
var ObjectList = new ObjectManager();
var Clipboard  = new ObjectManager();


// MouseScroll event
window.onload = function() {
	if(window.addEventListener) {
		document.addEventListener('DOMMouseScroll', AdjustZoom, false);
	}
	UpdateScreen()
	ArmInputFields();
}

// Resize event
window.addEventListener("resize", OnWindowResize);

function OnWindowResize() {
	UpdateScreen();
}

setInterval(draw, 15);



