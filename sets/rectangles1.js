
obj = newRect(ObjectList.objects);
obj.pos.y = 11;
obj.pos.x = 49;
obj.width = 76;
obj.height = 52;
obj.bgcolor = 'rgba(13,5,50,1)';
obj.text = "  Backend.Vault";
obj.textsize = 8;
obj.draw_arrow = "none";
obj.border_radius = "30";


obj = newRect(ObjectList.objects);
obj.pos.y = 11;
obj.pos.x = 38;
obj.width = 10;
obj.height = 52;
obj.bgcolor = 'rgba(13,5,50,1)';
obj.text = "   Frontend";
obj.textsize = 8;
obj.draw_arrow = "none";
obj.border_radius = "30";


obj = newRect(ObjectList.objects);
obj.pos.y = 34;
obj.pos.x = 92;
obj.width = 16;
obj.height = 2;
obj.bgcolor = 'rgba(255,60,159,0.42)';
obj.text = "";
obj.textsize = 6;
obj.draw_arrow = "right_narrow";
obj.border_radius = "0";


obj = newRect(ObjectList.objects);
obj.pos.y = 40;
obj.pos.x = 92;
obj.width = 16;
obj.height = 2;
obj.bgcolor = 'rgba(255,60,159,0.42)';
obj.text = "";
obj.textsize = 6;
obj.draw_arrow = "right_narrow";
obj.border_radius = "0";


obj = newRect(ObjectList.objects);
obj.pos.y = 22;
obj.pos.x = 46;
obj.width = 6;
obj.height = 2;
obj.bgcolor = 'rgba(255,255,255,0.47)';
obj.text = "";
obj.textsize = 6;
obj.draw_arrow = "left_narrow";
obj.border_radius = "0";


obj = newRect(ObjectList.objects);
obj.pos.y = 28;
obj.pos.x = 78;
obj.width = 14;
obj.height = 6;
obj.bgcolor = 'rgba(14,75,213,1)';
obj.text = "Get_Decrypt_Key (secret)";
obj.textsize = 6;
obj.draw_arrow = "none";
obj.border_radius = "0";


obj = newRect(ObjectList.objects);
obj.pos.y = 17;
obj.pos.x = 40;
obj.width = 12;
obj.height = 2;
obj.bgcolor = 'rgba(0,188,255,1)';
obj.text = "uuid";
obj.textsize = 7;
obj.draw_arrow = "right";
obj.border_radius = "0";


obj = newRect(ObjectList.objects);
obj.pos.y = 5;
obj.pos.x = 38;
obj.width = 22;
obj.height = 4;
obj.bgcolor = 'rgba(13,5,50,0)';
obj.text = "Decrypt Secret";
obj.textsize = 15;
obj.draw_arrow = "none";
obj.border_radius = "0";


obj = newRect(ObjectList.objects);
obj.pos.y = 19;
obj.pos.x = 92;
obj.width = 16;
obj.height = 2;
obj.bgcolor = 'rgba(255,255,255,0.47)';
obj.text = "";
obj.textsize = 7;
obj.draw_arrow = "right_narrow";
obj.border_radius = "0";


obj = newRect(ObjectList.objects);
obj.pos.y = 18;
obj.pos.x = 78;
obj.width = 14;
obj.height = 8;
obj.bgcolor = 'rgba(14,75,213,1)';
obj.text = "Get_Secret (uuid)";
obj.textsize = 6;
obj.draw_arrow = "none";
obj.border_radius = "0";


obj = newRect(ObjectList.objects);
obj.pos.y = 17;
obj.pos.x = 108;
obj.width = 14;
obj.height = 14;
obj.bgcolor = 'rgba(0,188,255,1)';
obj.text = "success: bool\nmessage: string\nreturn_code: int\npayload: [secret]";
obj.textsize = 6;
obj.draw_arrow = "none";
obj.border_radius = "5";


obj = newRect(ObjectList.objects);
obj.pos.y = 23;
obj.pos.x = 110;
obj.width = 10;
obj.height = 6;
obj.bgcolor = 'rgba(162,215,255,1)';
obj.text = "id, uuid, vault_id,\nname, description,\ncypher_string,\nowner_id";
obj.textsize = 6;
obj.draw_arrow = "none";
obj.border_radius = "5";


obj = newRect(ObjectList.objects);
obj.pos.y = 34;
obj.pos.x = 78;
obj.width = 14;
obj.height = 2;
obj.bgcolor = 'rgba(116,182,0,1)';
obj.text = "vault_id != 0?";
obj.textsize = 5;
obj.draw_arrow = "none";
obj.border_radius = "0";


obj = newRect(ObjectList.objects);
obj.pos.y = 36;
obj.pos.x = 78;
obj.width = 14;
obj.height = 2;
obj.bgcolor = 'rgba(116,182,0,1)';
obj.text = "owner_id == 0? ";
obj.textsize = 5;
obj.draw_arrow = "none";
obj.border_radius = "0";


obj = newRect(ObjectList.objects);
obj.pos.y = 36;
obj.pos.x = 92;
obj.width = 16;
obj.height = 2;
obj.bgcolor = 'rgba(255,255,255,0.47)';
obj.text = "";
obj.textsize = 6;
obj.draw_arrow = "right_narrow";
obj.border_radius = "0";


obj = newRect(ObjectList.objects);
obj.pos.y = 38;
obj.pos.x = 78;
obj.width = 14;
obj.height = 2;
obj.bgcolor = 'rgba(116,182,0,1)';
obj.text = "owner_id == session[\'user_id']";
obj.textsize = 5;
obj.draw_arrow = "none";
obj.border_radius = "0";


obj = newRect(ObjectList.objects);
obj.pos.y = 38;
obj.pos.x = 92;
obj.width = 16;
obj.height = 2;
obj.bgcolor = 'rgba(255,255,255,0.47)';
obj.text = "";
obj.textsize = 5;
obj.draw_arrow = "right_narrow";
obj.border_radius = "0";


obj = newRect(ObjectList.objects);
obj.pos.y = 40;
obj.pos.x = 78;
obj.width = 14;
obj.height = 6;
obj.bgcolor = 'rgba(14,75,213,1)';
obj.text = "fallthrough";
obj.textsize = 5;
obj.draw_arrow = "none";
obj.border_radius = "0";


obj = newRect(ObjectList.objects);
obj.pos.y = 16;
obj.pos.x = 52;
obj.width = 14;
obj.height = 44;
obj.bgcolor = 'rgba(14,75,213,1)';
obj.text = "Decrypt_Secret (uuid)";
obj.textsize = 7;
obj.draw_arrow = "none";
obj.border_radius = "0";


obj = newRect(ObjectList.objects);
obj.pos.y = 22;
obj.pos.x = 52;
obj.width = 14;
obj.height = 2;
obj.bgcolor = 'rgba(116,182,0,1)';
obj.text = "return_code != 200?";
obj.textsize = 6;
obj.draw_arrow = "none";
obj.border_radius = "0";


obj = newRect(ObjectList.objects);
obj.pos.y = 53;
obj.pos.x = 52;
obj.width = 14;
obj.height = 2;
obj.bgcolor = 'rgba(116,182,0,1)';
obj.text = "return_code != 200?";
obj.textsize = 6;
obj.draw_arrow = "none";
obj.border_radius = "0";


obj = newRect(ObjectList.objects);
obj.pos.y = 57;
obj.pos.x = 40;
obj.width = 12;
obj.height = 2;
obj.bgcolor = 'rgba(0,188,255,1)';
obj.text = "secret_value";
obj.textsize = 6;
obj.draw_arrow = "left";
obj.border_radius = "0";


obj = newRect(ObjectList.objects);
obj.pos.y = 44;
obj.pos.x = 52;
obj.width = 14;
obj.height = 2;
obj.bgcolor = 'rgba(0,19,182,0.17)';
obj.text = "key = result";
obj.textsize = 6;
obj.draw_arrow = "none";
obj.border_radius = "0";


obj = newRect(ObjectList.objects);
obj.pos.y = 24;
obj.pos.x = 52;
obj.width = 14;
obj.height = 2;
obj.bgcolor = 'rgba(0,19,182,0.17)';
obj.text = "secret = payload";
obj.textsize = 6;
obj.draw_arrow = "none";
obj.border_radius = "0";


obj = newRect(ObjectList.objects);
obj.pos.y = 55;
obj.pos.x = 52;
obj.width = 14;
obj.height = 2;
obj.bgcolor = 'rgba(0,19,182,0.17)';
obj.text = "secret_value = payload";
obj.textsize = 6;
obj.draw_arrow = "none";
obj.border_radius = "0";


obj = newRect(ObjectList.objects);
obj.pos.y = 33;
obj.pos.x = 108;
obj.width = 14;
obj.height = 12;
obj.bgcolor = 'rgba(0,188,255,1)';
obj.text = "success: bool\nmessage: string\nreturn_code: int\npayload: [decrypt_key]";
obj.textsize = 6;
obj.draw_arrow = "none";
obj.border_radius = "5";


obj = newRect(ObjectList.objects);
obj.pos.y = 39;
obj.pos.x = 110;
obj.width = 10;
obj.height = 2;
obj.bgcolor = 'rgba(162,215,255,1)';
obj.text = "string";
obj.textsize = 6;
obj.draw_arrow = "none";
obj.border_radius = "5";


obj = newRect(ObjectList.objects);
obj.pos.y = 42;
obj.pos.x = 52;
obj.width = 14;
obj.height = 2;
obj.bgcolor = 'rgba(116,182,0,1)';
obj.text = "return_code != 200?";
obj.textsize = 6;
obj.draw_arrow = "none";
obj.border_radius = "0";


obj = newRect(ObjectList.objects);
obj.pos.y = 48;
obj.pos.x = 92;
obj.width = 16;
obj.height = 2;
obj.bgcolor = 'rgba(255,255,255,0.47)';
obj.text = "";
obj.textsize = 7;
obj.draw_arrow = "right_narrow";
obj.border_radius = "0";


obj = newRect(ObjectList.objects);
obj.pos.y = 47;
obj.pos.x = 78;
obj.width = 14;
obj.height = 10;
obj.bgcolor = 'rgba(14,75,213,1)';
obj.text = "Decrypt \n(secret.cipher_string, key)";
obj.textsize = 6;
obj.draw_arrow = "none";
obj.border_radius = "0";


obj = newRect(ObjectList.objects);
obj.pos.y = 47;
obj.pos.x = 108;
obj.width = 14;
obj.height = 12;
obj.bgcolor = 'rgba(0,188,255,1)';
obj.text = "success: bool\nmessage: string\nreturn_code: int\npayload: [secret_value]";
obj.textsize = 6;
obj.draw_arrow = "none";
obj.border_radius = "5";


obj = newRect(ObjectList.objects);
obj.pos.y = 53;
obj.pos.x = 110;
obj.width = 10;
obj.height = 2;
obj.bgcolor = 'rgba(162,215,255,1)';
obj.text = "string";
obj.textsize = 6;
obj.draw_arrow = "none";
obj.border_radius = "5";


obj = newRect(ObjectList.objects);
obj.pos.y = 22;
obj.pos.x = 40;
obj.width = 6;
obj.height = 2;
obj.bgcolor = 'rgba(255,60,159,1)';
obj.text = "error: 404";
obj.textsize = 6;
obj.draw_arrow = "none";
obj.border_radius = "5";


obj = newRect(ObjectList.objects);
obj.pos.y = 30;
obj.pos.x = 66;
obj.width = 12;
obj.height = 2;
obj.bgcolor = 'rgba(0,188,255,1)';
obj.text = "secret";
obj.textsize = 7;
obj.draw_arrow = "right";
obj.border_radius = "5";


obj = newRect(ObjectList.objects);
obj.pos.y = 42;
obj.pos.x = 46;
obj.width = 6;
obj.height = 2;
obj.bgcolor = 'rgba(255,255,255,0.47)';
obj.text = "";
obj.textsize = 6;
obj.draw_arrow = "left_narrow";
obj.border_radius = "0";


obj = newRect(ObjectList.objects);
obj.pos.y = 42;
obj.pos.x = 40;
obj.width = 6;
obj.height = 2;
obj.bgcolor = 'rgba(255,60,159,1)';
obj.text = "error: rc";
obj.textsize = 6;
obj.draw_arrow = "none";
obj.border_radius = "5";


obj = newRect(ObjectList.objects);
obj.pos.y = 34;
obj.pos.x = 99;
obj.width = 6;
obj.height = 2;
obj.bgcolor = 'rgba(255,60,159,1)';
obj.text = "error: 501";
obj.textsize = 6;
obj.draw_arrow = "none";
obj.border_radius = "5";


obj = newRect(ObjectList.objects);
obj.pos.y = 36;
obj.pos.x = 95;
obj.width = 10;
obj.height = 2;
obj.bgcolor = 'rgba(0,188,255,1)';
obj.text = "self.secret_key";
obj.textsize = 6;
obj.draw_arrow = "none";
obj.border_radius = "10";


obj = newRect(ObjectList.objects);
obj.pos.y = 40;
obj.pos.x = 99;
obj.width = 6;
obj.height = 2;
obj.bgcolor = 'rgba(255,60,159,1)';
obj.text = "error: 403";
obj.textsize = 6;
obj.draw_arrow = "none";
obj.border_radius = "5";


obj = newRect(ObjectList.objects);
obj.pos.y = 38;
obj.pos.x = 95;
obj.width = 10;
obj.height = 2;
obj.bgcolor = 'rgba(0,188,255,1)';
obj.text = "session[\'secret_key']";
obj.textsize = 5;
obj.draw_arrow = "none";
obj.border_radius = "10";


obj = newRect(ObjectList.objects);
obj.pos.y = 53;
obj.pos.x = 46;
obj.width = 6;
obj.height = 2;
obj.bgcolor = 'rgba(255,255,255,0.47)';
obj.text = "";
obj.textsize = 6;
obj.draw_arrow = "left_narrow";
obj.border_radius = "0";


obj = newRect(ObjectList.objects);
obj.pos.y = 53;
obj.pos.x = 40;
obj.width = 6;
obj.height = 2;
obj.bgcolor = 'rgba(255,60,159,1)';
obj.text = "error: 500";
obj.textsize = 6;
obj.draw_arrow = "none";
obj.border_radius = "5";


obj = newRect(ObjectList.objects);
obj.pos.y = 19;
obj.pos.x = 66;
obj.width = 12;
obj.height = 2;
obj.bgcolor = 'rgba(0,188,255,1)';
obj.text = "uuid";
obj.textsize = 7;
obj.draw_arrow = "right";
obj.border_radius = "5";


obj = newRect(ObjectList.objects);
obj.pos.y = 47;
obj.pos.x = 66;
obj.width = 12;
obj.height = 4;
obj.bgcolor = 'rgba(0,188,255,1)';
obj.text = "secret.cipher_string\nkey";
obj.textsize = 6;
obj.draw_arrow = "right";
obj.border_radius = "5";


obj = newRect(ObjectList.objects);
obj.pos.y = 43;
obj.pos.x = 66;
obj.width = 42;
obj.height = 2;
obj.bgcolor = 'rgba(0,188,255,0.39)';
obj.text = "";
obj.textsize = 7;
obj.draw_arrow = "left_narrow";
obj.border_radius = "0";


obj = newRect(ObjectList.objects);
obj.pos.y = 23;
obj.pos.x = 66;
obj.width = 42;
obj.height = 2;
obj.bgcolor = 'rgba(0,188,255,0.4)';
obj.text = "";
obj.textsize = 7;
obj.draw_arrow = "left_narrow";
obj.border_radius = "0";


obj = newRect(ObjectList.objects);
obj.pos.y = 54;
obj.pos.x = 66;
obj.width = 42;
obj.height = 2;
obj.bgcolor = 'rgba(0,188,255,0.39)';
obj.text = "";
obj.textsize = 7;
obj.draw_arrow = "left_narrow";
obj.border_radius = "0";

