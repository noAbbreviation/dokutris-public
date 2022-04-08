function preload() {
	cache = new Cache();
	cache.fetchProps();
	
	if (!(cache.fresh)) {
		skinState = cache.getObj('skinState');
	}
	
	setSkin(skinState);
}

function setup() {
	let can = createCanvas(canvasLength * 4/3, canvasLength);
	can.mouseMoved(highlightPlacement);  
	frameRate(fr);
	noLoop();
	
	pointer = new Pointer();
	overallStats = new OverallStats();
	if (!(cache.fresh)) {
		for (let statsProp in cache.getObj('overallStats')) {
			overallStats[statsProp] = cache.getObj('overallStats')[statsProp];
		}
	}
}

function draw() {
	strokeJoin(ROUND);
	drawBG();
	
	switch (appState) {
		case START:
			if (cache.fresh) {
				drawFreshStart();
			} else {
				drawNormalStart();
			}
			
			break;
		
		case OA_STATS:
			drawOverallStats();
			break;
		
		
		case FINISH_POP:
		case CONT_POPUP:
		case SHOW_ENDSTATS:
		
		// Passthrough
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
			
			switch (appState) {
				case CONT_POPUP:
					continueSessionPopup();
					break;
					
				case FINISH_POP:
					drawEndScreen();
					break;
				
				case SHOW_ENDSTATS:
					drawEndStats();
					break;
			}
			break;
	}
	
}

function pindot(state) {
	if (!(freezeControl)) {
		switch (appState) {
			case START:
				pushStartButtons();
				break;
				
			case PLAYING:
				playClick();
				break;
			
			case OA_STATS:
				backToMain();
				break;
			
			case CONT_POPUP:
				addressContPopup();
				break;
				
			case FINISH_POP:
				addressEndScreen();
				break;
				
			case SHOW_ENDSTATS:
				backToEndScreen();
				break;
		}
	}
	
	redraw();
}

function drawBG() {
    background(skin.bg_color);
}

function drawFreshStart() {
	fill(skin.startScreen.color);
	stroke(skin.startScreen.stroke);
    rect(margin, margin, Math.floor(canvasLength*4/3 - 2*margin), gsLength);
	
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

function drawNormalStart() {
	fill(skin.startScreen.color);
	stroke(skin.startScreen.stroke);
	strokeWeight(3);
    rect(margin, margin, Math.floor(canvasLength*4/3 - 2*margin), gsLength);
	
	// title
	fill(skin.startScreen.text.title_color);
	stroke(skin.startScreen.stroke);
	strokeWeight(5);
	textSize(gsLength / 3.5);
	textFont(skinFont);
	textAlign(CENTER);
	text('DOKUTRIS', gsLength*2/3 + margin, canvasLength*3/8-margin);
	
	fill(skin.startScreen.statsButton.color);
	stroke(skin.startScreen.statsButton.stroke);
	rect(canvasLength*2/5, canvasLength/2, canvasLength*4/3*2/5, canvasLength/5);
	
	fill(skin.startScreen.playButton.color);
	stroke(skin.startScreen.playButton.stroke);
	rect(canvasLength*2/5, canvasLength*7/10 + margin, canvasLength*4/3*2/5, canvasLength/5);
	
	fill(skin.startScreen.text.button_color);
	textSize(gsLength / 9);
	text('Stats', canvasLength*4/3/2, margin+canvasLength*6/10);
	
	let toGameText = (cache.getObj('appState') == PLAYING) ? 'Continue' : 'Start';
	text(toGameText, canvasLength*4/3/2, 2*margin+canvasLength*8/10);
}

function drawDokuLines() {
	let m = margin, len = gridLength;
	let pts = [];
	
	for (let i=0; i<16; i++) {
		pts[i] = new Dot(m + (i%4) * 3*len, m + divFloor(i,4) * 3*len);
	}
	
	stroke(skin.dokuLines.stroke);
	strokeWeight(skin.dokuLines.strokeWeight);
	
	for (let i=0; i<=3; i++) {
		line(pts[i].x, pts[i].y, pts[i+12].x, pts[i+12].y); // Vertical lines
		line(pts[4*i].x, pts[4*i].y, pts[4*i+3].x, pts[4*i+3].y); // Horizontal lines
	}
}

function continueSessionPopup() {
	let lengthX = 2/5*canvasLength*4/3,  lengthY = 2/5*canvasLength,
		marginX = 3/10*canvasLength*4/3, marginY = 3/10*canvasLength;
	
	stroke(skin.continuePopup.stroke);
	strokeWeight(gridLength/12);
	fill(skin.continuePopup.color);
	rect(marginX, marginY, lengthX, lengthY);
	
	stroke(skin.continuePopup.text.stroke);
	strokeWeight(gridLength/15);
	textSize(gsLength/18);
	fill(skin.continuePopup.text.color);
	textFont(skinFont);
	text("A game is currently\nplaying.\nContinue?", canvasLength*2/3, marginY + lengthY*1/4);
	
	// Restart rect, cont, restart text, cont
	stroke(skin.continuePopup.restartButton.stroke);
	strokeWeight(gridLength/10);
	fill(skin.continuePopup.restartButton.color);
	rect(marginX, marginY + lengthY*2/3, lengthX/2, lengthY*1/3);
	
	stroke(skin.continuePopup.contButton.stroke);
	fill(skin.continuePopup.contButton.color);
	rect(marginX + lengthX/2, marginY + lengthY*2/3, lengthX/2, lengthY*1/3);
	
	stroke(skin.continuePopup.restartButton.stroke);
	strokeWeight(gridLength/12);
	textSize(gsLength/20);
	fill(skin.continuePopup.button_text_color);
	textFont(skinFont);
	text("Restart", marginX + lengthX/4, marginY + lengthY*7/8 + sbMargin);
	
	stroke(skin.continuePopup.contButton.stroke);
	text("Continue", marginX + lengthX*3/4, marginY + lengthY*7/8 + sbMargin);
}

function drawEndScreen() {
	let lengthY = 5/6*canvasLength, lengthX = 2/5*canvasLength*4/3,
		marginY = 1/12*canvasLength,  marginX = 3/10*canvasLength*4/3,
		scoreStr = "Highscores:\n", hsArr = overallStats.highscores;
		
	for (let i=0; i<hsArr.length; i++) {
		scoreStr += `${i+1}: `;
		if (hsArr[i] == 0) {
			scoreStr += '- - - - - - -';
		} else {
			scoreStr += hsArr[i];
		}
		scoreStr += '\n';
	}
	
	stroke(skin.endScreen.stroke);
	strokeWeight(gridLength/10);
	fill(skin.endScreen.color);
	rect(marginX, marginY, lengthX, lengthY);
	
	stroke(skin.endScreen.score_text.stroke);
	strokeWeight(gridLength/10);
	textSize(gsLength*29/420);
	fill(skin.endScreen.score_text.color);
	textFont(skinFont);
	text(`Final Score: ${stats.score.total}`, marginX + lengthX/2, marginY + lengthY/10 + sbMargin*2);
	
	stroke(skin.endScreen.hs_text.stroke);
	strokeWeight(skin.endScreen.hs_text.stroke_weight);
	textSize(gsLength/22);
	fill(skin.endScreen.hs_text.color);
	textFont(skinFont);
	text(scoreStr, marginX + lengthX/2, marginY + lengthY*11/60 + sbMargin*2);
	
	// Stats rect, restart rect, stats text, restart text
	stroke(skin.endScreen.statsButton.stroke);
	strokeWeight(gridLength/10);
	fill(skin.endScreen.statsButton.color);
	rect(marginX, marginY + lengthY*21/24, lengthX/2, lengthY*3/24);
	
	stroke(skin.endScreen.restartButton.stroke);
	fill(skin.endScreen.restartButton.color);
	rect(marginX + lengthX/2, marginY + lengthY*21/24, lengthX/2, lengthY*3/24);
	
	stroke(skin.endScreen.statsButton.stroke);
	strokeWeight(gridLength/15);
	textSize(gsLength/20);
	fill(skin.endScreen.button_text_color);
	textFont(skinFont);
	text("Stats", marginX + lengthX/4, marginY + lengthY*45/48 + sbMargin*2);
	
	stroke(skin.endScreen.restartButton.stroke);
	text("Restart", marginX + lengthX*3/4, marginY + lengthY*45/48 + sbMargin*2);
}

function drawEndStats() {
	let lengthY = 5/6*canvasLength, lengthX = 2/5*canvasLength*4/3,
		marginY = 1/12*canvasLength,  marginX = 3/10*canvasLength*4/3,
		statsStr = "",
		clearsMade = stats.clears.horizontal + stats.clears.vertical + stats.clears.block;
	
	stroke(skin.endScreen.stroke);
	strokeWeight(gridLength/10);
	fill(skin.endScreen.color);
	rect(marginX, marginY, lengthX, lengthY);
	
	stroke(skin.endScreen.score_text.stroke);
	strokeWeight(gridLength/10);
	textSize(gsLength/18);
	fill(skin.endScreen.score_text.color);
	textFont(skinFont);
	text(`Game Stats:`, marginX + lengthX/2, marginY + lengthY/14);
	
	statsStr += `Final Score: ${stats.score.total}`;
	
	statsStr += `\n\nClears made: ${clearsMade}`;
	statsStr += `\nHorizontal: ${stats.clears.horizontal}`;
	statsStr += `\nVertical: ${stats.clears.vertical}`;
	statsStr += `\nBlock: ${stats.clears.block}`;
	
	statsStr += `\n\nPieces placed: ${stats.piecesPlaced}`;
	statsStr += `\nHighest cleared: ${stats.clears.highest}`;
	statsStr += `\nBest combo: ${stats.combo.max}`;
	
	stroke(skin.endScreen.hs_text.stroke);
	strokeWeight(skin.endScreen.hs_text.stroke_weight);
	textSize(gsLength/20);
	fill(skin.endScreen.hs_text.color);
	textFont(skinFont);
	text(statsStr, marginX + lengthX/2, marginY + lengthY/5);
	
	stroke(skin.endScreen.backButton.stroke);
	strokeWeight(gridLength/10);
	fill(skin.endScreen.backButton.color);
	rect(marginX, marginY + lengthY*21/24, lengthX, lengthY*3/24);
		
	stroke(skin.endScreen.backButton.stroke);
	strokeWeight(gridLength/15);
	textSize(gsLength/20);
	fill(skin.endScreen.button_text_color);
	textFont(skinFont);
	text("Back", marginX + lengthX/2, marginY + lengthY*45/48 + sbMargin*2);
	
}