const defaultColor = { // Probably not correct terms
	white: "#c0c0c0",
	black: "#000000",
	
	red: "#ff6565",
	green: "#7cd957",
	gray: "#646464",
	
	neutral: "#808080", // Gray
	
	tone: "#ffa500", // Orange
};

const DefaultSkin = {
	
	font: "Impact",
	bg_color: defaultColor.gray,
	dokuLines: {stroke: defaultColor.black, strokeWeight: 7},
	
	startScreen: {
		color: defaultColor.white,
		stroke: defaultColor.black,
		text: {
			title_color: defaultColor.red,
			subtitle_color: defaultColor.green
		}
	},
	
	endScreen: {
		color: defaultColor.tone,
		stroke: defaultColor.gray,
		text: {
			color: defaultColor.green,
			stroke: defaultColor.gray
		}
	},
	
	pieceHolder: {
		
		NORMAL: { stroke: defaultColor.black, stroke_weight: 5 },
		SELECT: { stroke: defaultColor.white, stroke_weight: 10 },
		NOT_FIT: { stroke: defaultColor.red, stroke_weight: 4 },
		
		miniPiece: {
			stroke: defaultColor.black,
			stroke_weight: 2,
			color: defaultColor.white,
		},
		
		stroke: defaultColor.black,
		stroke_weight: 5,
		bg_color: defaultColor.tone,
	},
	
	gridPiece: {
		stroke: defaultColor.gray,
		stroke_weight: 2,
		
		NORMAL: defaultColor.neutral,
		FILL: defaultColor.tone,
		HIGHLIGHT: defaultColor.green
	},
	
	scoreBoard: {
		color: defaultColor.tone,
		stroke: defaultColor.black,
		stroke_weight: 5,
		
		text: {
			color: defaultColor.white,
			stroke: defaultColor.gray,
			stroke_weight: 1,
		}
	},
	
	animColor: {
		gold: "#ffd500",
		green: defaultColor.green,
		stroke: defaultColor.black
	},
	
	unCover_color: defaultColor.gray
};