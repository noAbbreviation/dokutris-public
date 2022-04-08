const defaultColor = { // Probably not the correct terms
	white: "#c0c0c0",
	black: "#000000",
	
	red: "#ff6565",
	green: "#7cd957",
	gray: "#646464",
	gold: "#ffd500",
	
	neutral: "#808080", // Gray
	
	tone: "#ffa500", // Orange
};

const DefaultSkin = {
	
	font: "Impact",
	bg_color: defaultColor.gray,
	dokuLines: {stroke: defaultColor.black, strokeWeight: 7},
	
	startScreen: {
		color: defaultColor.tone,
		stroke: defaultColor.black,
		text: {
			title_color: defaultColor.red,
			subtitle_color: defaultColor.green,
			button_color: defaultColor.white
		},
		
		statsButton: {
			color: defaultColor.gold,
			stroke: defaultColor.gray
		},
		playButton: {
			color: defaultColor.green,
			stroke: defaultColor.gray
		}
	},
	
	continuePopup: {
		color: defaultColor.tone,
		stroke: defaultColor.gray,
		text: {
			color: defaultColor.green,
			stroke: defaultColor.gray
		},
		
		button_text_color: defaultColor.tone,
		contButton: {
			color: defaultColor.green,
			stroke: defaultColor.gray
		},
		restartButton: {
			color: defaultColor.red,
			stroke: defaultColor.gray
		}
	},
	
	endScreen: {
		color: defaultColor.tone,
		stroke: defaultColor.black,
		score_text: {
			color: defaultColor.green,
			stroke: defaultColor.gray
		},
		hs_text: {
			color: defaultColor.white,
			stroke: defaultColor.gray,
			stroke_weight: 4,
		},
		
		button_text_color: defaultColor.tone,
		statsButton: {
			color: defaultColor.green,
			stroke: defaultColor.gray
		},
		restartButton: {
			color: defaultColor.red,
			stroke: defaultColor.gray
		},
		
		backButton: {
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
		gold: defaultColor.gold,
		green: defaultColor.green,
		stroke: defaultColor.black
	},
	
	overallScreen: {
		fill: defaultColor.tone,
		stroke: defaultColor.black,
		title_text_color: defaultColor.green,
		stats_text_color: defaultColor.white,
		gold: defaultColor.gold,
		button: {
			fill: defaultColor.green,
			stroke: defaultColor.black,
			color: defaultColor.tone
		}
	},
	
	unCover_color: defaultColor.black
};