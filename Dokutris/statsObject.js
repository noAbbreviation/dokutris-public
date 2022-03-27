class Stats {
	constructor() {
		this.score = {current:0, total:0};
		this.totalClears = 0;
		this.clears = {horizontal:0, vertical:0, block:0};
		this.inCombo = false;
		this.combo = {total:0, max:0, current:-1};
		this.message = "";
		
		this.animation = [];
	}
	
	restart() {
		this.score = {current:0, total:0};
		this.totalClears = 0;
		this.clears = {horizontal:0, vertical:0, block:0};
		this.inCombo = false;
		this.combo = {total:0, max:0, current:-1};
		this.message = "";
		
		this.animation = [];
	}
	
	piecePlaced(index) {
		this.score.current += lookupPlaceScore(index);
		this.score.total += this.score.current;
		
		this.animation.push(new scoreAnim(mouseX,mouseY,`+${this.score.current}`));
		animQueue.addSequence(this.animation);
		
		if (!(this.inCombo)) {
			if (this.combo.current > 0) {
				this.message += "Combo ended.";
			}
			this.comboEnd();
		}
		this.message = "";
		
		this.animation = [];
		this.score.current = 0;
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
			this.animation = this.animation.concat([new ClearAnim(clearsArr[i]), new Delay(fr/4)]);
		}
		
		this.inCombo = true;
		this.combo.current++;
		this.score.current += lookupClearScore(clearsArr.length,this.combo.current);
		
		if (this.combo.current != 0) {
			this.message += `Combo ${this.combo.current} with a ${clearsArr.length}-Clear!`;
		} else {
			this.message += `A ${clearsArr.length}-Clear!`;
		}
	}
	
	comboEnd() {
		if (this.combo.current > this.combo.max) {
			this.combo.max = this.combo.current;
		}
		
		if (this.combo.current > 0) {
			this.combo.total++
		}
		
		this.combo.current = -1;
	}
	
	gameEnd() {
		console.log(`Game ended. Final score: ${stats.score.total}`);
		appState = FINISH;
	}
}