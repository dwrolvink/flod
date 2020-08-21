class ObjectManager
{
	constructor(app)
	{
		this.app = app;

		this.update_main_list = false;

		// all the objects will be stored here
		this.objects = [];
	}

	UpdateLinkedArray(){
		// app.objects exists. In the case of the main object list, we want to preserve
		// this shortcut. When we do deletions however, we often create new arrays (for speed 
		// and brevity). This destroys the reference. This function can be called after pointing
		// this.objects to a new array.

		if (this.update_main_list){
			this.app.objects = this.objects;
		}
	}

	// Each object can be in a selected state. This means the user has
	// selected the object (to move or delete it)
	// This function gets all selected objects
	GetAllSelectedObjects() {
		let list = [];
		for (let obj of this.objects){
			if (obj.selected){
				list.push(obj);
			}
		}
		return list;
	}

	// When the users drags when objects are selected, the objects are moved
	// by the amount of the drag.
	MoveSelectedObjects(x, y) 
	{
		for (obj of this.objects){
			if (obj.selected){
				//update_state = true;
				obj.pos.x += x;
				obj.pos.y += y;
			}
		}
	}


	// When clicking somewhere on the canvas, we need to check if there is
	// an object under the cursor, and which one it is. If there are multiple
	// overlapping objects, the first one is returned. The order of the objects
	// can be controlled by using the "Send to back" and "Send to front" commands.

	SelectObject(type, x, y) {
		// Loop over all objects
		for (let i=this.objects.length-1; i >= 0; i--) 
		{
			
			let obj = null;

			// Each object is asked if the coordinates fall within its boundaries
			obj = this.objects[i].PointSelect(x, y);

			// If there is a match, the object will be returned
			if (null != obj && obj.constructor.name == type){
				return obj;
			}
		}

		return null;
	}


	// Same as above, but it doesn't return at first match, and a rect is given
	// instead of a point. It also doesn't check whether ANY part of the rect is 
	// within its own rect, but whether one of its corners is contained within the
	// given rect. This gives more control when selecting and is computationally easier.
	SelectObjectsByRect(rect)
	{
		// rect = {x, y, w, h}
		x1 = rect[0]; 
		x2 = rect[0]+rect[2];
		y1 = rect[1];
		y2 = rect[1]+rect[3];

		let xmax = greater(x1,x2);
		let xmin = lesser(x1,x2);
		let ymax = greater(y1,y2);
		let ymin = lesser(y1,y2);

		let update_state = false;

		for (obj of this.objects) 
		{
			if (obj.constructor.name != 'Rectangle'){ continue; }

			let obj_rect = obj.absrect;
			let x = obj_rect.x1;
			let y = obj_rect.y1;
			let w = obj_rect.w
			let h = obj_rect.h;

			if (obj.locked){
				continue;
			}

			// Left
			if (x < xmax && x > xmin) {
				// Top
				if (y < ymax && y > ymin) {
					obj.selected = true;
				}
				// Bottom
				else if ((y+h) < ymax && (y+h) > ymin) {
					obj.selected = true;
				}
			}
			// Right
			else if ( (x+w) < xmax && (x+w) > xmin) {
				// Top
				if (y < ymax && y > ymin) {
					obj.selected = true;
				}
				// Bottom
				else if ((y+h) < ymax && (y+h) > ymin) {
					obj.selected = true;
				}			
			}
		}	
	}
	// Used when having a multi-object selecting, and then clicking one object
	// in that selection. This should deselect all, except for that one object.
	// If you want to deselect all, pass an empty array as the exclusion argument.
	DeselectAllObjects(exclusion) {
		for (obj of this.objects) {
			if (!(exclusion.includes(obj))) {
				obj.selected = false;
			}
		}
	}

	SelectAllObjects(exclusion) {
		for (obj of this.objects) {
			if (!(exclusion.includes(obj))) {
				obj.selected = true;
			}
		}
	}	

	DeleteAllSelectedObjects() {
		let update_state = false;


		for (obj of this.objects) {
			if (obj.selected) {
				obj.Kill();
			}
		}



		this.UpdateLinkedArray();
		this.app.SaveCurrentSetup();
		
	}

	RemoveObjectFromList(list, object) {
		let newlist = []
		for (obj of list) {
			if (obj != object) {
				newlist.push(obj);
			}
		}
		list = newlist;
	}

	BringSelectedObjectToFront() {
		let newlist = []
		for (obj of this.objects) {
			if (!obj.selected) {
				newlist.push(obj);
			}
		}
		for (obj of this.objects) {
			if (obj.selected) {
				newlist.push(obj);
			}
		}	
		this.objects = newlist;

		this.UpdateLinkedArray();
		this.app.SaveCurrentSetup();
	}

	BringSelectedObjectToBack() {
		let newlist = []
		for (obj of this.objects) {
			if (obj.selected) {
				newlist.push(obj);
			}
		}
		for (obj of this.objects) {
			if (!obj.selected) {
				newlist.push(obj);
			}
		}	
		this.objects = newlist;

		this.UpdateLinkedArray();
		this.app.SaveCurrentSetup();
	}	

	AddToList(object) {
		// set unique id
		let max_id = 1;
		for (let obj of this.objects){
			if (obj.id > max_id){ max_id = obj.id }
		}
		object.id = max_id + 1;

		this.objects.push(object);
	}

	SetStandardRect(object) {
		this.standard_rectangle = object;
	}

	// Function to make object creation less verbose
	NewRect(list) {
		let rect;

		// copy standard rectangle
		if (this.standard_rectangle){
			rect = this.CopyRect(this.standard_rectangle);
		}
		else {
			rect = new Rectangle(this.app);
		}

		// add to given list
		if (null != list){
			list.AddToList(rect);
		}

		return rect;
	}

	LinkObjects(source, destination)
	{
		let link = this.NewLink(this);
		link.dst = destination
		link.src = source
		link.src_side = "center";
		link.dst_side = "left";

		link.AutomaticPlacement(app.state.mousepos.at_lmbu);
	}

	NewLink(list) {
		let link;

		// copy standard rectangle
		link = new Link(this.app);
		
		// add to given list
		if (null != list){
			list.AddToList(link);
		}

		return link;
	}	

	UpdateAllLinks() {
		for (let obj of this.objects){
			if (obj.constructor.name != 'Link'){ continue; }
			
			obj.UpdateLine();
		}
	}

	CopyRect(obj) {
		let newobj = new Rectangle(obj.app);
		newobj.bgcolor     = obj.bgcolor;
		newobj.textcolor   = obj.textcolor;
		newobj.text        = obj.text;
		newobj.bordercolor = obj.bordercolor;
		newobj.pos.x       = obj.pos.x;
		newobj.pos.y       = obj.pos.y;
		newobj.width       = obj.width;
		newobj.height      = obj.height;
		newobj.textsize    = obj.textsize;
		newobj.draw_arrow  = obj.draw_arrow;
		newobj.border_radius  = obj.border_radius;
		newobj.border_thickness = obj.border_thickness;
		newobj.text_align  = obj.text_align;
		newobj.bg_image_id  = obj.bg_image_id_stored;
		newobj.center = obj.center;
	
		return newobj;
	}	

	GetObjectByID(id){
		for (let obj of this.objects) {
			if (obj.id == id) {
				return obj;
			}
		}	
		
		return null;
	}

}
