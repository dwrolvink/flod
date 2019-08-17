
class Rectangle {
	constructor(){
		this.bgcolor = [0, 102, 255, 1];
		this.bordercolor = "#AAAAAA"; 
		this.textcolor = "#FFFFFF";
		this.pos = {
			x : 1,
			y : 1
		}
		this.width = 12;
		this.height = 2;
		this.selected = false;
		this.text = "Hello there";
	}

	get absrect(){
		blocksize = config.blocksize;

		let xpos = this.pos.x  * blocksize + viewport.x;
		let ypos = this.pos.y  * blocksize + viewport.y;
		let width = this.width  * blocksize;
		let height = this.height * blocksize;	

		let rect = {
			x1: xpos,
			y1: ypos,
			w: width,
			h: height,
			x2: xpos + width,
			y2: ypos + height
		}

		return rect
	}

	set absrect(rect) {
		blocksize = config.blocksize;

		this.pos.x = (rect[0] - viewport.x) / blocksize;
		this.pos.y = (rect[1] - viewport.y) / blocksize;
		this.width = rect[2] / blocksize;
		this.height = rect[3] / blocksize ;
	}

	// return self if located on coordinates
	PointSelect(x,y) {
		let r = this.absrect;

		// test
		let xtrue = false; let ytrue = false;

		if (x >= r.x1 && x <= r.x2 ){
			xtrue = true;
		}
		if (y >= r.y1 && y <= r.y2 ){
			ytrue = true;
		}
		// select
		if (xtrue && ytrue){
			return this;
		}

		return null;
	}
}

// Function to make object creation less verbose
function newRect(list) {
	index = list.push(new Rectangle()); 
	return list[index-1];
}

// On mouseclick, this function may be called to find which rectangle is clicked
function SelectObject(x, y) {
	let blocksize = config.blocksize;

	for (i=ObjectList.length-1; i >= 0; i--) {
		obj = ObjectList[i].PointSelect(x, y);
		if (null != obj){
			return obj;
		}
	}
	return null;
}

function SelectObjectsByRect(rect){
	x1 = rect[0]+rect[2];
	x2 = rect[0];
	y1 = rect[1]+rect[3];
	y2 = rect[1];

	xmax = greater(x1,x2);
	xmin = lesser(x1,x2);
	ymax = greater(y1,y2);
	ymin = lesser(y1,y2);

	for (obj of ObjectList) {
		let x = obj.pos.x * blocksize + viewport.x;
		let y = obj.pos.y * blocksize + viewport.y;
		let w = obj.width  * blocksize;
		let h = obj.height * blocksize;	

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
function DeselectAllObjects() {
	for (obj of ObjectList) {
		obj.selected = false;
	}
}

function DeleteSelectedObject() {
	let newlist = []
	for (obj of ObjectList) {
		if (!obj.selected) {
			newlist.push(obj);
		}
	}
	ObjectList = newlist;
}

function BringSelectedObjectToFront() {
	let newlist = []
	for (obj of ObjectList) {
		if (!obj.selected) {
			newlist.push(obj);
		}
	}
	for (obj of ObjectList) {
		if (obj.selected) {
			newlist.push(obj);
		}
	}	
	ObjectList = newlist;
}

function BringSelectedObjectToBack() {
	let newlist = []
	for (obj of ObjectList) {
		if (obj.selected) {
			newlist.push(obj);
		}
	}
	for (obj of ObjectList) {
		if (!obj.selected) {
			newlist.push(obj);
		}
	}	
	ObjectList = newlist;
}
