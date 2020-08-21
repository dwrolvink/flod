
// This file handles all the interface actions.
// The interface are the forms to edit the object/page settings defined in index.html


// - Makes the object edit pane visible
// - Loads the input with the current settings for the object.
function OpenObjectEditPane(obj)
{
	
	// Make it globally known that we are editing this object
	// This is used when we process the update events of the inputs.
	app.state.editpane.rectangle = obj;

	// Show object edit pane 
	document.getElementById("objectEditPane").style.visibility = 'visible';	

	// Get all elements in the object edit pane (per category)
	input_elements =  document.getElementById("objectEditPane").getElementsByClassName('input');
	select_elements =  document.getElementById("objectEditPane").getElementsByClassName('select');
	color_elements =  document.getElementById("objectEditPane").getElementsByClassName('jscolor');

	// set input values
	for (el of input_elements) {
		el.value = obj[el.id];
	}

	// Set dropdown selected
	for (el of select_elements) {
		document.querySelector(`#${el.id} [value="${obj[el.id].toString()}"]`).selected = true;
	}

	// jscolor fields need a separate call to update the color preview
	for (el of color_elements) {
		document.querySelector('#'+el.id).jscolor.fromString(obj[el.id])
	}	
}

// Hides the object edit pane, and executes all actions that need to be done when 
// the edit object pane is hidden
function CloseObjectEditPane()
{
	app.state.editpane.rectangle = null;

	// Hide pane
	document.getElementById("objectEditPane").style.visibility = 'hidden';
}

// Hide the ObjectEditPane if the number of selected objects != 1
function RefreshObjectEditPane()
{
	if (ObjectMngr.GetAllSelectedObjects().length == 1) 
	{
		obj = ObjectMngr.GetAllSelectedObjects()[0];
		OpenObjectEditPane(obj);
	}
	else {
		CloseObjectEditPane();
	}
}


function OpenLinkEditPane(obj)
{
	// Make it globally known that we are editing this link
	// This is used when we process the update events of the inputs.
	app.state.editpane.link = obj;

	// Show object edit pane 
	document.getElementById("linkEditPane").style.visibility = 'visible';	

	// Get all elements in the object edit pane (per category)
	input_elements =  document.getElementById("linkEditPane").getElementsByClassName('input');
	select_elements =  document.getElementById("linkEditPane").getElementsByClassName('select');
	color_elements =  document.getElementById("linkEditPane").getElementsByClassName('jscolor');

	// set input values
	for (el of input_elements) {
		el.value = obj[el.id];
	}

	// Set dropdown selected
	for (el of select_elements) {
		document.querySelector(`#${el.id} [value="${obj[el.id].toString()}"]`).selected = true;
	}

	// jscolor fields need a separate call to update the color preview
	for (el of color_elements) {
		document.querySelector('#'+el.id).jscolor.fromString(obj[el.id])
	}	
}


function CloseLinkEditPane()
{
	
	app.state.editpane.link = null;

	// Hide pane
	document.getElementById("linkEditPane").style.visibility = 'hidden';
}




// When we are typing in the interface, we don't want to call any hotkeys
// This function is a more readable wrapper for it's contents.
function SelectInput(input){
	app.state.input_selected = input
}


function ProcessInput(el){

	// load object that is being edited
	if (el.classList.contains('object')) {
		obj = app.state.editpane.rectangle;
	}
	else if (el.classList.contains('link')) {
		obj = app.state.editpane.link;
	}

	// specific handling for page settings
	if (el.id == 'page_bgcolor') {
		app.state.persistent_choices.page_bgcolor = el.value;
		document.getElementById("mainCanvas").style.backgroundColor = el.value;
	}
	else if (el.id == 'page_gridcolor') {
		app.state.persistent_choices.page_gridcolor = el.value;
	}	

	// specific handling for object settings
	else if (el.id == 'locked') {
		if (el.value == 'true'){
			obj[el.id] = true;
		}
		else {
			obj[el.id] = false;
		}
	}		
	else {
		obj[el.id] = el.value;
	}

	app.SaveCurrentSetup();
}

function ArmInputFields() {
	// arm all inputs with class input
	elements =  document.getElementsByClassName('input');
	for (el of elements) {
		el.addEventListener("change",   function(){ProcessInput(this)}      );
		el.addEventListener("focusin",  function(){SelectInput(this)}       );
		el.addEventListener("focusout", function(){SelectInput(null)}       );
	}

	// object settings
	el = document.getElementById('text');
	el.addEventListener("keyup",    function(){ProcessInput(this)}      );

	el = document.getElementById('draw_arrow');
	el.addEventListener("change",    function(){ProcessInput(this)}      );	

	el = document.getElementById('border_radius');
	el.addEventListener("change",    function(){ProcessInput(this)}      );	
	
	el = document.getElementById('text_align');
	el.addEventListener("change",    function(){ProcessInput(this)}      );		

	el = document.getElementById('locked');
	el.addEventListener("change",    function(){ProcessInput(this)}      );		

	// link settings
	el = document.getElementById('src_side');
	el.addEventListener("change",    function(){ProcessInput(this)}      );	

	el = document.getElementById('dst_side');
	el.addEventListener("change",    function(){ProcessInput(this)}      );	
	
	el = document.getElementById('color');
	el.addEventListener("change",    function(){ProcessInput(this)}      );	
	
	el = document.getElementById('lineWidth');
	el.addEventListener("change",    function(){ProcessInput(this)}      );		

	// page settings
	el = document.getElementById('page_bgcolor');
	el.addEventListener("change",    function(){ProcessInput(this)}      );	
	
	el = document.getElementById('page_gridcolor');
	el.addEventListener("change",    function(){ProcessInput(this)}      );		

	el = document.getElementById('download_file');
	el.addEventListener("click",    function(){app.DownloadCurrentSetup('set1.js')}      );	
	
	el = document.getElementById('print_object');
	el.addEventListener("click",    function(){app.screen.PrintObject()}      );	

	// arm nudgers
	// ** objects
	el = document.getElementById('+height');
	el.addEventListener("click",    function(){ChangeObjectNumericProperty(this, 2)}      );

	el = document.getElementById('-height');
	el.addEventListener("click",    function(){ChangeObjectNumericProperty(this, -2)}      );

	el = document.getElementById('+width');
	el.addEventListener("click",    function(){ChangeObjectNumericProperty(this, 2)}      );

	el = document.getElementById('-width');
	el.addEventListener("click",    function(){ChangeObjectNumericProperty(this, -2)}      );	

	el = document.getElementById('+textsize');
	el.addEventListener("click",    function(){ChangeObjectNumericProperty(this, 1)}      );

	el = document.getElementById('-textsize');
	el.addEventListener("click",    function(){ChangeObjectNumericProperty(this, -1)}      );	

	el = document.getElementById('+border_thickness');
	el.addEventListener("click",    function(){ChangeObjectNumericProperty(this, 1)}      );

	el = document.getElementById('-border_thickness');
	el.addEventListener("click",    function(){ChangeObjectNumericProperty(this, -1)}      );	

	// ** links
	el = document.getElementById('+lineWidth');
	el.addEventListener("click",    function(){ChangeObjectNumericProperty(this, 1)}      );

	el = document.getElementById('-lineWidth');
	el.addEventListener("click",    function(){ChangeObjectNumericProperty(this, -1)}      );	
}
	
function ChangeObjectNumericProperty(el, amount)
{
	// load object that is being edited
	if (el.classList.contains('object')) {
		obj = app.state.editpane.rectangle;
	}
	else if (el.classList.contains('link')) {
		obj = app.state.editpane.link;
	}	

	// nudgers are prefixed with + and -, they change the main property (the one without the prefix)
	property = el.id.replace('+','').replace('-','');

	input = document.getElementById(property);
	input.value = Number(input.value) + amount;

	obj[property] = Number(input.value);

	app.SaveCurrentSetup();
}

function ResetInterface(){
	Clipboard.objects = [];
	CloseObjectEditPane();
	document.getElementById("pageSettings").style.visibility = "hidden";
	app.ObjectManager.DeselectAllObjects([]);
}