function draw() {
	blocksize = config.blocksize;
	let fontsize = Math.floor(1.8 * blocksize);

	// Clear screen
	ctx.fillStyle   = "#000000";
	ctx.clearRect(0, 0, canvas.width,canvas.height);


	// Draw grid
	if (window.config.blocksize > 6) {
		w = Math.floor(canvas.width / blocksize);
		h = Math.floor(canvas.height / blocksize);
		b = blocksize;
		ctx.strokeStyle = "rgb(36, 38, 48)";
		ctx.lineWidth = 1;
		
		ctx.beginPath();
		
		for (i=0; i < w+2; i++) { // vertical lines
			ctx.moveTo(i*b + viewport.x%b, -1*b + viewport.y%b);
			ctx.lineTo(i*b + viewport.x%b, h*b  + viewport.y%b);
		}
		for (i=-1; i < h+2; i++) { // horizontal lines
			ctx.moveTo(-1*b + viewport.x%b, i*b + viewport.y%b);
			ctx.lineTo(w*b  + viewport.x%b, i*b + viewport.y%b);
		}

		ctx.stroke(); 
	}
		
	ctx.font = '12px Arial';
	ctx.fillStyle   = 'white';
	ctx.fillText('Blocksize: '+window.config.blocksize, canvas.width-150, 20); 	


	// Draw objects
	for (i=0; i < ObjectList.length; i++) { 
		let obj = ObjectList[i];

		ctx.strokeStyle = obj.bordercolor; 
		ctx.fillStyle   = obj.bgcolor;
		if (obj.selected){
			ctx.fillStyle   = "#0000FF";
		}
		let x = obj.pos.x * blocksize + viewport.x;
		let y = obj.pos.y * blocksize + viewport.y;
		let w = obj.width  * blocksize;
		let h = obj.height * blocksize;
		ctx.fillRect(x, y, w, h); 

		ctx.font = `${fontsize}px Arial`;
		margin = Math.round((h - fontsize) * 0.5);
		ctx.fillStyle   = obj.textcolor;
		ctx.fillText(obj.text, x+margin, y+h-(3*margin)); 
	}
}

function getClientSize() {
	var e = window, a = 'inner';
	if ( !( 'innerWidth' in window ) )
	{
		e = document.documentElement || document.body;
		a = 'client';
	}
	return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
}

function SetCanvasSize(){
	dimensions = getClientSize();
	canvas.width = dimensions.width -2;
	canvas.height = dimensions.height -2;
}

function UpdateScreen(){
	SetCanvasSize();
	draw();
}
