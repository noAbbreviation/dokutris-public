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
	
	refillMainBag();
	refillMiniBag();
	
	for (let i=0; i<pieces.length; i++) {
		pieces[i] = new pieceHolder(0,i);
		pieces[i].changeHold(pullFromBag());
		
		redPiece[i] = new highlightHolder(0,i);
		highlightPiece[i] = new highlightHolder(0,i);
	}
	
	scoreBoard = new ScoreBoard();
	stats = new Stats();
	appState = PLAYING;
	
	if (!(cache.fresh)) {
		if (cache.getObj('stats').score.total > 0 && cache.getObj('appState') == PLAYING) {
			continueGame();
		}
	}
	
	animHolder = new animationHolder();
	animQueue = new AnimQueue();
	animQueue.addSequence(new unCover());
	
	loop();
}

function continueGame() {
	
	let boardShell = cache.getObj('board'),
		piecesShell = cache.getObj('pieces'),
		statsShell = cache.getObj('stats'),
		mainBagShell = cache.getObj('mainBag'),
		miniBagShell = cache.getObj('miniBag');
	
	for (let i=0; i<board.length; i++) {
		for (let j=0; j<board[0].length; j++) {
			board[i][j].updateState(boardShell[i][j].state);
		}
	}
	clearHighlight();
	
	for (let i=0; i<pieces.length; i++) {
		pieces[i].changeHold(piecesShell[i].objIndex);
		pieces[i].updateState(piecesShell[i].state);
	}
	
	for (let statsProp in statsShell) {
		stats[statsProp] = statsShell[statsProp];
	}
	
	mainBag = mainBagShell;
	miniBag = miniBagShell;
	
	appState = CONT_POPUP;
}

function restart() {
	for (let i=0; i<board.length; i++) {
		for (let j=0; j<board[0].length; j++) {
			board[i][j].updateState("NORMAL");
			highlightBoard[i][j].updateState("NORMAL");
		}
	}
	
	for (let i=0; i<pieces.length; i++) {
		pieces[i].changeHold(pullFromBag());
		pieces[i].updateState("NORMAL");
	}
	
	animQueue.addSequence(new unCover());
	
	stats.restart();
	appState = PLAYING;
	loop();
}

function pullFromBag() {
	
	let random1 = randToMax(miniBag.length - 1),
		variant1 = miniBag[random1],
		random2 = randToMax(mainBag[random1].array.length - 1),
		variant2 = mainBag[random1].array[random2];
	
	miniBag.splice(random1,1);
	if (mainBag[random1].array.length == 0) {
		mainBag.splice(random1,1);
	}
	
	if (mainBag.length == 0) {
		refillMainBag();
	}
	
	if (miniBag.length == 0) {
		refillMiniBag();
	}
	
	return (4*variant1 + variant2);
}

function refillMainBag() {
	for (let i=0; i<numPieces; i++) {
		mainBag[i] = { index: lookupDistrib(i), array:[0,1,2,3]};
	}
}

function refillMiniBag() {
	for (let i=0; i<numPieces; i++) {
		miniBag[i] = lookupDistrib(i);
	}
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
		let blockX = i % 3, blockY = divFloor(i,3);
		
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
						board[3 * (index%3) + a][3 * divFloor(index,3) + b].updateState("NORMAL");
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
	let objectCoords = lookupPiece(index), isInside = true;
	
	for (let i=0; i<objectCoords.length; i++) {
		if (!(new jsLibComparison(objectCoords[i].x + pointerX).inBetween(0,9,10) && new jsLibComparison(objectCoords[i].y + pointerY).inBetween(0,9,10))) {
			isInside = false;
			break;
		}
		
		if (board[objectCoords[i].x + pointerX][objectCoords[i].y + pointerY].state == "FILL") {
			isInside = false;
			break;
		}
	}
	return isInside;
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

function clearHighlight() {
	for (let i=0; i<9; i++) {
		for (let j=0; j<9; j++) {
			highlightBoard[i][j].updateState("NOT_SELECT");
		}
	}
}