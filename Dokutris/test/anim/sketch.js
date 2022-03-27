function setup() {
  let can = createCanvas(canvasLength * 4/3, canvasLength);
  can.mouseClicked(pindot);
  frameRate(fr);
  noLoop();
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
