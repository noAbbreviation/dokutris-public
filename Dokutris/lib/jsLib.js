// JS Lib by Jabez Villamarzo

function randToMax(num = 0) { // Assumes num is an integer
	return Math.floor(Math.random() * (num + 1));
}

function divFloor(num, dividend) {
	return Math.floor(num/dividend);
}

class jsLibComparison {
	constructor(num) {
		this.num = num;
	}
	
	inBetween(lowerBound = 0, upperBound = 0, state = 0) {
		/*  The states are as follows: 
			(lower, upper) - state 00 (please use 0)
			[lower, upper) - state 10
			(lower, upper] - state 01 (please use 1)
			[lower, upper] - state 11
			
			0number is interpreted as an octal,
				which causes some problems in the function.
		
			Sorry for the inconvience.
		*/
		
		let lowerParenthesis = (this.num > lowerBound),
			lowerBracket =     (this.num >= lowerBound),
			upperParenthesis = (this.num < upperBound),
			upperBracket =     (this.num <= upperBound);
		
		switch (state) {
			default: console.warn('Please refer to function for correct input of bounds');
				return false;
			
			 case 0: return (lowerParenthesis && upperParenthesis);
				
			case 10: return (lowerBracket && upperParenthesis);
			
			 case 1: return (lowerParenthesis && upperBracket);
				
			case 11: return (lowerBracket && upperBracket);
		}
	}
	
	areEither(arr = [], strictComparison = false) {
		if (strictComparison) {
			for (let i=0; i<arr.length; i++) {
				if (this.num === arr[i]) return true;
			}
		} else {
			for (let i=0; i<arr.length; i++) {
				if (this.num == arr[i]) return true;
			}
		}
		
		return false;
	}
}

class Dot {
	constructor(xCoord,yCoord) {
		this.x = xCoord;
		this.y = yCoord;
	}
	
	update(xCoord,yCoord) {
		this.x = xCoord;
		this.y = yCoord;
	}
	
	transform(xCoord, yCoord) {
		this.x += xCoord;
		this.y += yCoord;
	}
}

function create2DArray(length1 = 0, length2 = 0) {
	let arr = new Array(length1);
	
	for (let i=0; i<arr.length; i++) {
		arr[i] = new Array(length2);
	}
	
	return arr;
}

function lastIndex(arr) {
	return arr.length-1;
}