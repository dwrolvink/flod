

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

	if (['width', 'height'].includes(el.id) ) {
		
		if (+el.value % 2){
			obj[el.id] = +el.value + 1;
			el.value = obj[el.id];
		}
		else {
			obj[el.id] = el.value
		}
		
	}

	/*
	if (el.id == 'bgcolor') {
		
		color = el.value.split(',');
		// limit rbg
		for (i=0; i < 3 ;i++){
			if (color[i] > 250){
				color[i] = 250;
			}
			else if (color[i] < 0){
				color[i] = 0;
			}
		}
		// limit a
		if (color[3] > 1){
			color[3] = 1;
		}
		else if (color[3] < 0){
			color[3] = 0;
		}
		

		obj[el.id] = color;
		el.value = color;
	}
	*/

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

	// add responsiveness to select number of inputs
	el = document.getElementById('text');
	el.addEventListener("keyup",    function(){ProcessInput(this)}      );

	el = document.getElementById('draw_arrow');
	el.addEventListener("change",    function(){ProcessInput(this)}      );	

	el = document.getElementById('border_radius');
	el.addEventListener("change",    function(){ProcessInput(this)}      );	
	
	el = document.getElementById('text_align');
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
}
	
function ChangeObjectNumericProperty(el, amount){
	obj = eventmgmt.input_object;
	property = el.id.replace('+','').replace('-','');
	input = document.getElementById(property);
	input.value = Number(input.value) + amount;
	obj[property] = Number(input.value);
}