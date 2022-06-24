"use strict";

let myMap = new Map();

initializeImages();

let visiblePairs = [];
let visibleObject;
let newVisibleObject = [25,25];
let openImages = 0;
let solvedPairs = 0;
let peeks = 0;
let timeLeft = 120;

function newGame() {
	peeks = 0;
	document.getElementById('flips').innerHTML = peeks;
	initializeImages();
	hideAllImages();
	timeLeft = 120;
	for(let i = 0; i < 20; i++) {
		document.getElementById(i).style.pointerEvents = 'auto';
	}
}

function hideAllImages() {
	for(let i = 0; i < 20; i++) {
		document.getElementById(i).src = 'images/tile.jpg';
	}
}

setInterval(function () {
	alert('Timeout');
	newGame();
}, 120000);		// if done in 2 minutes good, else quit game

setInterval(function () {
	document.getElementById('timeLeft').innerHTML = --timeLeft;
}, 1000);

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

	let objId = Number(obj.id);
	let imgObj = myMap.get(objId);
	showImage(imgObj, obj);

	peeks++;
	document.getElementById('flips').innerHTML = peeks;
	console.log('visibleObject = ' + visibleObject);

	if(openImages === 1) {
		visibleObject = [imgObj.imgUrl, objId];
		console.log('First Image');
	} else {
		if((visibleObject[0] == imgObj.imgUrl) && (visibleObject[1] != objId)) {
			//console.log('visibleObject[0]: '+visibleObject[0]+' = '+'imgObj.imgUrl: ' + imgObj.imgUrl);

			console.log('Entered matching region');

			// hide both this obj and visible object
			setTimeout(function(objId, visibleObject) {
				document.getElementById(objId).style.pointerEvents = 'none';
				document.getElementById(objId).style.cursor = 'defalut';
				document.getElementById(visibleObject[1]).style.pointerEvents = 'none';
				//document.getElementById(visibleObject[1]).style.cursor = 'defalut';

				openImages--;
				openImages--;;

				solvedPairs++;
				if(solvedPairs === 10) {
					alert('You won in '+peeks+' flips');
				}
			}, 500, objId, visibleObject);
			
			//newVisibleObject = [25,25];
		} else {
			setTimeout(function hide(obj, imgObj) {
				obj.src = 'images/tile.jpg';
				console.log(openImages + 'openImages being reduced in lower hide');
				openImages--;
				console.log(openImages + 'Used lower hide visibleObject = '+visibleObject);
			}, 500, obj, imgObj);
			setTimeout(function () {
				let otherImg = document.getElementById(visibleObject[1]);
				otherImg.src = 'images/tile.jpg';
				openImages--;
				console.log(openImages + 'Used lower hide visibleObject = '+visibleObject);
			}, 500);
			/*setTimeout(function hide(obj, imgObj) {
				obj.src = 'images/tile.jpg';
				console.log(openImages + 'openImages being reduced in lower hide');
				openImages--;
				if(openImages == 0) {
					newVisibleObject = [28,28];
				}
				console.log(openImages + 'Used lower hide visibleObject = '+visibleObject);
			} ,1000, document.getElementById(visibleObject[1]), imgObj);*/
		}
		newVisibleObject = [28,28];
	}
}

function showImage(imgObj, domObj) {
	domObj.src = 'images/' + imgObj.imgUrl +'.jpg';
	imgObj.isVisible = true;
	openImages++;
	console.log(openImages + 'openImages increased in show');
	visibleObject = newVisibleObject;
	newVisibleObject = [imgObj.imgUrl, domObj.id];
	//console.log(newVisibleObject);
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