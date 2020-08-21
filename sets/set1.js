function LoadSavedState(app){
	let state_json = `{"mousepos":{"at_lmbd":{"x":151,"y":138},"at_lmbu":{"x":151,"y":138},"current":{"x":329,"y":258},"at_rmbd":{"x":845,"y":371}},"clicked_on":{"rectangle":null,"link":null},"editpane":{"rectangle":null,"link":null},"object_origin":[{"x":50,"y":5},{"x":69,"y":-3},{"x":84,"y":10},{"x":91,"y":14},{"x":68,"y":14},{"x":139,"y":4},{"x":79,"y":14}],"viewport_origin":{"x":63.5111281041267,"y":481.4580645171273},"pressed":{"spacebar":false,"ctrl":false,"shift":false,"leftmousebutton":false,"rightmousebutton":false},"selectionrect":null,"input_selected":null,"objIncrement":420,"persistent_choices":{"draw_grid":true,"draw_help_text":true,"force_pan":false,"page_bgcolor":"rgba(255,255,255,1)","page_gridcolor":"rgba(205,205,205,0.3)"},"input_object":null,"object_corner_selected":null,"object_clicked_on":null}`; 
	app.state = JSON.parse(state_json);let viewport_json = `{"x":63.5111281041267,"y":481.4580645171273,"blocksize":11.958890883270906}`;
	viewport = JSON.parse(viewport_json);
	
	var obj;
	var link;
	
	obj = ObjectMngr.NewRect();
	obj.id = undefined;
	obj.pos.y = 1;
	obj.pos.x = 1;
	obj.width = 12;
	obj.height = 4;
	obj.bgcolor = 'rgba(255,255,255,1)';
	obj.textcolor = '#000000';
	obj.text = "";
	obj.textsize = '8';
	obj.draw_arrow = 'none';
	obj.border_radius = '0';
	obj.border_thickness = '1';
	obj.text_align = 'top-left';
	obj.bg_image_id = 'undefined';
	obj.locked = false;
	obj.center = 'top-left';
	ObjectMngr.SetStandardRect(obj);
	
	obj = ObjectMngr.NewRect(ObjectMngr);
	obj.id = 3;
	obj.pos.y = -14;
	obj.pos.x = 71;
	obj.width = 12;
	obj.height = 4;
	obj.text = "Step 2";
	obj.bg_image_id = 'undefined';
	
	obj = ObjectMngr.NewRect(ObjectMngr);
	obj.id = 6;
	obj.pos.y = -11;
	obj.pos.x = 52;
	obj.width = 12;
	obj.height = 4;
	obj.text = "Step 1.";
	obj.bg_image_id = 'undefined';
	
	obj = ObjectMngr.NewRect(ObjectMngr);
	obj.id = 8;
	obj.pos.y = -5;
	obj.pos.x = 87;
	obj.width = 12;
	obj.height = 4;
	obj.text = "Step 3";
	obj.bg_image_id = 'undefined';
	
	link = ObjectMngr.NewLink(ObjectMngr);
	link.id = 9;
	link.dst = 3;
	link.dst_side = "left";
	link.dst_head = "arrow";
	link.src = 6;
	link.src_side = "right";
	link.src_head = "none";
	link.style = "straight";
	link.color = "#000000";
	link.lineWidth = 1;
	
	link = ObjectMngr.NewLink(ObjectMngr);
	link.id = 10;
	link.dst = 8;
	link.dst_side = "top";
	link.dst_head = "arrow";
	link.src = 3;
	link.src_side = "right";
	link.src_head = "none";
	link.style = "straight";
	link.color = "#000000";
	link.lineWidth = 1;
	
}