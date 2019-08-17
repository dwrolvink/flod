// Function to make object creation less verbose
function newRect(list) {
	index = list.push(new Rectangle()); 
	return list[index-1];
}

// List of Objects
var ObjectList = [];

// Rectangles
obj = newRect(ObjectList);
obj.pos.x = 3;

obj = newRect(ObjectList);
obj.pos.y = 6;
obj.pos.x = 40;
obj.bgcolor = "#66aa66";
obj.text = "watchadoin?";

