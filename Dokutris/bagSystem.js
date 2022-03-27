// not using for now, difficult mode at its state.
let mainBag = new Array(14), miniBag = new Array(14),

function pullFromBag(bigBagArr, miniBagArr) {
	
	let random1 = randToMax(miniBagArr.length - 1),
		variant1 = miniBagArr[random1],
		random2 = randToMax(bigBagArr[random1].array.length - 1),
		variant2 = bigBagArr[random1].array[random2];
	
	miniBagArr.splice(random1,1);
	if (bigBagArr[random1].array.length == 0) {
		bigBagArr.splice(random1,1);
	}
	
	if (bigBagArr.length == 0) {
		refillBigBag(bigBagArr);
	}
	
	if (miniBagArr.length == 0) {
		refillMiniBag(miniBagArr);
	}
	
	return (4*variant1 + variant2);
}

function refillBigBag(bigBagArr) {
	for (let i=0; i<14; i++) {
		bigBagArr[i] = { index:i, array:[0,1,2,3]};
	}
}

function refillMiniBag(miniBagArr) {
	for (let i=0; i<14; i++) {
		miniBagArr[i] = i;
	}
}