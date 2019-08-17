function OnWindowResize() {
	UpdateScreen();
}

function AdjustZoom(event) {
	var delta = 0;

	if (!event) event = window.event;

	// normalize the delta
	if (event.wheelDelta) {
		// IE and Opera
		delta = event.wheelDelta / 60;
	} else if (event.detail) {
		// W3C
		delta = -event.detail / 2;
	}			
	
	window.config.blocksize += delta;
	draw();
}

