class Link {
	constructor(app) {

		this.app = app;
		this.id = 0;

		this.selected = false;
		this.locked = false;
		
		this.source = null;
		this.src_head = 'none';
		this.src_side = 'right';

		this.destination = null;
		this.dst_head = 'arrow';
		this.dst_side = 'top';

		this.style = 'straight'; // straight, rightcornered
		this.color = "#000000";
		this.line_dash = [];
		this.lineWidth = 1;

		this.line = {
			x1: 0,
			x2: 0,
			y1: 0,
			y2: 0,
			d: 0
		}
	}


	set src(input)
	{
		if (typeof(input) == 'number'){
			this.source = this.app.ObjectManager.GetObjectByID(input);
		}
		else {
			this.source = input
		}
	}

	get src() {
		return this.source
	}

	set dst(input)
	{
		if (typeof(input) == 'number'){
			this.destination = this.app.ObjectManager.GetObjectByID(input);
		}
		else {
			this.destination = input
		}
	}

	get dst() {
		return this.destination;
	}	

	Click(button){
		if (button == 1){
			this.selected = !this.selected;
		}
		else if (button == 2){
			//this.Kill();
		}
	}	

	PointSelect(x,y) {

		let d = this.line.d;


		// set x1,y1 to 0,0
		let cx = x - this.line.x1;
		let cy = y - this.line.y1;

		// check how far the actual y is away from the clicked y, based on clicked x
		let ry = this.line.d * cx;
		let dif_y = Math.abs(ry - cy);

		// check how far the actual x is away from the clicked x, based on clicked y
		let rx = (1/this.line.d) * cy;
		if (this.line.d == Infinity || this.line.d > 999){
			rx = 0;
		}		
		let dif_x = Math.abs(rx - cx);	
		
		// match on x
		if (dif_x < 5 && (y > this.line.y1 && y < this.line.y2 || y < this.line.y1 && y > this.line.y2)){
			return this;
		}

		// match on y
		if (dif_y < 5 && (x > this.line.x1 && x < this.line.x2 || x < this.line.x1 && x > this.line.x2 )){
			return this;
		}		

		return null;
		
		
	}

	UpdateLine() {
		// Get begin and end
		let origin_rect = this.src.absrect;
		let end_rect = this.dst.absrect;

		let x1, x2, y1, y2;

		if (this.style == 'straight')
		{
			// src
			if (this.src_side == 'right'){
				x1 = origin_rect.x2;
				y1 = origin_rect.y1 + origin_rect.h/2.0;
			}
			else if (this.src_side == 'top'){
				x1 = origin_rect.x1 + origin_rect.w/2.0;
				y1 = origin_rect.y1;
			}
			else if (this.src_side == 'bottom'){
				x1 = origin_rect.x1 + origin_rect.w/2.0;
				y1 = origin_rect.y2;
			}			
			else if (this.src_side == 'left'){
				x1 = origin_rect.x1;
				y1 = origin_rect.y1 + origin_rect.h/2.0;
			}
			else if (this.src_side == 'center'){
				x1 = origin_rect.x1 + origin_rect.w/2;
				y1 = origin_rect.y1 + origin_rect.h/2.0;
			}			
			
			// dst
			if (this.dst_side == 'right'){
				x2 = end_rect.x2;
				y2 = end_rect.y1 + end_rect.h/2.0;
			}			
			else if (this.dst_side == 'top'){
				x2 = end_rect.x1 + end_rect.w/2.0;
				y2 = end_rect.y1;
			}
			else if (this.dst_side == 'bottom'){
				x2 = end_rect.x1 + end_rect.w/2.0;
				y2 = end_rect.y2;
			}			
			else if (this.dst_side == 'left'){
				x2 = end_rect.x1;
				y2 = end_rect.y1 + end_rect.h/2.0;
			}
		}

		// Save data
		this.line = {
			x1: x1,
			x2: x2,
			y1: y1,
			y2: y2,
			d: (y2-y1)/(x2-x1)
		}
	}		

	Draw(){

		// Stylize
		ctx.strokeStyle = this.color;
		ctx.lineWidth = this.lineWidth;

		// selected
		if (this.selected){
			ctx.setLineDash([1, 2]);
			ctx.strokeStyle = "rgba(0, 255, 0, 1)";
		}
			
		// Draw
		ctx.beginPath();
		ctx.moveTo(this.line.x1, this.line.y1); 
		ctx.lineTo(this.line.x2, this.line.y2); 
		ctx.closePath();
		ctx.stroke();

		// reset
		ctx.setLineDash([]);		
	}



	GetDefinition()
	{

		// Main output
		let output = "";	
		output +=  `
					link = ObjectMngr.NewLink(ObjectMngr);
					link.id = ${this.id};
					link.dst = ${this.dst.id};
					link.dst_side = "${this.dst_side}";
					link.dst_head = "${this.dst_head}";
					link.src = ${this.src.id};
					link.src_side = "${this.src_side}";
					link.src_head = "${this.src_head}";	
					link.style = "${this.style}";
					link.color = "${this.color}";
					link.lineWidth = ${this.lineWidth};				
					`
	
		// remove tabs
		let tab = RegExp("\\t", "g");
		output = output.replace(tab, '');	
	
		return output;
		
	}	
	
	AutomaticPlacement(mousepos){
	
		
		// ** find out on what side of the center of the destination we clicked
		let rect = this.dst.absrect;

		// normalize x and y, so clicking top left = 0, 0
		let x = mousepos.x - rect.x1;
		let y = mousepos.y - rect.y1;

		let top = (rect.h/rect.w) * x;
		let bottom = rect.h - (rect.h/rect.w) * x;

		// set source as center for later
		this.src_side = "center"
		
		// ** set destination
		if (y > top && y < bottom){
			this.dst_side = "left"
		}
		else if (y < top && y < bottom){
			this.dst_side = "top"
		}
		else if (y > top && y > bottom){
			this.dst_side = "bottom"
		}		
		else if (y < top && y > bottom){
			this.dst_side = "right"
		}		

		this.UpdateLine();

		// ** set source

		// cut_off angles
		rect = this.src.absrect;

		let opposite = rect.h/2
		let adjacent = rect.w/2
		let topright = Math.atan2(opposite, adjacent) * (180 / Math.PI)

		let topleft = 180 - topright;
		let bottomleft = 180 + topright;		
		let bottomright = 360 - topright;		

		// calc vector angle
		let vector = {x: this.line.x1 - this.line.x2, y: this.line.y1 - this.line.y2}
		var vector_angle = 180 - Math.atan2(vector.y, vector.x) * (180 / Math.PI);

		console.log("tr: " + topright, "br: " + bottomright, "bl: " + bottomleft, "tl: " +  topleft, vector_angle);


		if (vector_angle > bottomright || vector_angle <= topright){
			this.src_side = "right"
		}
		else if (vector_angle > topright && vector_angle <= topleft){
			this.src_side = "top"
		}
		else if (vector_angle > topleft && vector_angle <= bottomleft){
			this.src_side = "left"
		}		
		else if (vector_angle > bottomleft && vector_angle <= bottomright){
			this.src_side = "bottom"
		}		


	}

	Kill() {
		let list = []
		for (obj of ObjectMngr.objects) {

			// remove "this"

				if (obj != this){
					list.push(obj);
				}
			
		}
		ObjectMngr.objects = list;
	}	
}