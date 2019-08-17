canvas.addEventListener("mousedown", OnCanvasLMBD, false);
canvas.addEventListener("mouseup",   OnCanvasLMBU, false);
canvas.addEventListener("mousemove", OnCanvasMouseMove, false);
document.addEventListener("keydown", OnCanvasKeyDown);
document.addEventListener("keyup",   OnCanvasKeyUp);

var eventmgmt = {
	mousepos : {
		at_lmbd : {x:0,y:0},
		at_lmbu : {x:0,y:0},
		current : {x:0,y:0}
	},
	object_clicked_on: null,
	object_origin: null,
	viewport_origin: null,
	pressed: {
		spacebar: false,
		ctrl: false,
		shift: false,
		leftmousebutton: false
	}
}

var viewport = {
	x: 0,
	y: 0
}

function OnCanvasKeyDown(event) {
	if (event.keyCode == 32){
		eventmgmt.pressed.spacebar = true;
	}
}
function OnCanvasKeyUp(event) {
	if (event.keyCode == 32){
		eventmgmt.pressed.spacebar = false;
	}
}

function getMousePos(event) {
	// Get relative x, y
	var xpos = event.x;
	var ypos = event.y;

	xpos -= window.canvas.offsetLeft;
	ypos -= window.canvas.offsetTop;

	return {x: xpos, y:ypos}
}

function OnCanvasLMBD(event)
{
	cursor = getMousePos(event);
	obj = SelectObject(cursor.x, cursor.y);

	// Save info 
	eventmgmt.pressed.leftmousebutton = true;
	eventmgmt.mousepos.at_lmbd = cursor;
	eventmgmt.object_clicked_on = obj;
	eventmgmt.viewport_origin = {x: viewport.x, y: viewport.y};

	if (null != obj) {
		eventmgmt.object_origin = {x: obj.pos.x, y: obj.pos.y};
	}
} 

function OnCanvasLMBU(event)
{
	// Save info 
	eventmgmt.mousepos.at_lmbu = getMousePos(event);
	eventmgmt.pressed.leftmousebutton = false;

	// Logic
	let blocksize = config.blocksize;

	let x1 = eventmgmt.mousepos.at_lmbd.x;
	let x2 = eventmgmt.mousepos.at_lmbu.x;
	let dx = x2 - x1;
	let y1 = eventmgmt.mousepos.at_lmbd.y;
	let y2 = eventmgmt.mousepos.at_lmbu.y;
	let dy = y2 - y1;

	let obj = eventmgmt.object_clicked_on;
	if (null == obj) {
		return
	}
	if (Math.abs(dx) >= 0.5*blocksize || Math.abs(dy) >= 0.5*blocksize) {
		// dragging processing is done in OnCanvasMouseMove
	}
	else {
		// select
		obj.selected = !obj.selected;
	}
} 

function OnCanvasMouseMove(event) {

	window.eventmgmt.mousepos.current = getMousePos(event);

	if (!eventmgmt.pressed.leftmousebutton){
		return;
	}

	// Logic
	blocksize = config.blocksize;
	cursor = getMousePos(event);

	// Get drag motion
	x1 = eventmgmt.mousepos.at_lmbd.x;
	x2 = cursor.x;
	dx = x2 - x1;
	y1 = eventmgmt.mousepos.at_lmbd.y;
	y2 = cursor.y;
	dy = y2 - y1;

	// Test if object is being dragged
	obj = eventmgmt.object_clicked_on;
	space_is_pressed = eventmgmt.pressed.spacebar;

	if (null == obj || space_is_pressed) {
		viewport_origin = eventmgmt.viewport_origin;

		// change viewport
		viewport.x = viewport_origin.x + dx;
		viewport.y = viewport_origin.y + dy;

		return;
	}

	object_origin = eventmgmt.object_origin;
	if (Math.abs(dx) >= 0.5*blocksize || Math.abs(dy) >= 0.5*blocksize) {
		// drag
		obj.pos.x = object_origin.x + Math.round(dx / blocksize);
		obj.pos.y = object_origin.y + Math.round(dy / blocksize);
	}	
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
	
	b1 = window.config.blocksize;

	if (delta > 0) {
		window.config.blocksize *= 1.1;
	}
	else {
		window.config.blocksize *= 0.9;
	}

	// ------------------------------------------------------------------------------------
	// this block makes sure that when zooming in/out, viewport will stay centered around 
	// the cursor
	b2 = window.config.blocksize;
	cursor = window.eventmgmt.mousepos.current;
	
	addon_KeepViewportCentered(b1, b2, cursor);
	
	// ------------------------------------------------------------------------------------
}

function addon_KeepViewportCentered(b1, b2, cursor){

	// Objects are listed with relative coordinates. These are then translated to absolute 
	// coordinates. This way, we can change easily move around and zoom in.
	//The relative position is translated to absolute position as follows:
	// abs(x,y) = rel(x,y) * blocksize + viewport(x,y)

	// Thus, to go from abs to rel, you'd do:
	// rel(x,y) = (abs(x,y) - viewport(x,y)) / blocksize
	cxrel = (cursor.x - viewport.x)/b1;
	cyrel = (cursor.y - viewport.y)/b1;

	// When zooming in/out, we want to keep the position of the cursor the same
	// relative to the objects. When we scroll, the absolute position of the objects
	// changes, but that of the cursor stays the same. 
	
	// To keep the viewport centered around the cursor, we place a (hypothetical) 
	// object at the absolute position of the cursor before zooming,
	// Then we look at how much it drifts from it's absolute position after zooming. 
	// We can adjust the viewport in the opposite direction, thus keeping the viewport 
	// centered around the cursor.
	// The formula for this is:
	// drift(x,y) = abs1(x,y) - abs2(x,y) = rel(x,y) * b2 + viewport(x,y) - (rel(x,y) * b1 + viewport(x,y))
	// drift(x,y) = rel(x,y)*(b2-b1)
	driftx = cxrel*(b2-b1);
	drifty = cyrel*(b2-b1);
	
	// I'm not sure why, but we need to adjust for the change in zoom before applying the drift.
	// I stumbled upon this, I don't have a formula to underpin it.
	viewport.x -= driftx;
	viewport.y -= drifty;
}