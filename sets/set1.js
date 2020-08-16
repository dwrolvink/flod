function LoadSavedState(app){

	let state_json = `{"mousepos":{"at_lmbd":{"x":1312,"y":527},"at_lmbu":{"x":1262,"y":574},"current":{"x":1237,"y":503}},"object_clicked_on":null,"object_origin":{"x":127,"y":106},"viewport_origin":{"x":334.8572389163013,"y":-5.960259673052555},"pressed":{"spacebar":false,"ctrl":false,"shift":false,"leftmousebutton":false},"selectionrect":null,"input_selected":null,"objIncrement":420,"persistent_choices":{"draw_grid":true,"draw_help_text":true,"force_pan":true,"page_bgcolor":"rgba(0,41,78,1)","page_gridcolor":"rgba(0,59,111,1)"},"input_object":null}`; 
	app.state = JSON.parse(state_json);
	let viewport_json = `{"x":284.8572389163013,"y":41.039740326947445,"blocksize":6.16837561689142}`;
	app.viewport = JSON.parse(viewport_json);


	obj = newRect(app.objects);
	obj.pos.y = 104;
	obj.pos.x = 108;
	obj.width = 38;
	obj.height = 16;
	obj.bgcolor = 'rgba(13,5,50,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "Backend.Vault";
	obj.textsize = 8;
	obj.draw_arrow = "none";
	obj.border_radius = "10";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 104;
	obj.pos.x = 75;
	obj.width = 30;
	obj.height = 28;
	obj.bgcolor = 'rgba(13,5,50,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "Integrator";
	obj.textsize = 8;
	obj.draw_arrow = "none";
	obj.border_radius = "10";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 11;
	obj.pos.x = 49;
	obj.width = 82;
	obj.height = 60;
	obj.bgcolor = 'rgba(13,5,50,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "Backend.Vault";
	obj.textsize = 8;
	obj.draw_arrow = "none";
	obj.border_radius = "10";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 11;
	obj.pos.x = 38;
	obj.width = 10;
	obj.height = 60;
	obj.bgcolor = 'rgba(13,5,50,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "Requestor";
	obj.textsize = 8;
	obj.draw_arrow = "none";
	obj.border_radius = "10";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 35;
	obj.pos.x = 98;
	obj.width = 16;
	obj.height = 2;
	obj.bgcolor = 'rgba(255,60,159,0.42)';
	obj.textcolor = '#FFFFFF';
	obj.text = "";
	obj.textsize = 6;
	obj.draw_arrow = "right_narrow";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 47;
	obj.pos.x = 98;
	obj.width = 16;
	obj.height = 2;
	obj.bgcolor = 'rgba(255,60,159,0.42)';
	obj.textcolor = '#FFFFFF';
	obj.text = "";
	obj.textsize = 6;
	obj.draw_arrow = "right_narrow";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 22;
	obj.pos.x = 46;
	obj.width = 6;
	obj.height = 2;
	obj.bgcolor = 'rgba(255,255,255,0.47)';
	obj.textcolor = '#FFFFFF';
	obj.text = "";
	obj.textsize = 6;
	obj.draw_arrow = "left_narrow";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 28;
	obj.pos.x = 84;
	obj.width = 14;
	obj.height = 24;
	obj.bgcolor = 'rgba(14,75,213,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "Get_Decrypt_Key";
	obj.textsize = 8;
	obj.draw_arrow = "none";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 17;
	obj.pos.x = 40;
	obj.width = 12;
	obj.height = 2;
	obj.bgcolor = 'rgba(0,188,255,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "uuid";
	obj.textsize = 7;
	obj.draw_arrow = "right";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 5;
	obj.pos.x = 38;
	obj.width = 22;
	obj.height = 4;
	obj.bgcolor = 'rgba(13,5,50,0)';
	obj.textcolor = '#FFFFFF';
	obj.text = "Decrypt Secret";
	obj.textsize = 15;
	obj.draw_arrow = "none";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 19;
	obj.pos.x = 98;
	obj.width = 16;
	obj.height = 2;
	obj.bgcolor = 'rgba(255,255,255,0.47)';
	obj.textcolor = '#FFFFFF';
	obj.text = "";
	obj.textsize = 7;
	obj.draw_arrow = "right_narrow";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 18;
	obj.pos.x = 84;
	obj.width = 14;
	obj.height = 8;
	obj.bgcolor = 'rgba(14,75,213,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "Get_Secret";
	obj.textsize = 8;
	obj.draw_arrow = "none";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 17;
	obj.pos.x = 114;
	obj.width = 14;
	obj.height = 14;
	obj.bgcolor = 'rgba(0,188,255,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "success: bool\nmessage: string\nreturn_code: int\npayload: [secret]";
	obj.textsize = 6;
	obj.draw_arrow = "none";
	obj.border_radius = "5";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 23;
	obj.pos.x = 116;
	obj.width = 10;
	obj.height = 6;
	obj.bgcolor = 'rgba(69,91,108,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "id, uuid, vault_id,\nname, description,\ncypher_string,\nowner_id";
	obj.textsize = 6;
	obj.draw_arrow = "none";
	obj.border_radius = "5";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 34;
	obj.pos.x = 84;
	obj.width = 14;
	obj.height = 4;
	obj.bgcolor = 'rgba(116,182,0,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "vault_id != 0?";
	obj.textsize = 7;
	obj.draw_arrow = "none";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 38;
	obj.pos.x = 84;
	obj.width = 14;
	obj.height = 4;
	obj.bgcolor = 'rgba(116,182,0,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "owner_id == 0? ";
	obj.textsize = 7;
	obj.draw_arrow = "none";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 39;
	obj.pos.x = 98;
	obj.width = 16;
	obj.height = 2;
	obj.bgcolor = 'rgba(255,255,255,0.47)';
	obj.textcolor = '#FFFFFF';
	obj.text = "";
	obj.textsize = 6;
	obj.draw_arrow = "right_narrow";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 42;
	obj.pos.x = 84;
	obj.width = 14;
	obj.height = 4;
	obj.bgcolor = 'rgba(116,182,0,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "owner_id == session[\'user_id']";
	obj.textsize = 5;
	obj.draw_arrow = "none";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 43;
	obj.pos.x = 98;
	obj.width = 16;
	obj.height = 2;
	obj.bgcolor = 'rgba(255,255,255,0.47)';
	obj.textcolor = '#FFFFFF';
	obj.text = "";
	obj.textsize = 5;
	obj.draw_arrow = "right_narrow";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 16;
	obj.pos.x = 52;
	obj.width = 14;
	obj.height = 52;
	obj.bgcolor = 'rgba(14,75,213,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "Decrypt_Secret";
	obj.textsize = 9;
	obj.draw_arrow = "none";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 22;
	obj.pos.x = 52;
	obj.width = 14;
	obj.height = 2;
	obj.bgcolor = 'rgba(116,182,0,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "return_code != 200?";
	obj.textsize = 6;
	obj.draw_arrow = "none";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 62;
	obj.pos.x = 52;
	obj.width = 14;
	obj.height = 2;
	obj.bgcolor = 'rgba(116,182,0,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "return_code != 200?";
	obj.textsize = 6;
	obj.draw_arrow = "none";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 66;
	obj.pos.x = 40;
	obj.width = 12;
	obj.height = 2;
	obj.bgcolor = 'rgba(0,188,255,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "secret_value";
	obj.textsize = 6;
	obj.draw_arrow = "left";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 51;
	obj.pos.x = 52;
	obj.width = 14;
	obj.height = 2;
	obj.bgcolor = 'rgba(0,19,182,0.17)';
	obj.textcolor = '#FFFFFF';
	obj.text = "key = result";
	obj.textsize = 6;
	obj.draw_arrow = "none";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 24;
	obj.pos.x = 52;
	obj.width = 14;
	obj.height = 2;
	obj.bgcolor = 'rgba(0,19,182,0.17)';
	obj.textcolor = '#FFFFFF';
	obj.text = "secret = payload";
	obj.textsize = 6;
	obj.draw_arrow = "none";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 64;
	obj.pos.x = 52;
	obj.width = 14;
	obj.height = 2;
	obj.bgcolor = 'rgba(0,19,182,0.17)';
	obj.textcolor = '#FFFFFF';
	obj.text = "secret_value = payload";
	obj.textsize = 6;
	obj.draw_arrow = "none";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 33;
	obj.pos.x = 114;
	obj.width = 14;
	obj.height = 20;
	obj.bgcolor = 'rgba(0,188,255,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "success: bool\nmessage: string\nreturn_code: int\npayload: [decrypt_key]";
	obj.textsize = 6;
	obj.draw_arrow = "none";
	obj.border_radius = "5";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 39;
	obj.pos.x = 116;
	obj.width = 10;
	obj.height = 2;
	obj.bgcolor = 'rgba(69,91,108,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "string";
	obj.textsize = 6;
	obj.draw_arrow = "none";
	obj.border_radius = "5";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 49;
	obj.pos.x = 52;
	obj.width = 14;
	obj.height = 2;
	obj.bgcolor = 'rgba(116,182,0,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "return_code != 200?";
	obj.textsize = 6;
	obj.draw_arrow = "none";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 57;
	obj.pos.x = 92;
	obj.width = 16;
	obj.height = 2;
	obj.bgcolor = 'rgba(255,255,255,0.47)';
	obj.textcolor = '#FFFFFF';
	obj.text = "";
	obj.textsize = 7;
	obj.draw_arrow = "right_narrow";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 56;
	obj.pos.x = 84;
	obj.width = 14;
	obj.height = 10;
	obj.bgcolor = 'rgba(14,75,213,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "Decrypt ";
	obj.textsize = 9;
	obj.draw_arrow = "none";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 56;
	obj.pos.x = 108;
	obj.width = 14;
	obj.height = 12;
	obj.bgcolor = 'rgba(0,188,255,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "success: bool\nmessage: string\nreturn_code: int\npayload: [secret_value]";
	obj.textsize = 6;
	obj.draw_arrow = "none";
	obj.border_radius = "5";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 62;
	obj.pos.x = 110;
	obj.width = 10;
	obj.height = 2;
	obj.bgcolor = 'rgba(69,91,108,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "string";
	obj.textsize = 6;
	obj.draw_arrow = "none";
	obj.border_radius = "5";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 22;
	obj.pos.x = 40;
	obj.width = 6;
	obj.height = 2;
	obj.bgcolor = 'rgba(255,60,159,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "error: 404";
	obj.textsize = 6;
	obj.draw_arrow = "none";
	obj.border_radius = "2";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 29;
	obj.pos.x = 66;
	obj.width = 18;
	obj.height = 2;
	obj.bgcolor = 'rgba(0,188,255,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "secret";
	obj.textsize = 7;
	obj.draw_arrow = "right";
	obj.border_radius = "5";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 49;
	obj.pos.x = 46;
	obj.width = 6;
	obj.height = 2;
	obj.bgcolor = 'rgba(255,255,255,0.47)';
	obj.textcolor = '#FFFFFF';
	obj.text = "";
	obj.textsize = 6;
	obj.draw_arrow = "left_narrow";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 49;
	obj.pos.x = 40;
	obj.width = 6;
	obj.height = 2;
	obj.bgcolor = 'rgba(255,60,159,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "error: rc";
	obj.textsize = 6;
	obj.draw_arrow = "none";
	obj.border_radius = "5";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 35;
	obj.pos.x = 99;
	obj.width = 12;
	obj.height = 2;
	obj.bgcolor = 'rgba(255,60,159,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "error: 501";
	obj.textsize = 6;
	obj.draw_arrow = "none";
	obj.border_radius = "5";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 39;
	obj.pos.x = 99;
	obj.width = 12;
	obj.height = 2;
	obj.bgcolor = 'rgba(0,188,255,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "self.secret_key";
	obj.textsize = 6;
	obj.draw_arrow = "none";
	obj.border_radius = "5";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 47;
	obj.pos.x = 99;
	obj.width = 12;
	obj.height = 2;
	obj.bgcolor = 'rgba(255,60,159,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "error: 403";
	obj.textsize = 6;
	obj.draw_arrow = "none";
	obj.border_radius = "5";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 43;
	obj.pos.x = 99;
	obj.width = 12;
	obj.height = 2;
	obj.bgcolor = 'rgba(0,188,255,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "session[\'secret_key']";
	obj.textsize = 6;
	obj.draw_arrow = "none";
	obj.border_radius = "5";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 62;
	obj.pos.x = 46;
	obj.width = 6;
	obj.height = 2;
	obj.bgcolor = 'rgba(255,255,255,0.47)';
	obj.textcolor = '#FFFFFF';
	obj.text = "";
	obj.textsize = 6;
	obj.draw_arrow = "left_narrow";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 62;
	obj.pos.x = 40;
	obj.width = 6;
	obj.height = 2;
	obj.bgcolor = 'rgba(255,60,159,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "error: 500";
	obj.textsize = 6;
	obj.draw_arrow = "none";
	obj.border_radius = "5";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 19;
	obj.pos.x = 66;
	obj.width = 18;
	obj.height = 2;
	obj.bgcolor = 'rgba(0,188,255,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "uuid";
	obj.textsize = 7;
	obj.draw_arrow = "right";
	obj.border_radius = "5";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 56;
	obj.pos.x = 66;
	obj.width = 18;
	obj.height = 4;
	obj.bgcolor = 'rgba(0,188,255,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "secret.cipher_string,\nkey";
	obj.textsize = 7;
	obj.draw_arrow = "right";
	obj.border_radius = "5";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 50;
	obj.pos.x = 66;
	obj.width = 48;
	obj.height = 2;
	obj.bgcolor = 'rgba(0,188,255,0.39)';
	obj.textcolor = '#FFFFFF';
	obj.text = "";
	obj.textsize = 7;
	obj.draw_arrow = "left_narrow";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 23;
	obj.pos.x = 66;
	obj.width = 48;
	obj.height = 2;
	obj.bgcolor = 'rgba(0,188,255,0.4)';
	obj.textcolor = '#FFFFFF';
	obj.text = "";
	obj.textsize = 7;
	obj.draw_arrow = "left_narrow";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 63;
	obj.pos.x = 66;
	obj.width = 42;
	obj.height = 2;
	obj.bgcolor = 'rgba(0,188,255,0.39)';
	obj.textcolor = '#FFFFFF';
	obj.text = "";
	obj.textsize = 7;
	obj.draw_arrow = "left_narrow";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 84;
	obj.pos.x = 75;
	obj.width = 56;
	obj.height = 18;
	obj.bgcolor = 'rgba(13,5,50,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "Backend.Profile";
	obj.textsize = 8;
	obj.draw_arrow = "none";
	obj.border_radius = "10";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 84;
	obj.pos.x = 38;
	obj.width = 10;
	obj.height = 54;
	obj.bgcolor = 'rgba(13,5,50,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "User";
	obj.textsize = 8;
	obj.draw_arrow = "none";
	obj.border_radius = "10";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 78;
	obj.pos.x = 38;
	obj.width = 70;
	obj.height = 4;
	obj.bgcolor = 'rgba(13,5,50,0)';
	obj.textcolor = '#FFFFFF';
	obj.text = "Generate User Private Key at Login (session[\'secret_key'])";
	obj.textsize = 15;
	obj.draw_arrow = "none";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 84;
	obj.pos.x = 49;
	obj.width = 24;
	obj.height = 54;
	obj.bgcolor = 'rgba(13,5,50,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "Frontend";
	obj.textsize = 8;
	obj.draw_arrow = "none";
	obj.border_radius = "10";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 89;
	obj.pos.x = 40;
	obj.width = 12;
	obj.height = 4;
	obj.bgcolor = 'rgba(0,188,255,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "username\npassword";
	obj.textsize = 7;
	obj.draw_arrow = "right";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 89;
	obj.pos.x = 52;
	obj.width = 14;
	obj.height = 46;
	obj.bgcolor = 'rgba(14,75,213,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "Render_login_page";
	obj.textsize = 7;
	obj.draw_arrow = "none";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 89;
	obj.pos.x = 66;
	obj.width = 18;
	obj.height = 4;
	obj.bgcolor = 'rgba(0,188,255,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "username\npassword";
	obj.textsize = 7;
	obj.draw_arrow = "right";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 88;
	obj.pos.x = 84;
	obj.width = 14;
	obj.height = 10;
	obj.bgcolor = 'rgba(14,75,213,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "Authenticate";
	obj.textsize = 8;
	obj.draw_arrow = "none";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 87;
	obj.pos.x = 108;
	obj.width = 14;
	obj.height = 12;
	obj.bgcolor = 'rgba(0,188,255,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "success: bool\nmessage: string\nreturn_code: int\npayload: [user_id]";
	obj.textsize = 6;
	obj.draw_arrow = "none";
	obj.border_radius = "2";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 93;
	obj.pos.x = 110;
	obj.width = 10;
	obj.height = 2;
	obj.bgcolor = 'rgba(69,91,108,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "int";
	obj.textsize = 6;
	obj.draw_arrow = "none";
	obj.border_radius = "5";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 90;
	obj.pos.x = 98;
	obj.width = 10;
	obj.height = 2;
	obj.bgcolor = 'rgba(255,255,255,0.47)';
	obj.textcolor = '#FFFFFF';
	obj.text = "";
	obj.textsize = 7;
	obj.draw_arrow = "right_narrow";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 95;
	obj.pos.x = 66;
	obj.width = 42;
	obj.height = 2;
	obj.bgcolor = 'rgba(0,188,255,0.39)';
	obj.textcolor = '#FFFFFF';
	obj.text = "";
	obj.textsize = 7;
	obj.draw_arrow = "left_narrow";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 96;
	obj.pos.x = 52;
	obj.width = 14;
	obj.height = 2;
	obj.bgcolor = 'rgba(0,19,182,0.17)';
	obj.textcolor = '#FFFFFF';
	obj.text = "user_id = payload";
	obj.textsize = 6;
	obj.draw_arrow = "none";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 94;
	obj.pos.x = 52;
	obj.width = 14;
	obj.height = 2;
	obj.bgcolor = 'rgba(116,182,0,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "return_code != 200?";
	obj.textsize = 6;
	obj.draw_arrow = "none";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 94;
	obj.pos.x = 46;
	obj.width = 6;
	obj.height = 2;
	obj.bgcolor = 'rgba(255,255,255,0.47)';
	obj.textcolor = '#FFFFFF';
	obj.text = "";
	obj.textsize = 6;
	obj.draw_arrow = "left_narrow";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 94;
	obj.pos.x = 40;
	obj.width = 6;
	obj.height = 2;
	obj.bgcolor = 'rgba(255,60,159,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "error: 403";
	obj.textsize = 6;
	obj.draw_arrow = "none";
	obj.border_radius = "5";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 108;
	obj.pos.x = 84;
	obj.width = 14;
	obj.height = 22;
	obj.bgcolor = 'rgba(14,75,213,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "Login_user";
	obj.textsize = 8;
	obj.draw_arrow = "none";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 108;
	obj.pos.x = 66;
	obj.width = 18;
	obj.height = 6;
	obj.bgcolor = 'rgba(0,188,255,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "username\npassword\nuser_id";
	obj.textsize = 7;
	obj.draw_arrow = "right";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 110;
	obj.pos.x = 98;
	obj.width = 12;
	obj.height = 2;
	obj.bgcolor = 'rgba(0,188,255,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "password";
	obj.textsize = 7;
	obj.draw_arrow = "right";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 109;
	obj.pos.x = 110;
	obj.width = 20;
	obj.height = 8;
	obj.bgcolor = 'rgba(14,75,213,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "Generate_user_private_key";
	obj.textsize = 8;
	obj.draw_arrow = "none";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 106;
	obj.pos.x = 127;
	obj.width = 10;
	obj.height = 2;
	obj.bgcolor = 'rgba(0,255,220,0.44)';
	obj.textcolor = '#FFFFFF';
	obj.text = "self.secret_key";
	obj.textsize = 7;
	obj.draw_arrow = "left_down";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 112;
	obj.pos.x = 130;
	obj.width = 4;
	obj.height = 2;
	obj.bgcolor = 'rgba(255,255,255,0.47)';
	obj.textcolor = '#FFFFFF';
	obj.text = "";
	obj.textsize = 7;
	obj.draw_arrow = "right_narrow";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 112;
	obj.pos.x = 134;
	obj.width = 10;
	obj.height = 4;
	obj.bgcolor = 'rgba(0,188,255,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "user_private_key";
	obj.textsize = 6;
	obj.draw_arrow = "none";
	obj.border_radius = "5";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 114;
	obj.pos.x = 98;
	obj.width = 36;
	obj.height = 2;
	obj.bgcolor = 'rgba(0,188,255,0.39)';
	obj.textcolor = '#FFFFFF';
	obj.text = "";
	obj.textsize = 7;
	obj.draw_arrow = "left_narrow";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 122;
	obj.pos.x = 108;
	obj.width = 22;
	obj.height = 8;
	obj.bgcolor = 'rgba(158,94,233,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "Session";
	obj.textsize = 8;
	obj.draw_arrow = "none";
	obj.border_radius = "5";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 114;
	obj.pos.x = 84;
	obj.width = 14;
	obj.height = 2;
	obj.bgcolor = 'rgba(0,19,182,0.17)';
	obj.textcolor = '#FFFFFF';
	obj.text = "user_private_key = result";
	obj.textsize = 6;
	obj.draw_arrow = "none";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 125;
	obj.pos.x = 98;
	obj.width = 14;
	obj.height = 2;
	obj.bgcolor = 'rgba(0,188,255,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "user_private_key";
	obj.textsize = 6;
	obj.draw_arrow = "right";
	obj.border_radius = "5";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 125;
	obj.pos.x = 112;
	obj.width = 16;
	obj.height = 2;
	obj.bgcolor = 'rgba(2,21,65,0.6)';
	obj.textcolor = '#FFFFFF';
	obj.text = "session[\'user_private_key']";
	obj.textsize = 6;
	obj.draw_arrow = "none";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 127;
	obj.pos.x = 66;
	obj.width = 18;
	obj.height = 2;
	obj.bgcolor = 'rgba(0,188,255,0.39)';
	obj.textcolor = '#FFFFFF';
	obj.text = "";
	obj.textsize = 7;
	obj.draw_arrow = "left_narrow";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 127;
	obj.pos.x = 56;
	obj.width = 6;
	obj.height = 2;
	obj.bgcolor = 'rgba(35,142,41,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "OK";
	obj.textsize = 6;
	obj.draw_arrow = "none";
	obj.border_radius = "5";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 131;
	obj.pos.x = 52;
	obj.width = 14;
	obj.height = 2;
	obj.bgcolor = 'rgba(0,19,182,0.17)';
	obj.textcolor = '#FFFFFF';
	obj.text = "(...)";
	obj.textsize = 6;
	obj.draw_arrow = "none";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 131;
	obj.pos.x = 47;
	obj.width = 6;
	obj.height = 2;
	obj.bgcolor = 'rgba(0,188,255,0.39)';
	obj.textcolor = '#FFFFFF';
	obj.text = "";
	obj.textsize = 7;
	obj.draw_arrow = "left_narrow";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-left";


	obj = newRect(app.objects);
	obj.pos.y = 131;
	obj.pos.x = 39;
	obj.width = 8;
	obj.height = 2;
	obj.bgcolor = 'rgba(35,142,41,1)';
	obj.textcolor = '#FFFFFF';
	obj.text = "Home page";
	obj.textsize = 6;
	obj.draw_arrow = "none";
	obj.border_radius = "5";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 29;
	obj.pos.x = 98;
	obj.width = 12;
	obj.height = 2;
	obj.bgcolor = 'rgba(0,255,220,0.68)';
	obj.textcolor = '#FFFFFF';
	obj.text = "self.secret_key";
	obj.textsize = 7;
	obj.draw_arrow = "left";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 127;
	obj.pos.x = 84;
	obj.width = 14;
	obj.height = 2;
	obj.bgcolor = 'rgba(0,19,182,0.17)';
	obj.textcolor = '#FFFFFF';
	obj.text = "(...)";
	obj.textsize = 6;
	obj.draw_arrow = "none";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-center";


	obj = newRect(app.objects);
	obj.pos.y = 46;
	obj.pos.x = 84;
	obj.width = 14;
	obj.height = 4;
	obj.bgcolor = 'rgba(0,13,121,0.47)';
	obj.textcolor = '#FFFFFF';
	obj.text = "fall-through";
	obj.textsize = 6;
	obj.draw_arrow = "none";
	obj.border_radius = "0";
	obj.border_thickness = "0";
	obj.text_align = "top-center";

}
