canvas.addEventListener("mousedown", OnCanvasLMBD, false);
canvas.addEventListener("mouseup",   OnCanvasLMBU, false);
canvas.addEventListener("mousemove",   OnCanvasMouseMove, false);

var eventmgmt = {
	mousepos : {
		at_lmbd : {x:0,y:0},
		at_lmbu : {x:0,y:0}
	},
	lmbd: false,
	object_clicked_on: null,
	object_origin: null,
	viewport_origin: null
}

var viewport = {
	x: 0,
	y: 0
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
	window.eventmgmt.lmbd = true;
	window.eventmgmt.mousepos.at_lmbd = cursor;
	window.eventmgmt.object_clicked_on = obj;
	window.eventmgmt.viewport_origin = {x: viewport.x, y: viewport.y};

	if (null != obj) {
		window.eventmgmt.object_origin = {x: obj.pos.x, y: obj.pos.y};
	}
} 

function OnCanvasLMBU(event)
{
	// Save info 
	window.eventmgmt.mousepos.at_lmbu = getMousePos(event);
	window.eventmgmt.lmbd = false;

	// Logic
	let blocksize = config.blocksize;

	let x1 = window.eventmgmt.mousepos.at_lmbd.x;
	let x2 = window.eventmgmt.mousepos.at_lmbu.x;
	let dx = x2 - x1;
	let y1 = window.eventmgmt.mousepos.at_lmbd.y;
	let y2 = window.eventmgmt.mousepos.at_lmbu.y;
	let dy = y2 - y1;

	let obj = eventmgmt.object_clicked_on;

	if (null == obj) {
		return
	}

	if (Math.abs(dx) >= 0.5*blocksize || Math.abs(dy) >= 0.5*blocksize) {
		// drag
		obj.x += Math.floor(dx / blocksize);
		obj.y += Math.floor(dy / blocksize);
	}
	else {
		// select
		obj.selected = !obj.selected;
	}
} 

function OnCanvasMouseMove(event) {

	if (!eventmgmt.lmbd){
		return;
	}

	// Logic
	blocksize = config.blocksize;
	cursor = getMousePos(event);

	// Get drag motion
	x1 = window.eventmgmt.mousepos.at_lmbd.x;
	x2 = cursor.x;
	dx = x2 - x1;
	y1 = window.eventmgmt.mousepos.at_lmbd.y;
	y2 = cursor.y;
	dy = y2 - y1;

	// Test if object is being dragged
	obj = eventmgmt.object_clicked_on;
	

	if (null == obj) {
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
