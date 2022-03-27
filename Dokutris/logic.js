function initGame() {
	if ( !(new jsLibComparison(appState).areEither([START,PLAYING])) ) {
		console.log("Game cannot be initialized. Game state not ready.");
		appState = ERROR;
		return;
	}
	
	for (let i=0; i<board.length; i++) {
		for (let j=0; j<board[0].length; j++) {
			board[i][j] = new gridPiece(i,j);
			highlightBoard[i][j] = new gridPiece(i,j);
		}
	}
	
	for (let i=0; i<pieces.length; i++) {
		pieces[i] = new pieceHolder(0,i);
		pieces[i].changeHold(randToMax(4*13-1));
		
		redPiece[i] = new highlightHolder(0,i);
		highlightPiece[i] = new highlightHolder(0,i);
	}
	scoreBoard = new ScoreBoard();
	
	pointer = new Pointer();
	stats = new Stats();
	
	animHolder = new animationHolder();
	animQueue = new AnimQueue();
	animQueue.addSequence(new unCover());
	
	appState = PLAYING;
	loop();
}

function restart() {
	for (let i=0; i<board.length; i++) {
		for (let j=0; j<board[0].length; j++) {
			board[i][j].updateState("NORMAL");
			highlightBoard[i][j].updateState("NORMAL");
		}
	}
	
	for (let i=0; i<pieces.length; i++) {
		pieces[i].changeHold(randToMax(4*13-1));
		pieces[i].updateState("NORMAL");
	}
	
	animQueue.addSequence(new unCover());
	
	stats.restart();
	appState = PLAYING;
	loop();
}

function dokuClearCheck(boardState) {
	let isCleared = true, temp = [], clears = [];
	
	 // Horizontal Checks
	for (let i=0; i<9; i++) {
		isCleared = true;
		
		for (let j=0; j<9; j++) {
			if (boardState[j][i].state == "NORMAL") {
				isCleared = false;
			}
		}
		if (isCleared) {
			temp = {type: "horizontal", index: i};
			clears.push(temp);
		}
	}
	
	 // Vertical checks
	for (let i=0; i<9; i++) {
		isCleared = true
		
		for (let j=0; j<9; j++) {
			if (boardState[i][j].state == "NORMAL") {
				isCleared = false;
			}
		}
		if (isCleared) {
			temp = {type: "vertical", index: i};
			clears.push(temp);
		}
	}
	
	 // Block checks
	for (let i=0; i<9; i++) {
		isCleared = true;
		let blockX = i % 3, blockY = Math.floor(i/3);
		
		for (let a=0; a<3; a++) {
			for (let b=0; b<3; b++) {
				if (boardState[3*blockX + a][3*blockY + b].state == "NORMAL") {
					isCleared = false;
				}
			}
		}
		if (isCleared) {
			temp = {type: "block", index: i};
			clears.push(temp);
		}
	}
	
	if (clears.length != 0) {
		initDokuClear(clears);
	}
	
	return;
}

function initDokuClear(clearsArr) {
	for (let i=0; i<clearsArr.length; i++) {
		
		let index = clearsArr[i].index;
		
		switch (clearsArr[i].type) {
			case "horizontal":
				for (let i=0; i<9; i++) {
					board[i][index].updateState("NORMAL");
				}
				break;
			
			case "vertical":
				for (let i=0; i<9; i++) {
					board[index][i].updateState("NORMAL");
				}
				break;
				
			case "block":
				for (let a=0; a<3; a++) {
					for (let b=0; b<3; b++) {
						board[3 * (index%3) + a][3 * Math.floor(index/3) + b].updateState("NORMAL");
					}
				}
		}
	}
	stats.lineCleared(clearsArr);
	
	return;
}

function placePiece(pointerX, pointerY, holderObj) {
	let objectCoords = lookupPiece(holderObj.objIndex);
	
	if (inBounds(holderObj.objIndex,pointerX,pointerY)) {
		for (let i=0; i<objectCoords.length; i++) {
			board[objectCoords[i].x + pointerX][objectCoords[i].y + pointerY].updateState("FILL");
		}
		return 0;
	}
	
	return -1;
}

function inBounds(index,pointerX,pointerY) {
	let objectCoords = lookupPiece(index), inside = true;
	
	for (let i=0; i<objectCoords.length; i++) {
		if (!(new jsLibComparison(objectCoords[i].x + pointerX).inBetween(0,9,10) && new jsLibComparison(objectCoords[i].y + pointerY).inBetween(0,9,10))) {
			inside = false;
			break;
		}
		
		if (board[objectCoords[i].x + pointerX][objectCoords[i].y + pointerY].state == "FILL") {
			inside = false;
			break;
		}
	}
	return inside;
}

function inField() {
	let xPos = Math.floor((mouseX-margin) / gridLength),
		yPos = Math.floor((mouseY-margin) / gridLength);
	
	return (new jsLibComparison(xPos).inBetween(0,9,10) && new jsLibComparison(yPos).inBetween(0,9,10));
}

function inSideBar() {
	let yPos = Math.floor((mouseY-(2*margin+scoreHeight)) / sidebarLength);
	return (new jsLibComparison(mouseX).inBetween(canvasLength+sidebarBuffer,canvasLength+sidebarBuffer+sidebarLength,11) && new jsLibComparison(yPos).inBetween(0,3,10));
}

function findSelected() { // In sidebar, pieceHolders
	for (let i=0; i<pieces.length; i++) {
		if (pieces[i].state == "SELECT") {
			return i;
		}
	}
	
	return -1;
}