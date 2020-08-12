
class Rectangle {
	constructor(){
		this.id = eventmgmt.objIncrement; eventmgmt.objIncrement++;
		this.bgcolor = 'rgba(0, 102, 255, 1)';
		this.bordercolor = "#AAAAAA"; 
		this.textcolor = "#FFFFFF";
		this.textsize = 8;
		this.padding = 0.2;
		this.pos = {
			x : 1,
			y : 1
		}
		this.width = 12;
		this.height = 2;
		this.selected = false;
		this.text = "Hello there";
		this.mouse_anchor = null;
		this.draw_arrow = 'none';
		this.border_radius = 0;
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

	Click(button){
		if (button == 1){
			this.selected = !this.selected;
		}
		else if (button == 2){
			//this.Kill();
		}
	}
	Kill() {
		let list = []
		for (obj of ObjectList.objects) {
			if (obj != this){
				list.push(obj);
			}
		}
		ObjectList.objects = list;
	}
}

// Function to make object creation less verbose
function newRect(list) {
	index = list.push(new Rectangle()); 
	return list[index-1];
}

function copyRect(obj) {
	newobj = new Rectangle();
	newobj.bgcolor     = obj.bgcolor;
	newobj.text        = obj.text;
	newobj.bordercolor = obj.bordercolor;
	newobj.textcolor   = obj.textcolor;
	newobj.pos.x       = obj.pos.x;
	newobj.pos.y       = obj.pos.y;
	newobj.width       = obj.width;
	newobj.height      = obj.height;
	newobj.textsize    = obj.textsize;
	newobj.draw_arrow  = obj.draw_arrow;
	newobj.border_radius  = obj.border_radius;

	rect = newobj.absrect;
	cx = rect.x1 - eventmgmt.mousepos.current.x;
	cy = rect.y1 - eventmgmt.mousepos.current.y;
	newobj.mouse_anchor = {x:cx, y:cy};
	Clipboard.objects.push(newobj);
}

