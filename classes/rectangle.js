
class Rectangle {
	constructor(){
		this.bgcolor = 'rgba(0, 102, 255, 0)';
		this.bordercolor = "#AAAAAA"; 
		this.textcolor = "#FFFFFF";
		this.border_radius = 0;
		this.border_thickness = 1;
		this.textsize = 8;
		this.padding = 0.2;
		this.pos = {
			x : 1,
			y : 1
		}
		this.width = 12;
		this.height = 2;
		this.selected = false;
		this.text = "";
		this.mouse_anchor = null;
		this.draw_arrow = 'none';
		this.text_align = "top-left";
		this.locked = false;
		this.center = 'top-left';

		// bg image
		this.bg_image_id_stored; // to store the img_id in
		this.bg_image = null;    // gets set when bg_image_id is set
	}

	set bg_image_id(img_id) {
		this.bg_image = document.getElementById(img_id);
		this.bg_image_id_stored = img_id;
	}

	get bg_image_id(){
		return this.bg_image_id_stored;
	}

	get absrect(){
		let blocksize = viewport.blocksize;

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
		blocksize = viewport.blocksize;

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
		for (obj of ObjectMngr.objects) {
			if (obj != this){
				list.push(obj);
			}
		}
		ObjectMngr.objects = list;
	}

	DrawBorder() {
		if (this.border_thickness == 0){ return; }

		let blocksize = screen.viewport.blocksize;
		
		ctx.lineWidth = (parseFloat(blocksize)/10.0) * parseFloat(this.border_thickness);
		
		if (ctx.lineWidth < 0.02){ return; }
	
		ctx.strokeStyle = this.bordercolor;
		ctx.lineJoin = "round";
	
		
		if (this.draw_arrow != 'none'){
			// with complex objects, there will be a path, stroke this
			ctx.stroke();
		}
		else {
			// with rects, just stroke the rect
			let rect = this.absrect;
			ctx.strokeRect(rect.x1, rect.y1, rect.w, rect.h);
		}
	}
}

// Function to make object creation less verbose
function newRect(list) {
	index = list.push(new Rectangle()); 
	return list[index-1];
}

function copyRect(obj) {
	newobj = new Rectangle(obj.app);
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

	rect = newobj.absrect;
	cx = rect.x1 - app.state.mousepos.current.x;
	cy = rect.y1 - app.state.mousepos.current.y;
	newobj.mouse_anchor = {x:cx, y:cy};
	app.clipboard.objects.push(newobj);
}

