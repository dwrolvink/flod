class App 
{
	constructor()
	{
		this.screen = new Screen(this);

		// Main object list
		this.ObjectManager = new ObjectManager(this); // all placed objects
		this.ObjectManager.update_main_list = true;   // keeps variable below pointed to its own list

		// Object list for when moving copied objects around
		this.clipboard     = new ObjectManager(this); // all objects following the mouse

		// Entire app state is contained in the following variables
		this.status = null;
		this.status_history = [];
		this.status_history_redo = [];

		// Shortcuts
		this.canvas = this.screen.canvas;

	}

	get objects(){
		return this.ObjectManager.objects
	}
	set objects(objs){
		this.ObjectManager.objects = objs;
	}	


	Init(){
		this.LoadSavedSetup()
	}

	LoadSavedSetup()
	{
		let app = this;

		// no saved game, use the predefined state
		if (localStorage.getItem('save_game') == null){
			LoadSavedState(this);
		}
		else {
			// Load function
			let setup_text = localStorage.getItem('save_game');
			eval(setup_text+"; LoadSavedState(this);");
		}

		// Save as first history item
		this.SaveCurrentSetup();


		return true;
	}	

	SaveCurrentSetup() {
		console.log('save');

		let text = this.PrintCurrentSetup();

		// save to localstorage
		localStorage.setItem('save_game', text);

		// add to history so we can go back in time
		this.AddStateToHistory(text);

		// clear redo array
		this.status_history_redo = [];
	}	
	
	ApplySetup(setup_text){
		// clear list
		this.objects.splice(0, this.objects.length);

		// make present state
		eval(setup_text+"; LoadSavedState(this);");

		// save to localstorage
		localStorage.setItem('save_game', setup_text);

		// add to history so we can go back in time
		this.AddStateToHistory(setup_text);		
	}

	AddStateToHistory(setup_text){
		this.status_history.push(setup_text);

		// don't save too many previous states
		if (this.status_history.length > 5){
			this.status_history.shift();
		}		
	}	
		

	RestorePreviousState() {

		if (this.status_history.length < 2){ return false; 	}

		ResetInterface();
			
		let current_state = this.status_history[this.status_history.length-1];
		let previous_state = this.status_history[this.status_history.length-2];

		this.status_history.pop();
		this.status_history.pop();


		// add current state to redo history
		this.status_history_redo.push(current_state);

		// restore previous state
		this.ApplySetup(previous_state);
	}

	RedoState(){
		if (this.status_history_redo.length == 0){ return false }

		ResetInterface();

		let state = this.status_history_redo.pop();
		
		this.ApplySetup(state);
	}

	PrintCurrentSetup(){

		function EscapeQuotes(text){
			return text.replace('"', '\\"').replace("'", "\\'").replace(/\n/g,'\\n');
		}

		this.state.pressed.leftmousebutton = false;

		let input_selected = this.state.input_selected;
		let object_clicked_on = this.state.object_clicked_on;
		let input_object = this.state.input_object;

		this.state.input_selected = null;
		this.state.object_clicked_on = null;
		this.state.input_object = null;


		let output = ""
		let code = ""
	
		// export main state
		code +=    `let state_json = \`${JSON.stringify(this.state, getCircularReplacer())}\`; 
					app.state = JSON.parse(state_json);`;
		code +=    `let viewport_json = \`${JSON.stringify(viewport)}\`;
					viewport = JSON.parse(viewport_json);

					var obj;
		
		`;

		let template = ''
		// export objects
		for (let obj of this.objects)
		{
			template = `
				obj = newRect(app.objects);
				obj.pos.y = ${obj.pos.y};
				obj.pos.x = ${obj.pos.x};
				obj.width = ${obj.width};
				obj.height = ${obj.height};
				obj.bgcolor = '${obj.bgcolor}';
				obj.textcolor = '${obj.textcolor}';
				obj.text = "${EscapeQuotes(obj.text)}";
				obj.textsize = ${obj.textsize};
				obj.draw_arrow = "${obj.draw_arrow}";
				obj.border_radius = "${obj.border_radius}";
				obj.border_thickness = "${obj.border_thickness}";
				obj.text_align = "${obj.text_align}";
				obj.bg_image_id = "${obj.bg_image_id_stored}";
				obj.locked = ${obj.locked.toString()};
				obj.center = "${obj.center}";
				
				`
			code += template
		}

		// remove tabs from string
		let tab = RegExp("\\t", "g");
		code = code.replace(tab, '');

		// Now we have our code, wrap it in a function so we can call it at command
		let lines = code.split('\n');
		output = "function LoadSavedState(app){\n";
		for (let line of lines){
			output += "\t" + line + "\n"
		}
		output += "}"

		// Restore
		this.state.input_selected = input_selected;
		this.state.object_clicked_on = object_clicked_on;
		this.state.input_object = input_object;

		return output;
	}


	DownloadCurrentSetup(filename) {
		let text = this.PrintCurrentSetup()

		// download file option
		
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		element.setAttribute('download', filename);
		
		element.style.display = 'none';
		document.body.appendChild(element);
		
		element.click();
		
		document.body.removeChild(element);
		  	
	}	

	DownloadString(filename, text) {

		// download file option
		
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		element.setAttribute('download', filename);
		
		element.style.display = 'none';
		document.body.appendChild(element);
		
		element.click();
		
		document.body.removeChild(element);
		  	
	}		


}