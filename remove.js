function remove(value, arr) {
	let index = arr.indexOf(value);
	if(index > -1)
		arr.splice(index,1);
}

let arr = [1,2,3];
remove(1, arr);