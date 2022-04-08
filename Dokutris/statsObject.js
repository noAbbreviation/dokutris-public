class Stats {
	constructor() {
		this.score = {current:0, total:0};
		this.totalClears = 0;
		this.piecesPlaced = 0;
		this.clears = {horizontal:0, vertical:0, block:0, highest:0};
		this.comboTab = [0,0,0,0,0,0,0,0];
		this.clearType = [0,0,0,0,0,0,0,0,0];
		this.inCombo = false;
		this.combo = {total:0, max:0, current:-1};
		this.message = "";
		
		this.animation = [];
	}
	
	restart() {
		this.score = {current:0, total:0};
		this.totalClears = 0;
		this.piecesPlaced = 0;
		this.clears = {horizontal:0, vertical:0, block:0, highest:0};
		this.comboTab = [0,0,0,0,0,0,0,0];
		this.clearType = [0,0,0,0,0,0,0,0,0];
		this.inCombo = false;
		this.combo = {total:0, max:0, current:-1};
		
		this.animation = [];
	}
	
	piecePlaced(index) {
		this.score.current += lookupPlaceScore(index);
		this.score.total += this.score.current;
		
		this.animation.push(new scoreAnim(mouseX,mouseY,`+${this.score.current}`));
		animQueue.addSequence(this.animation);
		
		if (!(this.inCombo)) {
			this.comboEnd();
		}
		
		this.animation = [];
		this.score.current = 0;
		this.piecesPlaced++;
		this.inCombo = false;
	}
	
	lineCleared(clearsArr) {
		for (let i=0; i<clearsArr.length; i++) {
			switch (clearsArr[i].type) {
				case "horizontal": this.clears.horizontal++;
				break;
		
				case "vertical": this.clears.vertical++;
				break;
					
				case "block": this.clears.block++;
				break;
			}
			this.animation = this.animation.concat([new ClearAnim(clearsArr[i]), new Delay(fr/5,true)]);
		}
		if (clearsArr.length > this.clears.highest) {
			 this.clears.highest = clearsArr.length;
		}
		this.clearType[clearsArr.length-1]++; // clears.length is number of clears
		this.totalClears += clearsArr.length;
		
		this.inCombo = true;
		this.combo.current++;
		this.score.current += lookupClearScore(clearsArr.length,this.combo.current);
	}
	
	comboEnd() {
		if (this.combo.current > this.combo.max) {
			this.combo.max = this.combo.current;
		}
		
		if (this.combo.current > 0) {
			this.combo.total++;
			this.comboTab[this.combo.current-1]++;
		}
		
		this.combo.current = -1;
	}
	
	gameEnd() {
		console.log(`Game ended. Final score: ${stats.score.total}`);
		appState = FINISH_POP;
		overallStats.update();
	}
}

class OverallStats {
	constructor() {
		this.bestScore = 0;
		this.totalClears = {horizontal:0, vertical:0, block:0, total:0};
		this.clearType = [0,0,0,0,0,0,0,0,0];
		this.maxCombo = 0;
		this.comboTab = [0,0,0,0,0,0,0,0];
		this.highestCleared = 0;
		this.piecesPlaced = 0;
		this.gamesPlayed = 0;
		this.highscores = [0,0,0,0,0,0,0,0,0,0]; // default shown
	}
	
	update() {
		if (stats.score.total > this.bestScore) {
			this.bestScore = stats.score.total;
		}
		
		this.totalClears.horizontal += stats.clears.horizontal;
		this.totalClears.vertical += stats.clears.vertical;
		this.totalClears.block += stats.clears.block;
		this.totalClears.total += stats.totalClears;
		
		for (let i=0; i<this.clearType.length; i++) {
			this.clearType[i] += stats.clearType[i];
		}
		
		if (stats.combo.max > this.maxCombo && stats.combo.max > 0) {
			this.maxCombo = stats.combo.max;
		}
		
		for (let i=0; i<this.comboTab.length; i++) {
			this.comboTab[i] += stats.comboTab[i];
		}
		
		if (stats.clears.highest > this.highestCleared) {
			this.highestCleared = stats.clears.highest;
		}
		this.piecesPlaced += stats.piecesPlaced;
		this.gamesPlayed++;
		
		for (let i=0; i<this.highscores.length; i++) {
			if (stats.score.total > this.highscores[i]) {
				for (let j=this.highscores.length-1; j>i; j--) {
					this.highscores[j] = this.highscores[j-1];
				}
				this.highscores[i] = stats.score.total;
				break;
			}
		}
	}
}