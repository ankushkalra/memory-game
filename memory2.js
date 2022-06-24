"use strict";

let myMap = new Map();

initializeImages();

let visiblePairs = [];
let visibleObject, newVisibleObject = [25,25];
let openImages = 0;
let solvedPairs = 0;

function initializeImages() {

	let a = uniqueRandomNumber(20);
	for(let i = 0; i < 20; i += 2) {
		let imgUrl = i/2+1;
		
		myMap.set(a[i], imgUrl);
		myMap.set(a[i+1], imgUrl);
	}

}

function check(obj) {

	if(openImages > 1) {
		console.log('openImages > 1');
		return;
	}

	let objId = Number(obj.id);
	let imgObj = myMap.get(objId);
	showImage(imgObj, obj);
	setTimeout(function hide(obj, imgObj) {
		obj.src = 'images/tile.jpg';
		//imgObj.isVisible = false;
		console.log(openImages + 'openImages being reduced in lower hide');
		openImages--;
		console.log(openImages + 'Used lower hide');
	} ,1000, obj, imgObj);

	console.log('visibleObject = ' + visibleObject);

	if(openImages === 0) {
		visibleObject = [imgObj.imgUrl, objId];
	} else {
		if((visibleObject[0] == imgObj.imgUrl) && (visibleObject[1] != objId)) {
			//console.log('visibleObject[0]: '+visibleObject[0]+' = '+'imgObj.imgUrl: ' + imgObj.imgUrl);

			console.log('Entered matching region');

			// hide both this obj and visible object
			document.getElementById(objId).style.visibility = 'hidden';
			document.getElementById(visibleObject[1]).style.visibility = 'hidden';

			openImages = 0;
			
			visibleObject = [25,25];

			solvedPairs++;
			if(solvedPairs === 10) {
				alert('Win');
			}
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