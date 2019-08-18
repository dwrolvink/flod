class ObjectManager {
	constructor(){
		this.objects = [];
	}

	GetSelectedObjects() {
		let list = [];
		for (obj of this.objects){
			if (obj.selected){
				list.push(obj);
			}
		}
		return list;
	}

	// On mouseclick, this function may be called to find which rectangle is clicked
	SelectObject(x, y) {
		let blocksize = config.blocksize;

		for (i=this.objects.length-1; i >= 0; i--) {
			obj = this.objects[i].PointSelect(x, y);
			if (null != obj){
				return obj;
			}
		}
		return null;
	}

	SelectObjectsByRect(rect){
		x1 = rect[0]+rect[2];
		x2 = rect[0];
		y1 = rect[1]+rect[3];
		y2 = rect[1];

		let xmax = greater(x1,x2);
		let xmin = lesser(x1,x2);
		let ymax = greater(y1,y2);
		let ymin = lesser(y1,y2);

		for (obj of this.objects) {
			let x = obj.pos.x * blocksize + viewport.x;
			let y = obj.pos.y * blocksize + viewport.y;
			let w = obj.width  * blocksize;
			let h = obj.height * blocksize;	

			// Left
			if (x < xmax && x > xmin) {
				// Top
				if (y < ymax && y > ymin) {
					obj.selected = true;
				}
				// Bottom
				else if ((y+h) < ymax && (y+h) > ymin) {
					obj.selected = true;
				}
			}
			// Right
			else if ( (x+w) < xmax && (x+w) > xmin) {
				// Top
				if (y < ymax && y > ymin) {
					obj.selected = true;
				}
				// Bottom
				else if ((y+h) < ymax && (y+h) > ymin) {
					obj.selected = true;
				}			
			}
		}	
	}
	DeselectAllObjects(exclusion) {
		for (obj of this.objects) {
			if (!(exclusion.includes(obj))) {
				obj.selected = false;
			}
		}
	}

	SelectAllObjects(exclusion) {
		for (obj of this.objects) {
			if (!(exclusion.includes(obj))) {
				obj.selected = true;
			}
		}
	}	

	DeleteSelectedObject() {
		let newlist = []
		for (obj of this.objects) {
			if (!obj.selected) {
				newlist.push(obj);
			}
		}
		this.objects = newlist;
	}

	RemoveObjectFromList(list, object) {
		let newlist = []
		for (obj of list) {
			if (obj != object) {
				newlist.push(obj);
			}
		}
		list = newlist;
	}

	BringSelectedObjectToFront() {
		let newlist = []
		for (obj of this.objects) {
			if (!obj.selected) {
				newlist.push(obj);
			}
		}
		for (obj of this.objects) {
			if (obj.selected) {
				newlist.push(obj);
			}
		}	
		this.objects = newlist;
	}

	BringSelectedObjectToBack() {
		let newlist = []
		for (obj of this.objects) {
			if (obj.selected) {
				newlist.push(obj);
			}
		}
		for (obj of this.objects) {
			if (!obj.selected) {
				newlist.push(obj);
			}
		}	
		this.objects = newlist;
	}		
	}

	