class Screen 
{
	constructor(app)
	{
		// load main app
		this.app = app;

		// screen components
		let canvas = document.getElementById("mainCanvas");
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");

		// viewport allows us to move around and zoom
		this.viewport = {"x":0,"y":0,"blocksize":10}
	}

	getClientSize() {
		var e = window, a = 'inner';
		if ( !( 'innerWidth' in window ) )
		{
			e = document.documentElement || document.body;
			a = 'client';
		}
		return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
	}
	
	SetCanvasSize(){
		// Set canvas to fill client area
		let dimensions = this.getClientSize();
		screen.canvas.width = dimensions.width -2;
		screen.canvas.height = dimensions.height -2;
	}

	OnWindowResize() {
		this.UpdateScreen();
	}		
	
	UpdateScreen(){
		this.SetCanvasSize();
	}
	
	AdjustZoom(event) {
		let delta = 0;
		let b1;
		let b2;
		let cursor;


		if (!event) event = window.event;
	
		// normalize the delta
		if (event.wheelDelta) {
			// IE and Opera
			delta = event.wheelDelta / 60;
		} else if (event.detail) {
			// W3C
			delta = -event.detail / 2;
		}			
		
		b1 = viewport.blocksize;
	
		if (delta > 0) {
			viewport.blocksize *= 1.1;
		}
		else {
			viewport.blocksize *= 0.9;
		}
	
		// ------------------------------------------------------------------------------------
		// this block makes sure that when zooming in/out, viewport will stay centered around 
		// the cursor
		b2 = viewport.blocksize;
		cursor = this.app.state.mousepos.current;
		
		this.KeepViewportCentered(b1, b2, cursor);

		//this.app.viewport = this.viewport;
		
		// ------------------------------------------------------------------------------------
	}	

	KeepViewportCentered(b1, b2, cursor){

		// Objects are listed with relative coordinates. These are then translated to absolute 
		// coordinates. This way, we can easily move around and zoom in.
		//The relative position is translated to absolute position as follows:
		// abs(x,y) = rel(x,y) * blocksize + viewport(x,y)
	
		// Thus, to go from abs to rel, you'd do:
		// rel(x,y) = (abs(x,y) - viewport(x,y)) / blocksize
		let cxrel = (cursor.x - viewport.x)/b1;
		let cyrel = (cursor.y - viewport.y)/b1;
	
		// When zooming in/out, we want to keep the position of the cursor the same
		// relative to the objects. When we scroll, the absolute position of the objects
		// changes, but that of the cursor stays the same. 
		
		// To keep the viewport centered around the cursor, we place a (hypothetical) 
		// object at the absolute position of the cursor before zooming,
		// Then we look at how much it drifts from it's absolute position after zooming. 
		// We can adjust the viewport in the opposite direction, thus keeping the viewport 
		// centered around the cursor.
		// The formula for this is:
		// drift(x,y) = abs1(x,y) - abs2(x,y) = rel(x,y) * b2 + viewport(x,y) - (rel(x,y) * b1 + viewport(x,y))
		// drift(x,y) = rel(x,y)*(b2-b1)
		let driftx = cxrel*(b2-b1);
		let drifty = cyrel*(b2-b1);
		
		// Apply drift
		viewport.x -= driftx;
		viewport.y -= drifty;
	}	

	PrintObject(){

		// use selected object
		obj = app.state.input_object;
		
		// backup values
		app.state.persistent_choices.draw_help_text_backup = app.state.persistent_choices.draw_help_text;
		app.state.persistent_choices.draw_grid_backup = app.state.persistent_choices.draw_grid;
		app.state.viewport_backup = {x: viewport.x, y: viewport.y, blocksize: viewport.blocksize}

		// Get obj size, position
		let rect = obj.absrect;
		let x = rect.x1
		let y = rect.y1
		let w = rect.w
		let h = rect.h		

		// Update canvas to be exactly the size of the object
		this.canvas.width = w;
		this.canvas.height = h;
	
		// turn help text off
		app.state.persistent_choices.draw_help_text = false;

		// turn grid off
		app.state.persistent_choices.draw_grid = false;	

		// Deselect so the selection stuff doesn't get drawn
		obj.selected = false;
		
		// set viewport to be centered in the object
		viewport.x -= (x);
		viewport.y -= (y);
	
		// let draw function know to print an image at the end
		// this will cause the draw function to call PrinntObject_callback()
		app.state.print_image = true;
	}
	
	PrintObject_callback(){

		// use selected object
		obj = app.state.input_object;	
	
		app.state.print_image = false;
	
		// actually print the image to a new tab
		let image = this.canvas.toDataURL("image/png");
	
		// Restore
		app.state.persistent_choices.draw_help_text = app.state.persistent_choices.draw_help_text_backup;
		app.state.persistent_choices.draw_grid = app.state.persistent_choices.draw_grid_backup;

		let vb = app.state.viewport_backup;
		viewport = {x: vb.x, y: vb.y, blocksize: vb.blocksize}

		// reselect object
		obj.selected = true;
	
		// go back to normal canvas size
		this.UpdateScreen();
	
		// Open saved image in new screen
		window.open(image, '_blank');
	}
}