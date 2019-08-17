function lesser(a,b){
	if (a > b){
		return b
	}
	return a
}
function greater(a,b){
	if (a < b){
		return b
	}
	return a
}

function GetSelectedObjects() {
	let list = [];
	for (obj of ObjectList){
		if (obj.selected){
			list.push(obj);
		}
	}
	return list;
}