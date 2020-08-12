// Get context
// ----------------------------------------------------------
var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");

// Main list of drawable Objects
var ObjectList = new ObjectManager();
var Clipboard  = new ObjectManager();


// MouseScroll event
window.onload = function() {
	// Firefox
	if(window.addEventListener) {
		document.addEventListener('DOMMouseScroll', AdjustZoom, false);
		document.addEventListener('onwheel', AdjustZoom, false);
	}
	// Chrome
	window.onmousewheel=AdjustZoom;

	UpdateScreen()
	ArmInputFields();
}




// Resize event
window.addEventListener("resize", OnWindowResize);

function OnWindowResize() {
	UpdateScreen();
}

window.requestAnimationFrame(draw);



