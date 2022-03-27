function setup() {
  let can = createCanvas(canvasLength * 4/3, canvasLength);
  can.mouseClicked(pindot);
  frameRate(fr);
  noLoop();
  
  refillBigBag(mainBag);
  refillMiniBag(miniBag);
}

function draw() {
	drawBG();
	
	switch (appState) {
		case START:
			drawStart();
			
			renderAnims();
			break;
		
	}
	
}

function pindot(state) {
	anims.push(new SimpleAnim(mouseX,mouseY));
	console.log(pullFromBag(mainBag,miniBag));
	redraw();
}

function drawBG() {
	 // For the Canvas...
    background(100);
    stroke('black');
    strokeWeight(3);

     // For the Game AREA...
    fill(200,100,50); // Change color later
    rect(margin, margin, gsLength, gsLength);
}

function drawStart() {
	fill(200,100,50); // Change color later
    rect(margin, margin, gsLength * 4/3, gsLength);
	
	// text 1
	fill('red');
	strokeWeight(5);
	textSize(gsLength / 5);
	textFont('Comic Sans MS');
	textAlign(CENTER);
	text('DOKU  \n   TRIS', gsLength * 2/3 + margin, gsLength/3);
	
	// text 2
	fill('silver');
	textSize(gsLength / 10);
	text('any key to continue...', gsLength * 2/3 + margin, gsLength * 5/6);
}

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
	
	console.log(miniBagArr);
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
