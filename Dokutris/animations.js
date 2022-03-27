class animationHolder {
	constructor() {
		this.animArray = [];
	}
	
	addAnim(animObj) {
		this.animArray.push(animObj);
	}
	
	render() {
		if (this.animArray.length == 0 && !(runsSpecialAnim())) {
			noLoop();
		} else {
			loop();
		}
		
		for (let i=0; i<this.animArray.length; i++) {
			if (this.animArray[i].render() != 1) { // If done
				this.animArray.splice(i,1);
			}
		}
	}
}

function runsSpecialAnim() {
	return (pointer.isSelected);
}

class Anim {
	constructor() {
		this.renderFrame = 0;
		this.animDuration = fr;
		this.animRatio = 0;
	}
	
	update() {
		this.renderFrame++;
		this.animRatio = this.renderFrame / this.animDuration;
		this.done = (this.renderFrame < this.animDuration);
	}
	
}

class scoreAnim extends Anim {
	constructor(pointerX,pointerY,message) {
		super();
		this.x = pointerX;
		this.y = pointerY;
		this.message = message;
		this.delay = 0;
		
		this.animDuration = fr*3/4;
		this.opacity = 0;
		this.transitions = [new Linear(0,1,fr/4), new Unchanged(1,fr/4), new Linear(1,0,fr/4), new Final(0)];
	}
	
	render() {
		this.lookupOpacity();
		this.currentStroke = color(skin.animColor.stroke);
		this.currentStroke.setAlpha(255*Math.sqrt(this.opacity));
		
		let gold = color(skin.animColor.gold);
		let green = color(skin.animColor.green);
		let lerpGold = lerpColor(green, gold, Math.sqrt((stats.combo.current+2)/10));
		lerpGold.setAlpha(255*Math.sqrt(this.opacity));
		green.setAlpha(255*Math.sqrt(this.opacity));
		
		stroke(this.currentStroke);
		strokeWeight(gridLength / 15);
		
		if (stats.combo.current > 0) {
			fill(lerpGold);
		} else {
			fill(green);
		}
		
		textSize(gridLength / 2);
		textAlign(CENTER);
		textFont(skinFont);
		text(this.message,this.x,this.y);
		
		this.update();
		return this.done;
	}
	
	lookupOpacity() {
		this.opacity = lookupTiming(this.transitions,this.renderFrame);
	}
}

class unCover extends Anim {
	constructor() {
		super();
		this.delay = 0;
		this.animDuration = fr/2;
		freezeControl = true;
	}
	
	render() {
		noStroke();
		
		let unCoverFill = color(skin.unCover_color);
		unCoverFill.setAlpha(255*(1-Math.sqrt(this.animRatio)));
		fill(unCoverFill);
		
		rect(0,0,canvasLength*4/3, canvasLength);
		
		this.update();
		if (this.done == 0) {
			freezeControl = false;
		}
		return this.done;
	}
}

class ClearAnim extends Anim {
	constructor(clearObj) {
		super();
		this.type = clearObj.type;
		this.index = clearObj.index;
		this.delay = 0;
		
		this.animDuration = fr/4;
		freezeControl = true;
		this.transitions = [new Linear(0,1,fr/8), new Linear(1,0,fr/8), new Final(0)];

	}
	
	render() {
		let opacity = Math.sqrt(lookupTiming(this.transitions,this.renderFrame));
		let gold = color(skin.animColor.gold);
		let green = color(skin.animColor.green);
		let lerpGold = lerpColor(green, gold, Math.sqrt((stats.combo.current+2)/10));
		lerpGold.setAlpha(255*Math.sqrt(opacity));
		green.setAlpha(255*Math.sqrt(opacity));
		
		noStroke();
		if (stats.combo.current > 0) {
			fill(lerpGold);
		} else {
			fill(green);
		}
		
		switch (this.type) {
			case "horizontal":
				rect(margin, this.index*gridLength+margin, gsLength, gridLength);
				break;
			
			case "vertical":
				rect(this.index*gridLength+margin, margin, gridLength, gsLength);
				break;
				
			case "block":
				rect(this.index%3*3*gridLength + margin, Math.floor(this.index/3)*3*gridLength + margin, gridLength*3, gridLength*3);
		}
		
		this.update();
		if (this.done == 0) {
			freezeControl = false;
		}
		return this.done;
	}
}

class AnimQueue {
	constructor() {
		this.sequence = [];
		this.counter = 0;
	}
	
	addSequence(sequenceArr) {
		this.sequence = this.sequence.concat(sequenceArr);
	}
	
	update() {
		for (let i=0; i<this.sequence.length; i++) {
			if (this.sequence[i].delay >= this.counter) {
				this.counter++;
				break;
			} else {
				animHolder.addAnim(this.sequence[i]);
				this.counter = 0;
				this.sequence.shift(); // Pass through here
			}
		}
	}
}

class Delay {
	constructor(duration) {
		this.delay = duration;
	}
	
	render() {
		return 0;
	}
}


