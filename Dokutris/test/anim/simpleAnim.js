class SimpleAnim {
	constructor(pointerX,pointerY) {
		this.x = pointerX;
		this.y = pointerY;
		this.renderFrame = 0;
		this.duration = fr*1;
	}
	
	render() {
		this.currentFill = `rgba(255, 213, 0, ${1-Math.sqrt(this.renderFrame/this.duration)})`;
		this.currentStroke = `rgba(0,0,0,${1-Math.sqrt(this.renderFrame/this.duration)})`;
		
		stroke(this.currentStroke);
		strokeWeight(3);
		fill(this.currentFill);
		textSize(20);
		textAlign(CENTER);
		textFont('Impact');
		text("Hello world",this.x,this.y);
		
		this.renderFrame++;
		return (this.renderFrame <= this.duration);
	}
}

function renderAnims() {
	if (anims.length == 0) {
		noLoop();
	} else {
		loop();
	}
	for (let i=0; i<anims.length; i++) {
		if (anims[i].render() != 1) {
			anims.splice(i,1);
		}
	}
}