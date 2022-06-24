"use strict";

let myMap = new Map();

initializeImages();

let visiblePairs = [];
let visibleObject, newVisibleObject = [25,25];
let openImages = 0;
let solvedPairs = 0;
let peeks = 0;

function initializeImages() {

	let a = uniqueRandomNumber(20);
	for(let i = 0; i < 20; i += 2) {
		let imgUrl = i/2+1;
		
		let imgObj = {
			isVisible: false,
			imgUrl: imgUrl
		}

		myMap.set(a[i], imgObj);
		myMap.set(a[i+1], imgObj);
	}

}

function check(obj) {

	if(openImages > 1) {
		console.log('openImages > 1');
		return;
	}

	peeks++;
	console.log(peeks);
	let objId = Number(obj.id);
	let imgObj = myMap.get(objId);
	showImage(imgObj, obj);
	setTimeout(function hide(obj, imgObj) {
		obj.src = 'images/tile.jpg';
		console.log(openImages + 'openImages being reduced in lower hide');
		openImages--;
		if(openImages == 0) {
			newVisibleObject = [28,28];
		}
		console.log(openImages + 'Used lower hide visibleObject = '+visibleObject);
	} ,1000, obj, imgObj);

	console.log('visibleObject = ' + visibleObject);

	if(openImages === 0) {
		visibleObject = [imgObj.imgUrl, objId];
	} else {
		if((visibleObject[0] == imgObj.imgUrl) && (visibleObject[1] != objId)) {
			//console.log('visibleObject[0]: '+visibleObject[0]+' = '+'imgObj.imgUrl: ' + imgObj.imgUrl);

			console.log('Entered matching region');

			// hide both this obj and visible object
			setTimeout(function(objId, visibleObject) {
				document.getElementById(objId).style.visibility = 'hidden';
				document.getElementById(visibleObject[1]).style.visibility = 'hidden';

				openImages = 0;

				solvedPairs++;
				if(solvedPairs === 10) {
					alert('You won in '+peeks+' peeks');
				}
			}, 200, objId, visibleObject);
			
			//newVisibleObject = [25,25];
		} else {
			
		}
	}
}

function showImage(imgObj, domObj) {
	domObj.src = 'images/' + imgObj.imgUrl +'.jpg';
	imgObj.isVisible = true;
	openImages++;
	console.log(openImages + 'openImages increased in show');
	visibleObject = newVisibleObject;
	newVisibleObject = [imgObj.imgUrl, domObj.id];
}

function remove(arr, value) {
	let index = arr.indexOf(value);
	if(index > -1)
		arr.splice(index,1);
}

// it gives an array with random numbers between 1 to n
function uniqueRandomNumber(n) {
	let a = [];
	for(let i = 0; i < n; i++) {
		a[i] = i;
	}

	for(let i = 19; i > 0; i--) {
		let j = Math.floor(Math.random()*i);
		//console.log(j);
		// swap a[i] and a[j]
		let temp = a[i];
		a[i] = a[j];
		a[j] = temp;
	}
	return a;
}