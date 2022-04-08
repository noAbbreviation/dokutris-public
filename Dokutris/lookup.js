function lookupPiece(pieceIndex) {
	let variant1 = divFloor(pieceIndex,4), variant2 = pieceIndex % 4;
	let returnObj;
	
	switch (variant1) {
		case 0: returnObj = moveSequence(5); 
			break; // dot
		
		case 1: returnObj = (divFloor(variant2,2) == 1) ? (moveSequence(5,6)) : (moveSequence(5,8));
			break; // 2-line
		
		case 2: returnObj = (divFloor(variant2,2) == 1) ? (moveSequence(5,6,6)) : (moveSequence(5,8,8));
			break; // 3-line
		
		case 3:
			if (variant2 == 0) {
				returnObj = moveSequence(5,2,4);
			} else if (variant2 == 1) {
				returnObj = moveSequence(5,2,6);
			} else if (variant2 == 2) {
				returnObj = moveSequence(5,8,4);
			} else {
				returnObj = moveSequence(5,8,6);
			}
			break; // elbow
		
		case 4: returnObj = moveSequence(5,6,8,4);
			break; // ball
		
		case 5: returnObj = (divFloor(variant2,2) == 1) ? (moveSequence(5,6,6,6)) : (moveSequence(5,8,8,8));
			break; // 4-line
		
		case 6:
			if (variant2 == 0) {
				returnObj = moveSequence(5,4,4,2);
			} else if (variant2 == 1) {
				returnObj = moveSequence(5,6,6,2);
			} else if (variant2 == 2) {
				returnObj = moveSequence(5,4,4,8);
			} else if (variant2 == 3) {
				returnObj = moveSequence(5,6,6,8);
			}
			break; // lj-horizontal
		
		case 7: 
			if (variant2 == 0) {
				returnObj = moveSequence(5,2,2,4);
			} else if (variant2 == 1) {
				returnObj = moveSequence(5,2,2,6);
			} else if (variant2 == 2) {
				returnObj = moveSequence(5,8,8,4);
			} else {
				returnObj = moveSequence(5,8,8,6);
			}
			break; // lj-vertical
		
		case 8:
			if (variant2 == 0) {
				returnObj = moveSequence(5,1,6,6);
			} else if (variant2 == 1) {
				returnObj = moveSequence(5,3,8,8);
			} else if (variant2 == 2) {
				returnObj = moveSequence(5,9,4,4);
			} else {
				returnObj = moveSequence(5,7,2,2);
			}
			break; // t piece
		
		case 9:
			if (variant2 == 0) {
				returnObj = moveSequence(5,2,4,2);
			} else if (variant2 == 1) {
				returnObj = moveSequence(5,2,6,2);
			} else if (variant2 == 2) {
				returnObj = moveSequence(5,6,2,6);
			} else {
				returnObj = moveSequence(5,6,8,6);
			}
			break; // sz piece
		
		case 10:
			if (variant2 == 0) {
				returnObj = moveSequence(5,2,2,4,4);
			} else if (variant2 == 1) {
				returnObj = moveSequence(5,2,2,6,6);
			} else if (variant2 == 2) {
				returnObj = moveSequence(5,8,8,4,4);
			} else {
				returnObj = moveSequence(5,8,8,6,6);
			}
			break; // big elbow
		
		case 11:
			if (variant2 == 0) {
				returnObj = moveSequence(5,2,1,6,6);
			} else if (variant2 == 1) {
				returnObj = moveSequence(5,6,3,8,8);
			} else if (variant2 == 2) {
				returnObj = moveSequence(5,8,7,6,6);
			} else {
				returnObj = moveSequence(5,4,1,8,8);
			}
			break; // big t piece
		
		case 12: returnObj = moveSequence(5,2,9,7,1);
			break; // cross piece
		
		case 13: returnObj = (divFloor(variant2,2) == 1) ? (moveSequence(5,6,6,6,6)) : (moveSequence(5,8,8,8,8));
			break; // 5-line
		
		case 14: returnObj = (divFloor(variant2,2) == 1) ? (moveSequence(5,9,9)) : (moveSequence(5,7,7));
			break; // diagonal piece
			
		default: console.error("Invalid pieceIndex", pieceIndex);
	}
	
	return returnObj;
}

function moveCoord(coordObj, variant=5) {
	// This movement system is inspired by the numpad.
	let pMove = 0, lMove = 0; // p as in portrait, l as in landscape
	let temp = {x:0, y:0};
	
	if (variant % 3 == 1) {
		lMove = -1;
	} else if (variant % 3 == 0) {
		lMove = 1;
	}
	
	if (Math.floor((variant-1)/3) == 0) {
		pMove = -1;
	} else if (Math.floor((variant-1)/3) == 2) {
		pMove = 1;
	}
	
	temp.x = coordObj.x + lMove;
	temp.y = coordObj.y + pMove;

	return temp;
}

function moveSequence(...movementArr) {
	let storageMovementArr = [], coordObj = {x:0, y:0};
	
	for (let i=0; i<movementArr.length; i++) {
		coordObj = moveCoord(coordObj, movementArr[i]);
		storageMovementArr.push(coordObj);
	}
	
	return storageMovementArr;
}

function lookupDistrib(index) {
	let onePiece = [0], twoPiece = [1], threePiece = [2,3],
		fourPiece = [4,5,6,7,8,9], fivePiece = [10,11,12,13],
		diagPiece = [14];
	
	let table = onePiece.concat(onePiece).concat(onePiece).concat(onePiece); // 4
		table = table.concat(twoPiece).concat(twoPiece).concat(twoPiece); // 3
		table = table.concat(threePiece).concat(threePiece); // 2
		table = table.concat(fourPiece); // 1
		table = table.concat(fivePiece).concat(fivePiece); // 2
		table = table.concat(diagPiece); // 1
	
	return table[index];
}

 // Super duper prototype scores
function lookupPlaceScore(pieceIndex) {
	let numPieces = lookupPiece(pieceIndex).length;
	return numPieces * 10;
}

function lookupClearScore(clears,combo) {
	let table = [
		[100,   150,  200,  250,  300,  350,  400,  500, 600],
		[300,   350,  400,  450,  500,  600,  700,  800],
		[600,   700,  800,  900,  1000, 1100, 1200],
		[1200,  1300, 1500, 1700, 1900, 2100],
		[2000,  2200, 2400, 2600, 2800],
		[3500,  3800, 4100, 4500],
		[5000,  5500, 6000],
		[7000,  8000, 9000],
		[10000, 12500]
	];
	
	return table[clears-1][combo];
}



function lookupTiming(timingArr, time) { // [0,time) are the transitionObj range
	let currentTime = time;
	
	for (let i=0; i<timingArr.length; i++) {
		if (currentTime < timingArr[i].duration || currentTime == 0) {
			return timingArr[i].transition(currentTime);
		} else {
			currentTime -= timingArr[i].duration;
		}
	}
	
	console.warn("Time exceeds lookUpTiming.");
}

class Transition {
	constructor(point1, point2, duration) {
		this.point1 = point1;
		this.point2 = point2;
		this.duration = duration;
		
		if (point1 == point2) {
			console.error("Transition not valid: Transition points are the same.");
		}
	}
}

class Unchanged {
	constructor(point, duration) {
		this.constant = point;
		this.duration = duration;
	}
	
	transition(currentTime) {
		return this.constant;
	}
}

class Final {
	constructor(point) {
		this.constant = point;
		this.duration = 0;
	}
	
	transition(currentTime) {
		return this.constant;
	}
}

class Linear extends Transition {
	constructor(point1, point2, duration) {
		super(point1, point2, duration);
	}
	
	transition(currentTime) {
		let slope = (this.point2 - this.point1) / this.duration;
		
		return (slope * currentTime + this.point1);
	}
}

class UpperElliptical extends Transition {
	constructor(point1, point2, duration) {
		super(point1, point2, duration);
		
		this.shiftCoords = new Dot(0,0);
		this.direction = 1;
		this.nonStandard = (this.point1 > this.point2) ? (true) : (false);
		this.halfHeight = this.point1;
		
		if (this.nonStandard) {
			this.shiftCoords.transform(this.duration,0);
		}
	}
	
	transition(currentTime) {
		let xTerm = Math.pow(((currentTime - this.shiftCoords.x) / this.duration),2);
		
		return (this.direction * this.halfHeight * Math.sqrt(1 - xTerm) + this.shiftCoords.y);
	}
}

class LowerElliptical extends UpperElliptical {
	constructor(point1, point2, duration) {
		super(point1, point2, duration);
		
		this.shiftCoords = new Dot(0,this.point1);
		this.direction = -1;
		this.nonStandard = (this.point1 < this.point2) ? (true) : (false);
		this.halfHeight = this.point1;
		
		if (this.nonStandard) {
			this.shiftCoords.transform(this.duration,0);
		}
	}
}

class UpwardParabolic extends Transition {
	constructor(point1, point2, duration) {
		super(point1, point2, duration);
		
		this.shiftCoords = new Dot(0,0);
		if (point1 > point2) {
			this.shiftCoords.transform(this.duration,this.point1);
		} else if (point1 < point2) {
			this.shiftCoords.transform(0,this.point1);
		}
		
		this.sign = 1;
		this.constant = Math.pow(point2-point1,2) / this.duration;
	}
	
	transition(currentTime) {
		let xTerm = Math.pow(currentTime - this.shiftCoords.x,2);
		return (this.sign * this.constant * xTerm + this.point1);
	}
}

// TODO: Different parabolas, won't do it for now as i won't probably need it.