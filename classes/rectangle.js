class Rectangle {
	constructor(){
		this.bgcolor = "rgb(252, 70, 212)";
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
}

// Function to make object creation less verbose
function newRect(list) {
	index = list.push(new Rectangle()); 
	return list[index-1];
}

// On mouseclick, this function may be called to find which rectangle is clicked
function SelectObject(x, y) {
	let blocksize = config.blocksize;

	x -= viewport.x;
	y -= viewport.y;

	for (i=0; i < ObjectList.length; i++) {
		let obj = ObjectList[i];
		let xtrue = false; let ytrue = false;
		
		xmin = obj.pos.x * blocksize;
		xmax = xmin + (obj.width * blocksize);
		ymin = obj.pos.y * blocksize;
		ymax = ymin + (obj.height * blocksize);

		if (x >= xmin && x <= xmax ){
			xtrue = true;
		}
		if (y >= ymin && y <= ymax ){
			ytrue = true;
		}
		if (xtrue && ytrue){
			return obj;
		}
	}
	return null;
}