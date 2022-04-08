function drawOverallStats() {
	let scoreStr = "", hsArr = overallStats.highscores,
		clearsStr = "", clrArr = overallStats.clearType,
		combosStr = "", cmbArr = overallStats.comboTab,
		totalClearStr = "";
		
	for (let i=0; i<hsArr.length; i++) { // Highscores
		scoreStr += `${i+1}: `;
		if (hsArr[i] == 0) {
			scoreStr += '- - - - - - -';
		} else {
			scoreStr += hsArr[i];
		}
		scoreStr += '\n';
	}
	
	for (let i=0; i<clrArr.length; i++) { // Clears
		clearsStr += `${i+1}-clears: `;
		if (clrArr[i] == 0) {
			clearsStr += '- - - -';
		} else {
			clearsStr += clrArr[i];
		}
		clearsStr += '\n';
	}
	
	for (let i=0; i<cmbArr.length; i++) { // Combos
		combosStr += `${i+1}-combo: `;
		if (cmbArr[i] == 0) {
			combosStr += '- - - -';
		} else {
			combosStr += cmbArr[i];
		}
		combosStr += '\n';
	}
	
	
	// Marginalized rect
	fill(skin.overallScreen.fill);
	stroke(skin.overallScreen.stroke);
	strokeWeight(3);
    rect(margin, margin, Math.floor(canvasLength*4/3 - 2*margin), gsLength);
	
	fill(skin.overallScreen.title_text_color);
	stroke(skin.overallScreen.stroke);
	strokeWeight(5);
	textSize(gsLength/10);
	textFont(skinFont);
	textAlign(CENTER);
	text('OVERALL STATS', margin + gsLength * 2/3, margin + gsLength*3/32);
	
	textSize(gsLength/14);
	text('HIGHSCORES', margin + canvasLength*2/9, margin + gsLength*3/16);
	
	text('CLEARS', margin + canvasLength*2/3, margin + gsLength*3/16);
	
	text('COMBOS', margin + canvasLength*10/9, margin + gsLength*3/16);
	
	// Highscores
	fill(skin.overallScreen.stats_text_color);
	stroke(skin.overallScreen.stroke);
	strokeWeight(3);
	textSize(gsLength/20);
	textFont(skinFont);
	textAlign(CENTER);
	text(scoreStr, margin + canvasLength*2/9, margin + gsLength/4);
	
	textSize(gsLength/28);
	text(clearsStr, margin + canvasLength*2/3, margin + gsLength*15/64);
	
	totalClearStr += `Horizontal: ${overallStats.totalClears.horizontal}\n`;
	totalClearStr += `Vertical: ${overallStats.totalClears.vertical}\n`;
	totalClearStr += `Block: ${overallStats.totalClears.block}\n`;
	totalClearStr += `Total: ${overallStats.totalClears.total}`;
	
	textSize(gsLength/24);
	text(totalClearStr, margin + canvasLength*2/3, margin + gsLength*21/32);
	
	textSize(gsLength/25);
	text(combosStr, margin + canvasLength*10/9, margin + gsLength/4);
	
	stroke(skin.overallScreen.stroke);
	fill(skin.overallScreen.gold);
	textSize(gsLength/18);
	text(`Games played: ${overallStats.gamesPlayed}`, margin + canvasLength*4/9, margin + gsLength*7/8);
	
	text(`Pieces placed: ${overallStats.piecesPlaced}`, margin + canvasLength*8/9, margin + gsLength*7/8);
	
	fill(skin.overallScreen.button.fill);
	stroke(skin.overallScreen.button.stroke);
	strokeWeight(3);
    rect(margin + canvasLength*8/15, margin + canvasLength*27/32, canvasLength*4/15, gsLength/12);
	
	fill(skin.overallScreen.button.color);
	stroke(skin.overallScreen.button.stroke);
	text("Back", margin + canvasLength*2/3, margin + canvasLength*27/32 + gsLength/16);
	
	fill(skin.bg_color);
	stroke(skin.unCover_color);
	strokeWeight(3);
    rect(canvasLength*4/3 - 3*margin, canvasLength - 3*margin, margin, margin);
	
	fill(skin.overallScreen.stats_text_color);
	stroke(skin.overallScreen.stroke);
	strokeWeight(3);
	textSize(gsLength/40);
	textFont(skinFont);
	textAlign(CENTER);
	text(skinState, canvasLength*4/3 - margin*5/2, canvasLength - margin*5/2);
}

function changeSkin() {
	const skinsNum = 2;
	
	if (skinState < skinsNum) {
		skinState++;
	} else {
		skinState = 1;
	}
	
	setSkin(skinState);
}

function setSkin(choice) {
	switch (choice) {
		case 1: skin = DefaultSkin;
			break;
		
		case 2: skin = OfficeSkin;
			break;
	}
	
	skinFont = skin.font;
}
	