// graphics.js does all the drawing. Objects may have their own draw function.
// The canvas management is done in screen.js (app.screen). (Includes zoom, panning, scrolling)



function draw() {

	// shortcuts
	let canvas = screen.canvas;

	let blocksize = viewport.blocksize;
	let b = blocksize;

	let fontsize = Math.floor(1.8 * blocksize);

	let page_bgcolor = app.state.persistent_choices.page_bgcolor;
	let page_gridcolor = app.state.persistent_choices.page_gridcolor;

	// toggles
	let cmd_draw_grid = app.state.persistent_choices.draw_grid;

	// Clear screen
	ctx.fillStyle   = page_bgcolor;
	ctx.clearRect(0, 0, canvas.width,canvas.height);
	ctx.fillRect(0, 0, canvas.width,canvas.height);

	// Draw grid
	if (blocksize > 5 && cmd_draw_grid) 
	{
		let w = Math.floor(canvas.width / blocksize);
		let h = Math.floor(canvas.height / blocksize);

		ctx.strokeStyle = page_gridcolor;
		ctx.lineWidth = 0.1 * parseFloat(blocksize);
		
		ctx.beginPath();


		for (i=0; i < w+2; i++) { // vertical lines
			ctx.moveTo(i*b + viewport.x%b, -b + viewport.y%b);
			ctx.lineTo(i*b + viewport.x%b, canvas.height + b + viewport.y%b);
		}
		for (i=-1; i < h+2; i++) { // horizontal lines
			ctx.moveTo(-1*b + viewport.x%b, i*b + viewport.y%b);
			ctx.lineTo(canvas.width + b  + viewport.x%b, i*b + viewport.y%b);
		}

		ctx.closePath();

		ctx.stroke(); 
	}
	
		


	
	for (obj of ObjectMngr.objects) 
	{ 
		if (obj.constructor.name == 'Link') 
		{
			obj.Draw();
		}

		// Draw rects
		if (obj.constructor.name == 'Rectangle')
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

			// if there is an arrow, centered text will have to move a little
			// to have it look good
			let text_skew_x = 0;

			
			if (obj.draw_arrow == 'none') 
			{	
				// draw normal rect
				if (obj.border_radius != 0)
				{
					// rounded corners only work for non arrowed boxes
					ctx.lineJoin = "round";
					cornerRadius = obj.border_radius * blocksize/10;

					// border
					corrected_border_thickness = parseFloat(obj.border_thickness) * blocksize/10.0;
					ctx.lineWidth = corrected_border_thickness;
					
					
					ctx.strokeStyle = obj.bordercolor;
					
					ctx.beginPath();

					ctx.moveTo(x + cornerRadius, y);

					ctx.lineTo(x + w - cornerRadius, y);
					ctx.arcTo(x + w, y,      x + w, y + cornerRadius,     cornerRadius);

					ctx.lineTo(x + w, y + h - cornerRadius);
					ctx.arcTo(x + w, y + h     , x + w - cornerRadius, y + h, cornerRadius);

					ctx.lineTo(x + cornerRadius, y + h);
					ctx.arcTo(x, y + h     , x , y + h - cornerRadius, cornerRadius);

					ctx.lineTo(x, y + cornerRadius);
					ctx.arcTo(x, y, x + cornerRadius, y, cornerRadius);

					ctx.closePath();

					if (corrected_border_thickness > 0.01){
						ctx.stroke();
					}
					ctx.fill();
	
				}
				// draw normal rect
				else {
					ctx.fillRect(x, y, w, h); 
					obj.DrawBorder(obj);
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

					text_skew_x = -0.5*rect.h;

					ctx.beginPath();
					ctx.moveTo(left, top); // top left
					ctx.lineTo(right-y_half*mult, top); // top right
					ctx.lineTo(right, top+y_half); // corner
					ctx.lineTo(right-y_half*mult, bottom); // right bottom
					ctx.lineTo(left, bottom); // left bottom
					ctx.lineTo(left, top); // top left
					ctx.closePath();
					ctx.fill();

					obj.DrawBorder();
				}
				else if (obj.draw_arrow == 'left') {

					text_skew_x = 0.5*rect.h;

					ctx.beginPath();
					ctx.lineTo(left, top+y_half); // corner
					ctx.moveTo(left+y_half*mult, top); // top left
					ctx.lineTo(right, top); // top right
					ctx.lineTo(right, bottom); // right bottom
					ctx.lineTo(left+y_half*mult, bottom); // left bottom
					ctx.lineTo(left, top+y_half); // corner
					ctx.fill();
				}			
				else if (obj.draw_arrow == 'left_down') {
					// draw rect
					ctx.fillRect(x, y, w, h); 

					// draw triangle
					a = 2*blocksize;
					let left_triangle = left;
					let right_triangle = left + a;
					let top_triangle = bottom - 0.5;
					let bottom_triangle = bottom + 0.5*a;
					let middle_triangle = left + 0.5*a

					ctx.beginPath();
					// rect
					ctx.moveTo(left, top);
					ctx.lineTo(right, top);
					ctx.lineTo(right, bottom);
					// triangle
					ctx.lineTo(right_triangle, bottom);
					ctx.lineTo(middle_triangle, bottom_triangle); // corner
					ctx.lineTo(left, bottom); 
					ctx.fill();
				}					
				else if (obj.draw_arrow == 'right_narrow') {
					let stalk_h = 0.2*blocksize;

					text_skew_x = -0.5*rect.h;

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

					text_skew_x = 0.5*rect.h;

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
			// ------------------------------------------------------------
			lines = obj.text.split('\n');

			ctx.fillStyle   = obj.textcolor;
			textsize = fontsize*obj.textsize/10;
			lineheight = textsize*1.1;
			ctx.font = `${textsize}px Arial`;
			
			// get width of text
			let text_width = 0;
			for (line of lines) {
				if (ctx.measureText(line).width > text_width){
					text_width = ctx.measureText(line).width;
				}
			}

			// calculate padding
			let padding_left = b;
			let padding_top = obj.padding*b;

			if (obj.draw_arrow == 'left') {
				padding_left += y_half;
			}

			
			// calculate text location
			let text_top = y + textsize + padding_top;
			let text_left = x;

			if (obj.text_align == "top-center"){
				text_left = x + ((w + text_skew_x)  - text_width)/2;
				ctx.textBaseline = 'alphabetic';
			}
			else if (obj.text_align == "top-left" || obj.text_align == "none"){
				text_left = x + padding_left;
				ctx.textBaseline = 'alphabetic';
			}		
			else if (obj.text_align == "center"){
				text_left = x + ((w + text_skew_x)  - text_width)/2;
				text_top = y + y_half;
				ctx.textBaseline = 'middle';
			}				

			// draw text
			l = 0;
			for (line of lines) {
				ctx.fillText(line, text_left, text_top+(l*lineheight));
				l++; 
			}
			

			// draw selection highlight
			// -------------------------------------------------------------
			if (obj.selected){
				// square pattern
				if (screen.viewport.blocksize > 6) {
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
			if (null != app.state.selectionrect) {
				
				ctx.lineWidth = 1;
				sr = app.state.selectionrect;

				ctx.setLineDash([1, 2]);
				ctx.strokeStyle = "rgba(0, 255, 0, 1)";
				ctx.strokeRect(sr[0], sr[1], sr[2], sr[3]);

				ctx.strokeStyle = "rgba(255, 255, 255, 1)";
				ctx.strokeRect(sr[0], sr[1], sr[2], sr[3]);

				ctx.strokeStyle = "rgba(0, 0, 0, 1)";
				ctx.setLineDash([1, 3]);
				ctx.strokeRect(sr[0], sr[1], sr[2], sr[3]);
				
				ctx.setLineDash([]);
			}
		}
	}

	// Draw clipboard
	for (obj of app.clipboard.objects) 
	{ 
		// Set cliboard objects to follow cursor		
		cursor = app.state.mousepos.current;
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

	// Print info
	if (app.state.persistent_choices.draw_help_text){
		PrintInfo();
	}	

	// Print image requested
	if (app.state.print_image){
		app.screen.PrintObject_callback();
	}	

	window.requestAnimationFrame(draw);
}

function rgba(r,g,b,a) {
	return `rgba(${r},${g},${b},${a})`;
}

function PrintInfo(){
	// config
	ctx.font = '12px Arial';
	ctx.fillStyle   = 'white';

	// placement
	let l = 1; let lh = 20; left = screen.canvas.width - 200;

	// text
	ctx.fillStyle   = 'rgba(171,255,0,1)';
	ctx.fillText('https://github.com/dwrolvink/flod', left, l*lh); l+=2; 

	if (app.state.persistent_choices.force_pan){
		ctx.fillStyle   = 'rgba(231,206,0,1)';
		ctx.fillText('Press I to turn on edit mode! ', left, l*lh); l+=2; 
	} else {
		ctx.fillStyle   = 'rgba(255,164,62,1)';
		ctx.fillText('Press I to exit edit mode ', left, l*lh); l++; 
		ctx.fillText('Press Z to undo changes', left, l*lh); l++; 
		ctx.fillText('Press Y to redo changes', left, l*lh); l+=2; 
	}

	ctx.fillStyle   = 'white';

	ctx.fillText('Scroll: zoom              ', left, l*lh); l++;
	ctx.fillText('Drag grid: pan            ', left, l*lh); l++;
	ctx.fillText('Hold space: force pan     ', left, l*lh); l+=2;	
	
	ctx.fillText('Press S to save to session  ', left, l*lh); l+=2;
	

	ctx.fillText('Ctrl + drag: select multiple objects', left, l*lh); l++;
	ctx.fillText('Hold shift to add to current selection', left, l*lh); l++;
	ctx.fillText('Drag object to move it    ', left, l*lh); l++;
	ctx.fillText('Selected objects move together    ', left, l*lh); l+=2;

	ctx.fillText('Press E to deselect all objects   ', left, l*lh); l++;
	ctx.fillText('Press Esc to close all panes & empty clipboard', left, l*lh); l+=2;	

	ctx.fillText('Press G to toggle grid    ', left, l*lh); l++;
	ctx.fillText('Press Q to page settings   ', left, l*lh); l++;
	ctx.fillText('Press H to toggle help text    ', left, l*lh); l+=2;

	ctx.fillText('Press N for new object    ', left, l*lh); l++;
	ctx.fillText('Click object to (de)select', left, l*lh); l++;

	if (ObjectMngr.GetAllSelectedObjects().length > 0){
		ctx.fillStyle   = '#66aa66';
		ctx.fillText('Press F to bring to front', left, l*lh); l++;
		ctx.fillText('Press B to bring to back ', left, l*lh); l++; 
		ctx.fillText('Press C or D to copy ', left, l*lh); l++; 	 	
		ctx.fillText('Press R or Del to remove    ', left, l*lh); l++;
		ctx.fillText('Press E to deselect all  ', left, l*lh); l++;
		ctx.fillText('Use arrows to move 1 block ', left, l*lh); l++;
		ctx.fillStyle   = 'white';
	}	

	ctx.fillText('x: '+viewport.x, left, l*lh); l++; 
	ctx.fillText('y: '+viewport.y, left, l*lh); l++; 
	ctx.fillText('Blocksize: '+viewport.blocksize, left, l*lh); l++; 

	ctx.font = '14px Arial';
	ctx.fillText('This app is only tested for Firefox and might not work as intended on other browsers', 20, screen.canvas.height-20 );
}

