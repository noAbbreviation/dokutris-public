function pushStartButtons() {
	if (cache.fresh) {
		initGame();
	} else {
		if (new jsLibComparison(mouseX-canvasLength*2/5).inBetween(0,canvasLength*8/15,11)) {
			let yPos = new jsLibComparison(mouseY);
			if (yPos.inBetween(canvasLength/2,canvasLength*7/10,11)) {
				appState = OA_STATS;
			} else if (yPos.inBetween(canvasLength*7/10+margin,canvasLength*9/10+margin,11)) {
				initGame();
			}
		}
	}
}

function touchStarted() {
	if (!(appState == PLAYING && pointer.isSelected)) {
		pindot();
		touchControl.isStarted = true;
	}
	
	return false;
}

function touchMoved() {
	highlightPlacement();
	
	if (touchControl.current <= touchControl.tolerance) {
		touchControl.current++;
	}
	
	return false;
}

function touchEnded() {
	if (!(touchControl.isStarted) || touchControl.current > touchControl.tolerance && pointer.isSelected) {
		pindot();
	}
	touchControl.isStarted = false;
	touchControl.current = 0;
	
	return false;
}

function addressContPopup() {
	let lengthY = 2/5*canvasLength, lengthX = lengthY*4/3,
		marginY = 3/10*canvasLength, marginX = 4/3*marginY;
	
	if (new jsLibComparison(mouseY-marginY).inBetween(lengthY*2/3,lengthY,11)) {
		if (new jsLibComparison(mouseX-marginX).inBetween(0,lengthX/2,01)) { // Restart button
			restart();
			cache.upload();
		} else if (new jsLibComparison(mouseX-marginX).inBetween(lengthX/2,lengthX,01)) { // Continue button
			appState = PLAYING;
		}
	}
}

function backToMain() {
	let marginX = margin + canvasLength*8/15, marginY = margin + canvasLength*27/32,
		lengthX = canvasLength*4/15, lengthY = gsLength/12;
		
	if (new jsLibComparison(mouseX-marginX).inBetween(0,lengthX,11)) {
		if (new jsLibComparison(mouseY-marginY).inBetween(0,lengthY,11)) {
			appState = START;
		}
	} else if (new jsLibComparison(mouseX-(canvasLength*4/3-3*margin)).inBetween(0,margin,11)) {
		if (new jsLibComparison(mouseY-(canvasLength-3*margin)).inBetween(0,margin,11)) {
			changeSkin();
			cache.smallUpload();
		}
	}
}

function playClick() {
	
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
		clearHighlight();
		
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
		clearHighlight();
	}
	
	return false;
}

// Endscreen here
function backToEndScreen() {
	let lengthY = 5/6*canvasLength, lengthX = 2/5*canvasLength*4/3,
		marginY = 1/12*canvasLength,  marginX = 3/10*canvasLength*4/3;
	
	if (new jsLibComparison(mouseY-(marginY + lengthY*21/24)).inBetween(0,lengthY*3/24)) {
		if (new jsLibComparison(mouseX-marginX).inBetween(0,lengthX)) { // Back
			appState = FINISH_POP;
		}
	}
}

function addressEndScreen() {
	let lengthY = 5/6*canvasLength, lengthX = 2/5*canvasLength*4/3,
		marginY = 1/12*canvasLength,  marginX = 3/10*canvasLength*4/3;
	
	if (new jsLibComparison(mouseY-(marginY + lengthY*21/24)).inBetween(0,lengthY*3/24,11)) {
		
		let xCoord = new jsLibComparison(mouseX-marginX);
		
		if (xCoord.inBetween(0,lengthX/2,11)) { // Stats
			appState = SHOW_ENDSTATS;
		} else if (xCoord.inBetween(lengthX/2,lengthX,11)) { // Restart
			restart();
		}
	}
}