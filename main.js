// SET GLOBALS
// ----------------------------------------------------------
let app = new App();

// Shortcuts
let screen = app.screen;
let ctx = screen.ctx;
let viewport = screen.viewport;
let ObjectMngr = app.ObjectManager;

app.Init();


// SET EVENTS
// ==========================================================
// Link DOM events to eventmanager.js functions
screen.canvas.addEventListener("mousedown", OnCanvasMouseDown, false);
screen.canvas.addEventListener("mouseup",   OnCanvasMouseUp, false);
screen.canvas.addEventListener("mousemove", OnCanvasMouseMove, false);
document.addEventListener("keydown", OnCanvasKeyDown);
document.addEventListener("keyup",   OnCanvasKeyUp);
document.addEventListener('contextmenu', OnRightClick);

// Resize event
window.addEventListener("resize", OnWindowResize);


window.onload = function() {
	// MouseScroll event - Firefox / Other
	if(window.addEventListener) {
		document.addEventListener('DOMMouseScroll', AdjustZoom, false);
		document.addEventListener('onwheel', AdjustZoom, false);
	}
	// MouseScroll event - Chrome
	window.onmousewheel=AdjustZoom;

	// Set html element onclick (etc) events (interface.js)
	ArmInputFields();

	// Set screen size
	screen.UpdateScreen()

	// Start the draw loop
	window.requestAnimationFrame(draw);
}





