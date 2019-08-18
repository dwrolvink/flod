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
		
	// Print info
	PrintInfo();

	// Draw objects
	for (obj of ObjectList.objects) 
	{ 
		// draw object itself
		bg = obj.bgcolor;
		rect = obj.absrect

		let x = rect.x1
		let y = rect.y1
		let w = rect.w
		let h = rect.h

		ctx.fillStyle   = rgba(bg[0], bg[1], bg[2], bg[3]);
		ctx.fillRect(x, y, w, h); 

		ctx.font = `${fontsize}px Arial`;
		margin = 0.2*b;
		ctx.fillStyle   = obj.textcolor;
		ctx.fillText(obj.text, x+margin, y+fontsize-margin); 

		// draw selection highlight
		if (obj.selected){
			// square pattern
			if (window.config.blocksize > 6) {
				for (i=0; i < obj.height; i++) {
					for (j=0; j < obj.width; j++) {
						if ((i%2 + j%2)%2 > 0) {
							ctx.fillStyle   = rgba(0, 0, 0, 0.01);
						} else {
							ctx.fillStyle   = rgba(255,255,255, 0.01);
						}
						ctx.fillRect(x+j*b, y+i*b, b, b); 
					}
				}
			}
			// selection border
			ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
			ctx.lineWidth = 4;
			ctx.strokeRect(x-2, y-2, w+4, h+4);
			ctx.strokeStyle = "rgba(153, 255, 51, 1)";
			ctx.lineWidth = 1;
			ctx.strokeRect(x, y, w, h);
		}	
		
		// draw selectionrect
		if (null != eventmgmt.selectionrect) {
			ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
			ctx.lineWidth = 1;
			sr = eventmgmt.selectionrect;
			ctx.strokeRect(sr[0], sr[1], sr[2], sr[3]);
		}
	}

	// Draw clipboard
	for (obj of Clipboard.objects) 
	{ 
		// Set cliboard objects to follow cursor		
		cursor = eventmgmt.mousepos.current;
		ma     = obj.mouse_anchor;
		obj.pos.x = Math.round((cursor.x + ma.x - viewport.x) / blocksize);
		obj.pos.y = Math.round((cursor.y + ma.y - viewport.y) / blocksize);

		// Draw object
		rect = obj.absrect
		let x = rect.x1
		let y = rect.y1
		let w = rect.w
		let h = rect.h

		bg = obj.bgcolor;
		ctx.fillStyle   = rgba(bg[0], bg[1], bg[2], bg[3]);
		ctx.fillRect(x, y, w, h); 

		ctx.font = `${fontsize}px Arial`;
		margin = 0.2*b;
		ctx.fillStyle   = obj.textcolor;
		ctx.fillText(obj.text, x+margin, y+fontsize-margin); 
	}	
}

function rgba(r,g,b,a) {
	return `rgba(${r},${g},${b},${a})`;
}

function PrintInfo(){
	ctx.font = '12px Arial';
	ctx.fillStyle   = 'white';
	let l = 1; let lh = 20; left = canvas.width - 200;
	ctx.fillText('Blocksize: '+window.config.blocksize, left, l*lh); l+=2; 	
	
	ctx.fillText('Drag grid: pan            ', left, l*lh); l++;
	ctx.fillText('Hold space: force pan     ', left, l*lh); l++;
	ctx.fillText('Scroll: zoom              ', left, l*lh); l+=2;

	ctx.fillText('Ctrl + drag: select multiple objects', left, l*lh); l++;
	ctx.fillText('Drag object to move it    ', left, l*lh); l++;
	ctx.fillText('Selected objects move together    ', left, l*lh); l+=2;

	ctx.fillText('Press N for new object    ', left, l*lh); l++;
	ctx.fillText('Right Click object: delete object    ', left, l*lh); l++;
	ctx.fillText('Click object to (de)select', left, l*lh); l++;

	if (ObjectList.GetSelectedObjects().length > 0){
		ctx.fillStyle   = '#66aa66';
		ctx.fillText('Press F to bring to front', left, l*lh); l++;
		ctx.fillText('Press B to bring to back ', left, l*lh); l++; 
		ctx.fillText('Press C to copy ', left, l*lh); l++; 	 	
		ctx.fillText('Press D to delete        ', left, l*lh); l++;
		ctx.fillText('Press E to deselect all  ', left, l*lh); l++;
		ctx.fillStyle   = 'white';
	}	

	ctx.font = '14px Arial';
	ctx.fillText('This app is only tested for Firefox and might not work as intended on other browsers', 20, canvas.height-20 );
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
