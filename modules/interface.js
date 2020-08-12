

function LoadObjectEditPane(obj){
	eventmgmt.input_object = obj;
	elements =  document.getElementsByClassName('input');

	ResetDropDowns();

	// load object
	if (obj != null) {
		document.getElementById("objectEditPane").style.visibility = 'visible';
		for (el of elements) {
			el.value = obj[el.id];

			// color needs extra steps
			if (el.id == 'bgcolor'){
				document.querySelector('#bgcolor').jscolor.fromString(el.value)
			}
		}
	}
	// reset
	else {
		document.getElementById("objectEditPane").style.visibility = 'hidden';
		for (el of elements) {
			el.value = '';
		}
	}
}

function ResetDropDowns(){
	// custom
	document.querySelector('#draw_arrow [value="none"]').selected = true;
	document.querySelector('#text_align [value="none"]').selected = true;
}

function RefreshObjectEditPane(){
	if (ObjectList.GetSelectedObjects().length == 1) {
		obj = ObjectList.GetSelectedObjects()[0];
		LoadObjectEditPane(obj);
	}
	else {
		LoadObjectEditPane(null);
	}
}

function SelectInput(input){
	eventmgmt.input_selected = input
}


function ProcessInput(el){
	obj = eventmgmt.input_object;

	// page settings
	if (el.id == 'page_bgcolor') {
		eventmgmt.persistent_choices.page_bgcolor = el.value;
		document.getElementById("mainCanvas").style.backgroundColor = el.value;
	}
	else if (el.id == 'page_gridcolor') {
		eventmgmt.persistent_choices.page_gridcolor = el.value;
	}	

	// object settings
	else {
		obj[el.id] = el.value;
	}
	
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

	// page settings
	el = document.getElementById('page_bgcolor');
	el.addEventListener("change",    function(){ProcessInput(this)}      );	
	
	el = document.getElementById('page_gridcolor');
	el.addEventListener("change",    function(){ProcessInput(this)}      );		

	// arm nudgers
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
}
	
function ChangeObjectNumericProperty(el, amount){
	obj = eventmgmt.input_object;
	property = el.id.replace('+','').replace('-','');
	input = document.getElementById(property);
	input.value = Number(input.value) + amount;
	obj[property] = Number(input.value);
}