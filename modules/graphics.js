function draw() {

	blocksize = config.blocksize;
	let fontsize = Math.floor(1.8 * blocksize);

	// Clear screen
	ctx.fillStyle   = "#000000";
	ctx.clearRect(0, 0, canvas.width,canvas.height);

	// Shortcuts
	let b = blocksize;

	
	// Draw grid
	if (window.config.blocksize > 5 && eventmgmt.persistent_choices.draw_grid) {
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
		// draw rect
		bg = obj.bgcolor;
		rect = obj.absrect

		let x = rect.x1
		let y = rect.y1
		let w = rect.w
		let h = rect.h
		let y_half = rect.h / 2;

		ctx.fillStyle   = bg;


		

		if (obj.draw_arrow == 'none') 
		{	
			// draw normal rect
			if (obj.border_radius != 0)
			{
				ctx.lineJoin = "round";
				cornerRadius = obj.border_radius;
				ctx.lineWidth = cornerRadius;
				ctx.strokeStyle = bg;

				ctx.strokeRect(x+(cornerRadius/2), y+(cornerRadius/2), w-cornerRadius, h-cornerRadius);
				ctx.fillRect(x+(cornerRadius/2), y+(cornerRadius/2), w-cornerRadius, h-cornerRadius);	
			}
			// draw normal rect
			else {
				ctx.fillRect(x, y, w, h); 
			}
		}
		else {
			// draw arrowed rect
			let top = rect.y1;
			let bottom = rect.y2;
			let left = rect.x1;
			let right = rect.x2;
			let mult = 1.2

			if (obj.draw_arrow == 'right') {
				ctx.beginPath();
				ctx.moveTo(left, top); // top left
				ctx.lineTo(right-y_half*mult, top); // top right
				ctx.lineTo(right, top+y_half); // corner
				ctx.lineTo(right-y_half*mult, bottom); // right bottom
				ctx.lineTo(left, bottom); // left bottom
				ctx.lineTo(left, top); // top left
				ctx.fill();
			}
			else if (obj.draw_arrow == 'left') {
				ctx.beginPath();
				ctx.lineTo(left, top+y_half); // corner
				ctx.moveTo(left+y_half*mult, top); // top left
				ctx.lineTo(right, top); // top right
				ctx.lineTo(right, bottom); // right bottom
				ctx.lineTo(left+y_half*mult, bottom); // left bottom
				ctx.lineTo(left, top+y_half); // corner
				ctx.fill();
			}				
			else if (obj.draw_arrow == 'right_narrow') {
				let stalk_h = 0.2*blocksize;

				ctx.beginPath();
				ctx.moveTo(left, (top + y_half) - stalk_h); // topleft stalk
				ctx.lineTo(right-y_half*mult, (top + y_half) - stalk_h); // topright stalk
				ctx.lineTo(right-y_half*mult, top); // top right head
				ctx.lineTo(right, top+y_half); // corner
				ctx.lineTo(right-y_half*mult, bottom); // right bottom head
				ctx.lineTo(right-y_half*mult, (top + y_half) + stalk_h); // bottomright stalk
				ctx.lineTo(left, (top + y_half) + stalk_h); // bottomleft stalk
				ctx.lineTo(left, (top + y_half) - stalk_h); // topleft stalk
				ctx.fill();
			}
			else if (obj.draw_arrow == 'left_narrow') {
				let stalk_h = 0.2*blocksize;
				let top_stalk =  (top + y_half) - stalk_h;
				let bottom_stalk = (top + y_half) + stalk_h;
				let arrow_w = y_half*mult;

				ctx.beginPath();
				ctx.moveTo(right, top_stalk); // topright stalk
				ctx.lineTo(left+arrow_w, top_stalk); // topleft stalk
				ctx.lineTo(left+arrow_w, top); // top right head
				ctx.lineTo(left, top+y_half); // corner
				ctx.lineTo(left+arrow_w, bottom); // right bottom head
				ctx.lineTo(left+arrow_w, bottom_stalk); // bottomleft stalk
				ctx.lineTo(right, bottom_stalk); // bottomleft stalk
				ctx.lineTo(right, top_stalk); // topleft stalk
				ctx.fill();
			}			
			
		}

		// draw text
		ctx.fillStyle   = obj.textcolor;
		textsize = fontsize*obj.textsize/10;
		ctx.font = `${textsize}px Arial`;

		// calculate padding
		let padding_left = b;
		let padding_top = obj.padding*b;

		if (obj.draw_arrow == 'left') {
			padding_left += y_half;
		}

		
		lineheight = textsize*1.1;
		l = 0;
		lines = obj.text.split('\n');
		for (line of lines) {
			ctx.fillText(line, x+padding_left, y+textsize+(l*lineheight)+padding_top);
			l++; 
		}
		

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

		// draw object itself
		bg = obj.bgcolor;
		rect = obj.absrect

		let x = rect.x1
		let y = rect.y1
		let w = rect.w
		let h = rect.h

		ctx.fillStyle   = bg;
		ctx.fillRect(x, y, w, h); 

		ctx.fillStyle   = obj.textcolor;
		textsize = fontsize*obj.textsize/10;
		ctx.font = `${textsize}px Arial`;
		margin = 0.2*b;
		lineheight = textsize*1.1;
		l = 0;
		lines = obj.text.split('\n');
		for (line of lines) {
			ctx.fillText(line, x+margin, y+textsize+(l*lineheight));
			l++; 
		}
	}	

	window.requestAnimationFrame(draw);
}

function rgba(r,g,b,a) {
	return `rgba(${r},${g},${b},${a})`;
}

function PrintInfo(){
	ctx.font = '12px Arial';
	ctx.fillStyle   = 'white';
	let l = 1; let lh = 20; left = canvas.width - 200;
	ctx.fillText('Blocksize: '+window.config.blocksize, left, l*lh); l+=2; 
	
	ctx.fillText('Press S to download config   ', left, l*lh); l+=2;
	
	ctx.fillText('Drag grid: pan            ', left, l*lh); l++;
	ctx.fillText('Hold space: force pan     ', left, l*lh); l++;
	ctx.fillText('Scroll: zoom              ', left, l*lh); l+=2;

	ctx.fillText('Ctrl + drag: select multiple objects', left, l*lh); l++;
	ctx.fillText('Hold shift to add to current selection', left, l*lh); l++;
	ctx.fillText('Drag object to move it    ', left, l*lh); l++;
	ctx.fillText('Selected objects move together    ', left, l*lh); l+=2;

	ctx.fillText('Press G to toggle grid    ', left, l*lh); l+=2;

	ctx.fillText('Press N for new object    ', left, l*lh); l++;
	ctx.fillText('Click object to (de)select', left, l*lh); l++;

	if (ObjectList.GetSelectedObjects().length > 0){
		ctx.fillStyle   = '#66aa66';
		ctx.fillText('Press F to bring to front', left, l*lh); l++;
		ctx.fillText('Press B to bring to back ', left, l*lh); l++; 
		ctx.fillText('Press C or D to copy ', left, l*lh); l++; 	 	
		ctx.fillText('Press R or Del to remove    ', left, l*lh); l++;
		ctx.fillText('Press E to deselect all  ', left, l*lh); l++;
		ctx.fillText('Use arrows to move 1 block ', left, l*lh); l++;
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
