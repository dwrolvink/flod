
// The commented-out data used to live here, now it get's imported with the diagram
// so that we have one coherent game state to be loaded at start-up.
/*
var app.state = {
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
		leftmousebutton: false,
	},
	selectionrect: null,
	input_selected: null,
	objIncrement: 0,
	persistent_choices: {
		draw_grid: true,
		draw_help_text: true,
		force_pan: true,
		page_bgcolor: 'rgba(0,0,0,1)',
		page_gridcolor: 'rgba(40,30,40,1)'
	}
}
*/
/*
var viewport = {
	x: 0,
	y: 0,
	blocksize: 15
}
*/


// ===========================================================================
//                          KEYS
// ===========================================================================

function OnCanvasKeyDown(event) {
	if (app.state.input_selected != null){
		return;
	}
	switch (event.keyCode) {
		case 32:
			app.state.pressed.spacebar = true;
			break;		
		case 16:
			app.state.pressed.shift = true;
			break;
		case 17:
			app.state.pressed.ctrl = true;
			break;		
		case 65:
			app.state.pressed.a = true;
			break;						
	}
}
function OnCanvasKeyUp(event) {
	if (app.state.input_selected != null){
		return;
	}	
	switch (event.keyCode) {
		case 32: // space
			app.state.pressed.spacebar = false;
			break;
		case 16:
			app.state.pressed.shift = false;
			break;			
		case 17:
			app.state.pressed.ctrl = false;
			break;	
		case 27: // Esc
			// clear all
			ResetInterface();
			break;
		case 66: // B
			ObjectMngr.BringSelectedObjectToBack();
			break;		
		case 65:
			app.state.pressed.a = false;
			break;				
		case 67: // C (copy)
		case 68: // D (duplicate)
			let new_obj;
			for (obj of ObjectMngr.GetAllSelectedObjects()) {
				new_obj = copyRect(obj);
				rect = new_obj.absrect;
				cx = rect.x1 - app.state.mousepos.current.x;
				cy = rect.y1 - app.state.mousepos.current.y;
				new_obj.mouse_anchor = {x:cx, y:cy};
				app.clipboard.AddToList(new_obj);
			}	
			break;
		case 46: // Del (delete)	
		case 82: // R (remove)
			
			ObjectMngr.DeleteAllSelectedObjects();
			
			RefreshObjectEditPane();

			break;

		case 69: // ayyy (E)
			ObjectMngr.DeselectAllObjects([]);
			break;
		case 70: // F	
			ObjectMngr.BringSelectedObjectToFront();
			break;	
		case 78: // N
			obj = newRect(app.clipboard);
			obj.mouse_anchor = {x:-viewport.blocksize, y:-viewport.blocksize};
			break;
		case 71: // G
			app.state.persistent_choices.draw_grid = (! app.state.persistent_choices.draw_grid);
			break;
		case 83: // S
			app.SaveCurrentSetup();
			break;
		case 37: // left
			ObjectMngr.MoveSelectedObjects(-1,0);
			break;
		case 39: // right
			ObjectMngr.MoveSelectedObjects(1,0);
			break;		
		case 38: // top
			ObjectMngr.MoveSelectedObjects(0,-1);
			break;
		case 40: // bottom
			ObjectMngr.MoveSelectedObjects(0,1);
			break;	
		case 73: // I (edit mode)
			app.state.persistent_choices.force_pan = ! app.state.persistent_choices.force_pan;
			break;	
		case 81: // Q (toggle page settings)
			ToggleVisibility("pageSettings");	
			break;	
		case 72: // H (draw help text)
			app.state.persistent_choices.draw_help_text	= ! app.state.persistent_choices.draw_help_text;
			break;		
		case 90: //Z (undo)
			app.RestorePreviousState();
			break;
		case 89: // Y (redo)
		
			app.RedoState();
			break;
		default:
			alert(event.keyCode);				
	}
}


// ===========================================================================
//                          MOUSE POS
// ===========================================================================

function getMousePos(event) {
	// Get relative x, y
	var xpos = event.x;
	var ypos = event.y;

	xpos -= screen.canvas.offsetLeft;
	ypos -= screen.canvas.offsetTop;

	return {x: xpos, y:ypos}
}




// ===========================================================================
//                          MOUSE CLICK
// ===========================================================================

// Call object's click function for object specific actions
function OnRightClick(event) {

	event.preventDefault();

	cursor = getMousePos(event);

	if (obj = ObjectMngr.SelectObject(cursor.x, cursor.y)){
		obj.Click(2);
	}
}

function OnCanvasMouseDown(event){
	if (event.buttons == 1)
	{
		app.state.pressed.leftmousebutton = true;
		OnCanvasLMBD(event);
	}
	else if (event.buttons == 2)
	{
		app.state.pressed.rightmousebutton = true;
		OnCanvasRMBD(event);
	}	
}

function OnCanvasMouseUp(event)
{
	if (event.type != 'mouseup'){ return }

	if (app.state.pressed.leftmousebutton == true)
	{
		app.state.pressed.leftmousebutton = false;
		OnCanvasLMBU(event);
	}

	if (app.state.pressed.rightmousebutton == true)
	{
		app.state.pressed.rightmousebutton = false;
		OnCanvasRMBU(event);
	}	

	// clear cache
	app.state.object_clicked_on = null;
	app.state.object_corner_selected = null;
	app.state.objects_moved = false;
	app.state.link_destination = null;
	app.state.selectionrect = null;
	
}

// Move objects, resize, etc
function OnCanvasRMBD(event)
{
	// get cursor
	cursor = getMousePos(event);

	// Save info 
	app.state.mousepos.at_rmbd = cursor;
	
	// handle click object
	app.state.clicked_on.rectangle = ObjectMngr.SelectObject('Rectangle', cursor.x, cursor.y);
	app.state.clicked_on.link      = ObjectMngr.SelectObject('Link'     , cursor.x, cursor.y);
} 


function OnCanvasRMBU(event)
{
	// ** RECTANGLE **
	// no rectangle clicked on
	if (null == app.state.clicked_on.rectangle){
		CloseObjectEditPane();
	}
	// rectangle clicked on, but edit pane closed, or different object clicked on
	else if (null == app.state.editpane.rectangle || app.state.clicked_on.rectangle != app.state.editpane.rectangle){
		// select only the object
		ObjectMngr.DeselectAllObjects([]);
		app.state.clicked_on.rectangle.selected = true;

		// open edit pane
		OpenObjectEditPane(app.state.clicked_on.rectangle);
	} 
	// clicked on the object that is currently open in the editor
	else {
		app.state.clicked_on.rectangle.selected = false;
		CloseObjectEditPane();
	}

	// ** LINK **
	// no link clicked on
	if (null == app.state.clicked_on.link){
		CloseLinkEditPane();
	}
	// link clicked on, but edit pane closed, or different object clicked on
	else if (null == app.state.editpane.link || app.state.clicked_on.link != app.state.editpane.link){
		// select only the object
		ObjectMngr.DeselectAllObjects([]);
		app.state.clicked_on.link.selected = true;

		// open edit pane
		OpenLinkEditPane(app.state.clicked_on.link);
	} 
	// clicked on the object that is currently open in the editor
	else {
		app.state.clicked_on.link.selected = false;
		CloseLinkEditPane();
	}
}




// Move objects, resize, etc
function OnCanvasLMBD(event)
{
	// get cursor
	cursor = getMousePos(event);

	// Used left click on canvas: hide edit pane
	CloseObjectEditPane();	
	CloseLinkEditPane();	

	// Save info 
	app.state.mousepos.at_lmbd = cursor;
	app.state.viewport_origin = {x: viewport.x, y: viewport.y};

	// deselect all unless shift or A is pressed
	if (app.state.pressed.shift != true && app.state.pressed.a != true){
		ObjectMngr.DeselectAllObjects([]);
	}
	
	// handle click object
	obj = null;
	if (app.state.pressed.spacebar == false && app.state.persistent_choices.force_pan == false)
	{

		// Get object that was clicked on
		let object_clicked_on = ObjectMngr.SelectObject('Rectangle', cursor.x, cursor.y);
		
		// clicked on an object (and we are allowed to click)
		if (object_clicked_on != null && (object_clicked_on.locked == false || object_clicked_on.locked == true && app.state.pressed.ctrl)) 
		{		
			// Register
			app.state.object_clicked_on = object_clicked_on;
			
			
			if (object_clicked_on.constructor.name == 'Rectangle')
			{
				// If clicked on bottom right corner, make this known
				let rect = object_clicked_on.absrect;
				let offs = 10;
				if (cursor.x < rect.x2 + offs && cursor.x > rect.x2 - offs){
					if (cursor.y < rect.y2 + offs && cursor.y > rect.y2 - offs){
						app.state.object_corner_selected = object_clicked_on;
						app.state.object_clicked_on = null;
					}
				}
			
				else if (object_clicked_on.selected) { 
					// save location of all selected objects
					let list = [];
					for (obj of ObjectMngr.objects){
						if (obj.selected){
							list.push({x: obj.pos.x, y: obj.pos.y});
						}
					}
					app.state.object_origin = list;
				}
				else {
					// save location of one object
					app.state.object_origin = {x: object_clicked_on.pos.x, y: object_clicked_on.pos.y};
				}
			}
			else {
				// do nothing here
			}
		}
	}
} 

function OnCanvasLMBU(event)
{

	// Save info 
	app.state.mousepos.at_lmbu = getMousePos(event);
	
	// Shortcuts
	let blocksize = viewport.blocksize;

	// handle object manipulation
	let obj = null;
	let obj_manipulation_is_off = (app.state.pressed.spacebar == true || app.state.persistent_choices.force_pan == true);
	let obj_manipulation_is_on = ! obj_manipulation_is_off;

	if (obj_manipulation_is_on) {
		obj = app.state.object_clicked_on;
	}

	// case: selecting with ctrl (rect)
	if (obj_manipulation_is_on) 
	{
		if (app.state.selectionrect != null) 
		{
			if (!app.state.pressed.shift){
				ObjectMngr.DeselectAllObjects([]);
			}
			ObjectMngr.SelectObjectsByRect(app.state.selectionrect);
			//RefreshObjectEditPane()

			app.state.selectionrect = null;
			
			return;
		}
	}

	
	// attach objects with link
	if (app.state.pressed.a && app.state.object_clicked_on != null)
	{

		let dest = app.state.object_clicked_on;
		let objects = ObjectMngr.GetAllSelectedObjects();


		for (let obj of objects){
			ObjectMngr.LinkObjects(obj, dest);
		}

		ObjectMngr.UpdateAllLinks();
		app.SaveCurrentSetup();
	}


	// case 1: dragging
	var [dx, dy, isDrag] = GetMouseDrag(app.state.mousepos.at_lmbu);
	if (isDrag) {
		// dragging processing is done in OnCanvasMouseMove

		if (app.state.objects_moved){
			app.SaveCurrentSetup();
		}
		
		return;
	}	


	// case: click (and clipboard is full): Place clipboard content
	else if (app.clipboard.objects.length > 0){
		for (obj of app.clipboard.objects){
			cursor = app.state.mousepos.current;
			ma     = obj.mouse_anchor;

			obj.pos.x = Math.round((cursor.x + ma.x - viewport.x) / blocksize);
			obj.pos.y = Math.round((cursor.y + ma.y - viewport.y) / blocksize);

			ObjectMngr.AddToList(obj);
		}
		ObjectMngr.DeselectAllObjects([]);
		app.clipboard.SelectAllObjects([]);
		//RefreshObjectEditPane()
		app.clipboard.objects = [];

		app.SaveCurrentSetup();

		return;
	}

	// case 2: click object = (de)select object
	else if (null != obj && obj_manipulation_is_on) 
	{
		
		n = ObjectMngr.GetAllSelectedObjects().length;

		// deselect all, unless shift is pressed
		if (!app.state.pressed.shift){
			ObjectMngr.DeselectAllObjects([obj,]);
		}		
		// toggle obj if shift was pressed, or n<2
		if(n < 2 || app.state.pressed.shift){
			obj.Click(1);
		}
		else {
			obj.selected = true;
		}

		//RefreshObjectEditPane()	
		return;
	}

	// case: clicked grid
	else if (obj_manipulation_is_on && app.state.pressed.shift != true) {
		ObjectMngr.DeselectAllObjects([]);
		//RefreshObjectEditPane()
	}

} 




// ===========================================================================
//                          MOUSE DRAG
// ===========================================================================


function OnCanvasMouseMove(event) {

	// Update current mouse position
	app.state.mousepos.current = getMousePos(event);

	// Dragging?
	if (app.state.pressed.leftmousebutton){
		HandleDrag()
	}
}

function HandleDrag()
{

	// Some drag actions can only be done if we are in edit mode, and the spacebar (force pan) is off
	let obj_manipulation_is_off = (app.state.pressed.spacebar == true || app.state.persistent_choices.force_pan == true);
	let obj_manipulation_is_on = ! obj_manipulation_is_off;

	// shortcuts
	let blocksize = viewport.blocksize;
	let cursor = getMousePos(event);

	// Get drag motion
	x1 = app.state.mousepos.at_lmbd.x;
	y1 = app.state.mousepos.at_lmbd.y;
	var [dx, dy, isDrag] = GetMouseDrag(cursor);

	// Test if object is being dragged
	obj = app.state.object_clicked_on;
	let obj_corner = app.state.object_corner_selected;
	ctrl_is_pressed = app.state.pressed.ctrl;

	let obj_dragged_selected = (null != obj || null != obj_corner);

	// set selectionrect
	if (ctrl_is_pressed) {
		app.state.selectionrect = [x1, y1, dx, dy];
		return;
	}

	// pan
	if (!obj_dragged_selected || obj_manipulation_is_off) 
	{
		viewport_origin = app.state.viewport_origin;

		// change viewport
		viewport.x = viewport_origin.x + dx;
		viewport.y = viewport_origin.y + dy;
	}	

	// move object
	if (null != obj && obj_manipulation_is_on)
	{
		
		// get place where object started at at the beginning of dragging
		object_origin = app.state.object_origin;

		// Lockstep to grid
		if (Math.abs(dx) >= 0.5*blocksize || Math.abs(dy) >= 0.5*blocksize) 
		{
			// move all selected objects 
			// (when dragging a selected object, more might be selected, so move them all together)
			if (obj.selected) {
				let i = 0;
				for (obj of ObjectMngr.GetAllSelectedObjects()) {
					obj.pos.x = object_origin[i].x + Math.round(dx / blocksize);
					obj.pos.y = object_origin[i].y + Math.round(dy / blocksize);
					i++;
				}
				
			}
			// move single object
			else {
				obj.pos.x = object_origin.x + Math.round(dx / blocksize);
				obj.pos.y = object_origin.y + Math.round(dy / blocksize);
			}

			// let app know objects have been moved
			app.state.objects_moved = true;			

		}
	}

	// Move corner
	else if (null != obj_corner)
	{
		// diff since last drag
		let rect = obj_corner.absrect;
		let current_x = rect.x2;
		let current_y = rect.y2;

		let x_dif = cursor.x - current_x;
		let y_dif = cursor.y - current_y;
		
		if (Math.abs(x_dif) > blocksize){
			obj_corner.width += Math.round(x_dif / blocksize);
		}
		if (Math.abs(y_dif) > blocksize){
			obj_corner.height += Math.round(y_dif / blocksize);
		}		
	}

	ObjectMngr.UpdateAllLinks();
	
}

function GetMouseDrag(cursor) 
{
	let blocksize = viewport.blocksize;

	x1 = app.state.mousepos.at_lmbd.x;
	x2 = cursor.x;
	dx = x2 - x1;
	y1 = app.state.mousepos.at_lmbd.y;
	y2 = cursor.y;
	dy = y2 - y1;

	isDrag = false;
	if (Math.abs(dx) >= 0.5*blocksize || Math.abs(dy) >= 0.5*blocksize) {
		isDrag = true;
	}

	return [dx, dy, isDrag];
}




// Event callbacks for objects
// When object methods are used directly in event callbacks, you can't use "this.function()" in that called function
// Because the object context is removed. This way, you can.

function OnWindowResize(){
	screen.OnWindowResize();
}
function AdjustZoom(){
	screen.AdjustZoom();
	ObjectMngr.UpdateAllLinks();
}