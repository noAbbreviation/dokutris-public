function preload() {
	skin = DefaultSkin;
	skinFont = skin.font;
}

function setup() {
  let can = createCanvas(canvasLength * 4/3, canvasLength);
  can.mouseClicked(pindot);
  can.mouseMoved(highlightPlacement);
  frameRate(fr);
  noLoop();
}

function draw() {
	strokeJoin(ROUND);
	drawBG();
	
	switch (appState) {
		case START:
			drawStart();
			break;
		
		case FINISH:
		case PLAYING:
			for (let i=0; i<board.length; i++) {
				for (let j=0; j<board[0].length; j++) {
					board[i][j].render();
					highlightBoard[i][j].render();
				}
			}
			
			for (let i=0; i<pieces.length; i++) {
				pieces[i].render();
			}
			for (let i=0; i<pieces.length; i++) {
				redPiece[i].render();
			}
			for (let i=0; i<pieces.length; i++) {
				highlightPiece[i].render();
			}
			scoreBoard.render();

			drawDokuLines();
			animQueue.update();
			animHolder.render();
			
			if (appState == FINISH) {
				drawEndScreen();
			}
			break;
	}
	
}

function pindot(state) {
	if (!(freezeControl)) {
		switch (appState) {
			case START:
				initGame();
				break;
				
			case PLAYING:
				playClick(mouseX,mouseY);
				break;
				
			case FINISH:
				restart();
				break;
		}
	}
	
	redraw();
}

function playClick(mouseX,mouseY) {
	
	let xPos = Math.floor((mouseX-margin) / gridLength),
		yPos = Math.floor((mouseY-margin) / gridLength);
	
	if (inField() && pointer.isSelected) {
		let holderObj = pieces[findSelected()],
			pieceDimension = holderObj.mpDimension,
			objectCoords = lookupPiece(holderObj.objIndex);
		
		 // Centering a bit
		xPos += Math.floor(holderObj.renderCoords[0].x - ((pieceDimension.x - 1) / 2));
		yPos += Math.floor(holderObj.renderCoords[0].y - ((pieceDimension.y - 1) / 2));
		
		let snapCoords = moveSequence(5,2,9,7,1), pPos = [];
		for (let i=0; i<snapCoords.length; i++) {
			let snapX = snapCoords[i].x, snapY = snapCoords[i].y;
			
			if (inBounds(holderObj.objIndex, xPos + snapX, yPos + snapY)) {
				pPos.push(snapCoords[i]);
			}
		}
		
		if (pPos.length == 1) {
			pointer.fieldClick(xPos + pPos[0].x, yPos + pPos[0].y);
		} else if (pPos.length > 1 && pPos[0].x == 0 && pPos[0].y == 0) {
			pointer.fieldClick(xPos, yPos);
		}
		
		return true;
	} else if (inSideBar()) {
		let yPos = Math.floor((mouseY-(2*margin+scoreHeight))/ sidebarLength);
		pointer.sidebarClick(yPos);
		return true;
	}
	
	return false;
}

function highlightPlacement() {

	if (appState == PLAYING && inField(mouseX,mouseY) && pointer.isSelected) {
		let xPos = Math.floor((mouseX-margin) / gridLength),
			yPos = Math.floor((mouseY-margin) / gridLength);
			
		let holderObj = pieces[findSelected()],
			pieceDimension = holderObj.mpDimension,
			objectCoords = lookupPiece(holderObj.objIndex);
		
		xPos += Math.floor(holderObj.renderCoords[0].x - ((pieceDimension.x - 1) / 2));
		yPos += Math.floor(holderObj.renderCoords[0].y - ((pieceDimension.y - 1) / 2));
		
		 // Clears highlight board
		for (let i=0; i<9; i++) {
			for (let j=0; j<9; j++) {
				highlightBoard[i][j].updateState("NOT_SELECT");
			}
		}
		
		let selected = -1;
		for (let i=0; i<pieces.length; i++) {
			if (pieces[i].state == "SELECT") {
				selected = i;
				break;
			}
		}
		
		let snapCoords = moveSequence(5,2,9,7,1), pPos = [];
		for (let i=0; i<snapCoords.length; i++) {
			let snapX = snapCoords[i].x, snapY = snapCoords[i].y;
			
			if (inBounds(holderObj.objIndex, xPos + snapX, yPos + snapY)) {
				pPos.push(snapCoords[i]);
			}
		}
		
		if (pPos.length == 1) {
			for (let i=0; i<objectCoords.length; i++) {
				highlightBoard[objectCoords[i].x + xPos + pPos[0].x][objectCoords[i].y + yPos + pPos[0].y].updateState("HIGHLIGHT");
			}
		} else if (pPos.length > 1 && pPos[0].x == 0 && pPos[0].y == 0) {
			for (let i=0; i<objectCoords.length; i++) {
				highlightBoard[objectCoords[i].x + xPos][objectCoords[i].y + yPos].updateState("HIGHLIGHT");
			}
		}
		
	} else if (appState == PLAYING) { // No highlight left behind
		for (let i=0; i<9; i++) {
			for (let j=0; j<9; j++) {
				highlightBoard[i][j].updateState("NOT_SELECT");
			}
		}
	}
}

function drawBG() {
    background(skin.bg_color);
}

function drawStart() {
	fill(skin.startScreen.color);
	stroke(skin.startScreen.stroke);
    rect(margin, margin, gsLength * 4/3, gsLength);
	
	// text 1
	fill(skin.startScreen.text.title_color);
	stroke(skin.startScreen.stroke);
	strokeWeight(5);
	textSize(gsLength / 5);
	textFont(skinFont);
	textAlign(CENTER);
	text('DOKU  \n   TRIS', gsLength * 2/3 + margin, gsLength/3);
	
	// text 2
	fill(skin.startScreen.text.subtitle_color);
	textSize(gsLength / 9);
	text('click to continue...', gsLength * 2/3 + margin, gsLength * 5/6);
}

function drawDokuLines() {
	let m = margin, len = gridLength;
	let pts = [];
	
	for (let i=0; i<16; i++) {
		pts[i] = new Dot(m + (i%4) * 3*len, m + Math.floor(i/4) * 3*len);
	}
	
	stroke(skin.dokuLines.stroke);
	strokeWeight(skin.dokuLines.strokeWeight);
	
	for (let i=0; i<=3; i++) {
		line(pts[i].x, pts[i].y, pts[i+12].x, pts[i+12].y); // Vertical lines
		line(pts[4*i].x, pts[4*i].y, pts[4*i+3].x, pts[4*i+3].y); // Horizontal lines
	}
}

function drawEndScreen() {
	let lengthX = 2/5*canvasLength*4/3,  lengthY = 2/5*canvasLength,
		marginX = 3/10*canvasLength*4/3, marginY = 3/10*canvasLength;
	
	stroke(skin.endScreen.stroke);
	strokeWeight(gridLength/10);
	fill(skin.endScreen.color);
	rect(marginX, marginY, lengthX, lengthY);
	
	stroke(skin.endScreen.text.stroke);
	strokeWeight(gridLength/10);
	textSize(gsLength/12);
	fill(skin.endScreen.text.color);
	textFont(skinFont);
	text(`Final Score:\n${stats.score.total}`, canvasLength*2/3, canvasLength/2);
	//text(`Click for a new game`, canvasLength*2/3, canvasLength/2); TODO: need button?
	
}