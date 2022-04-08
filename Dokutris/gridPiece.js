class gridPiece {
    constructor(x, y) {
        this.x = x;
        this.y = y;
		this.xCoordinate =  x * gridLength + margin;
        this.yCoordinate = y * gridLength + margin;
		this.state = "NORMAL";
    }
    
    render() {
		stroke(skin.gridPiece.stroke);
		strokeWeight(skin.gridPiece.stroke_weight);
		switch (this.state) {
			case "NORMAL": fill(skin.gridPiece.NORMAL);
			break;
			
			case "FILL": fill(skin.gridPiece.FILL);
			break;
			
			case "HIGHLIGHT": fill(skin.gridPiece.HIGHLIGHT);
			break;
			
			case "NOT_SELECT": noFill();
			break;
		}
		rect(this.xCoordinate, this.yCoordinate, gridLength, gridLength);
    }
	
	updateState(state) {
		this.state = state;
	}
}

class pieceHolder {
	constructor(x,y) {
		this.x = x;
		this.y = y;
		this.xCoordinate =  x * sidebarLength + canvasLength + sidebarBuffer;
        this.yCoordinate = y * sidebarLength + scoreHeight + 2*margin;
		this.state = "NORMAL";
	}
	
	changeHold(objIndex) {
		this.objIndex = objIndex;
		this.miniPieceLength = Math.floor((sidebarLength - 2*sbMargin) / 5);
		// TODO: Custom scaling?
		
		if (objIndex == -1) {
			this.mpDimension = -1;
			this.renderCoords = -1;
			return;
		}
		
		let xBounds = {min:0,max:0}, yBounds = {min:0,max:0};
		let renderLengths = new Dot(0,0);
		let coords = lookupPiece(objIndex);		

		for (let i=0; i<coords.length; i++) {
			if (coords[i].x < xBounds.min) {
				xBounds.min = coords[i].x;
			} else if (coords[i].x > xBounds.max) {
				xBounds.max = coords[i].x;
			}
			
			if (coords[i].y < yBounds.min) {
				yBounds.min = coords[i].y;
			} else if (coords[i].y > yBounds.max) {
				yBounds.max = coords[i].y;
			}
		}
		renderLengths.update(Math.abs(xBounds.min - xBounds.max)+1, Math.abs(yBounds.min - yBounds.max)+1);
		
		for (let i=0; i<coords.length; i++) { // Transforms to get them in 4th quadrant
			coords[i].x -= xBounds.min;
			coords[i].y -= yBounds.min;
		}
		
		this.mpDimension = renderLengths;
		this.renderCoords = coords;
	}
	
	render() {
		if (this.state == "NORMAL") {
			redPiece[this.y].state = "NORMAL";
			highlightPiece[this.y].state = "NORMAL";
		} else if (this.state == "SELECT") {
			highlightPiece[this.y].state = "SELECT";
		} else if (this.state == "NOT_FIT") {
			redPiece[this.y].state = "NOT_FIT";
		}
		
		stroke(skin.pieceHolder.stroke);
		strokeWeight(skin.pieceHolder.stroke_weight);
		fill(skin.pieceHolder.bg_color);
		rect(this.xCoordinate,this.yCoordinate,sidebarLength,sidebarLength);
		
		if (this.renderCoords != -1) {
			for (let i=0; i<this.renderCoords.length; i++) {
			
				let miniX = this.xCoordinate + sbMargin + this.renderCoords[i].x * this.miniPieceLength;
				let miniY = this.yCoordinate + sbMargin + this.renderCoords[i].y * this.miniPieceLength;
				
				 // Buffers
				miniX += this.miniPieceLength * (5 - this.mpDimension.x) / 2;
				miniY += this.miniPieceLength * (5 - this.mpDimension.y) / 2;
				
				stroke(skin.pieceHolder.miniPiece.stroke);
				strokeWeight(skin.pieceHolder.miniPiece.stroke_weight);
				fill(skin.pieceHolder.miniPiece.color);
				rect(miniX, miniY, this.miniPieceLength, this.miniPieceLength);
			}
		}
	}
	
	updateState(state) {
		this.state = state;
	}
	
	canFit() { // TODO: Centralized states for all pieceHolders
		let canFit = false;
		for (let i=0; i<9; i++) {
			for (let j=0; j<9; j++) {
				if (this.objIndex == -1 || inBounds(this.objIndex,i,j)) {
					canFit = true;
					break;
				}
			}
		}
		this.state = (canFit) ? ("NORMAL") : ("NOT_FIT");
		
		if (this.state == "NOT_FIT") {
			highlightPiece[this.y].updateState("NORMAL");
			redPiece[this.y].updateState("NOT_FIT");
		}
	}
}

class Pointer {
	constructor() {
		this.state = "NORMAL";
	}
	
	fieldClick(pointerX, pointerY) {
		if (this.state == "SELECT") {
			
			let selected = findSelected();
			
			if (selected != -1) { // Maybe remove cond later?
				if (placePiece(pointerX,pointerY,pieces[selected]) == 0) {
					let holding = pieces[selected].objIndex;
					dokuClearCheck(board);
					pieces[selected].changeHold(-1);
					stats.piecePlaced(holding);
				}
				this.updateState("NORMAL");
				pieces[selected].updateState("NORMAL");
				pointer.toggleSelection();
			}
			
			let isSidebarEmpty = true;
			for (let i=0; i<pieces.length; i++) {
				if (pieces[i].objIndex != -1) {
					isSidebarEmpty = false;
					break;
				}
			}
			
			if (isSidebarEmpty) {
				for (let i=0; i<pieces.length; i++) { // Refills the board
					pieces[i].changeHold(pullFromBag());
				}
			}
			
			for (let i=0; i<pieces.length; i++) { // Checks if pieces still fit
				pieces[i].canFit();
			}
			
			let gameEnd = true;
			for (let i=0; i<pieces.length; i++) {
				if (!(pieces[i].state == "NOT_FIT" || pieces[i].objIndex == -1)) { // If empty or doesn't fit
					gameEnd = false;
					break;
				}
			}
			
			if (gameEnd) {
				stats.gameEnd();
			}
			cache.upload();
		}
	}
	
	sidebarClick(index) {
		if (!(pieces[index].state == "NOT_FIT" || pieces[index].objIndex == -1)) {
			if (this.state == "NORMAL") {
				this.updateState("SELECT");
				pieces[index].updateState("SELECT");
				this.toggleSelection();
				
			} else if (this.state == "SELECT") {
				let selected = findSelected();
				
				if (selected == index) { // Clicked the selected
					this.updateState("NORMAL");
					pieces[selected].updateState("NORMAL"); 
					this.toggleSelection();
				} else if (pieces[selected].objIndex != -1) {
					 // Swaps states
					pieces[index].updateState("SELECT");
					pieces[selected].updateState("NORMAL");
				}
			}
		}
	}
	
	toggleSelection() {
		this.isSelected = !(this.isSelected);
		for (let i=0; i<9; i++) { // Clears highlight
			for (let j=0; j<9; j++) {
				highlightBoard[i][j].updateState("NOT_SELECT");
			}
		}
	}
	
	updateState(state) {
		this.state = state;
	}
}

class highlightHolder extends pieceHolder {
	constructor(x,y) {
		super(x,y);
	}
	
	render() {
		if (this.state == "NORMAL") {
			return;
		} else if (this.state == "SELECT") {
			stroke(skin.pieceHolder.SELECT.stroke);
			strokeWeight(skin.pieceHolder.SELECT.stroke_weight);
		} else if (this.state == "NOT_FIT") {
			stroke(skin.pieceHolder.NOT_FIT.stroke);
			strokeWeight(skin.pieceHolder.NOT_FIT.stroke_weight);
		}
		
		noFill();
		rect(this.xCoordinate,this.yCoordinate,sidebarLength,sidebarLength);
	}
}

class ScoreBoard {
	constructor() {
		this.xPos = canvasLength;
		this.yPos = margin;
		this.width = gsLength / pieces.length;
		this.height = scoreHeight;
	}
	
	render() {
		stroke(skin.scoreBoard.stroke);
		strokeWeight(skin.scoreBoard.stroke_weight);
		fill(skin.scoreBoard.color);
		rect(this.xPos, this.yPos, this.width, this.height);
		
		stroke(skin.scoreBoard.text.stroke);
		strokeWeight(gridLength / 18);
		fill(skin.scoreBoard.text.color);
		textSize(gridLength / 2);
		textAlign(CENTER);
		textFont(skinFont);
		text(`Score:\n${stats.score.total}`, this.xPos + (sidebarLength + 2*margin)/2, (scoreHeight+margin)/1.9);
	}
}