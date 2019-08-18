

function LoadObjectEditPane(obj){
	eventmgmt.input_object = obj;
	elements =  document.getElementsByClassName('input');

	// load object
	if (obj != null) {
		document.getElementById("objectEditPane").style.visibility = 'visible';
		for (el of elements) {
			el.value = obj[el.id];
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

function SelectInput(input){
	eventmgmt.input_selected = input
}

function ProcessInput(el){
	obj = eventmgmt.input_object;

	obj[el.id] = el.value;

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
	
}

function ArmInputFields() {
	elements =  document.getElementsByClassName('input');
	for (el of elements) {
		el.addEventListener("change",   function(){ProcessInput(this)});
		el.addEventListener("focusin",  function(){SelectInput(this)}       );
		el.addEventListener("focusout", function(){SelectInput(null)}       );
	}
}
	
