const officeColor = { // Probably not correct terms
	white: "#f1f6f1",
	black: "#5d4d38",
	
	beige: "#c4b49b",
	green: "#7cd957",
	gray: 50,
	gold: "#ffd500",
	
	neutral: "#fcf0ca", // Light-ish pink
	
	tone: "#fdfb5b", // Light-ish yellow
	accent: "#ff6565" // Light-ish red
};

const OfficeSkin = {
	
	font: "ABeeZee",
	bg_color: officeColor.white,
	dokuLines: {stroke: officeColor.black, strokeWeight: 7},
	
	startScreen: {
		color: officeColor.tone,
		stroke: officeColor.gray,
		text: {
			title_color: officeColor.accent,
			subtitle_color: officeColor.green,
			button_color: officeColor.white
		},
		
		statsButton: {
			color: officeColor.gold,
			stroke: officeColor.gray
		},
		playButton: {
			color: officeColor.green,
			stroke: officeColor.gray
		}
	},
	
	continuePopup: {
		color: officeColor.tone,
		stroke: officeColor.gray,
		text: {
			color: officeColor.green,
			stroke: officeColor.gray
		},
		
		button_text_color: officeColor.white,
		contButton: {
			color: officeColor.green,
			stroke: officeColor.gray
		},
		restartButton: {
			color: officeColor.accent,
			stroke: officeColor.gray
		}
	},
	
	endScreen: {
		color: officeColor.tone,
		stroke: officeColor.beige,
		score_text: {
			color: officeColor.green,
			stroke: officeColor.black
		},
		hs_text: {
			color: officeColor.white,
			stroke: officeColor.gray,
			stroke_weight: 4,
		},
		
		button_text_color: officeColor.tone,
		statsButton: {
			color: officeColor.green,
			stroke: officeColor.gray
		},
		restartButton: {
			color: officeColor.accent,
			stroke: officeColor.gray
		},
		
		backButton: {
			color: officeColor.green,
			stroke: officeColor.gray
		}
	},
	
	pieceHolder: {
		
		NORMAL: { stroke: officeColor.black, stroke_weight: 5 },
		SELECT: { stroke: officeColor.beige, stroke_weight: 10 },
		NOT_FIT: { stroke: officeColor.accent, stroke_weight: 4 },
		
		miniPiece: {
			stroke: officeColor.black,
			stroke_weight: 2,
			color: officeColor.neutral,
		},
		
		stroke: officeColor.black,
		stroke_weight: 5,
		bg_color: officeColor.tone,
	},
	
	gridPiece: {
		stroke: officeColor.gray,
		stroke_weight: 2,
		
		NORMAL: officeColor.neutral,
		FILL: officeColor.tone,
		HIGHLIGHT: officeColor.green
	},
	
	scoreBoard: {
		color: officeColor.tone,
		stroke: officeColor.black,
		stroke_weight: 5,
		
		text: {
			color: officeColor.neutral,
			stroke: officeColor.gray,
			stroke_weight: 1,
		}
	},
	
	animColor: {
		gold: officeColor.gold,
		green: officeColor.green,
		stroke: officeColor.black
	},
	
	overallScreen: {
		fill: officeColor.tone,
		stroke: officeColor.black,
		title_text_color: officeColor.green,
		stats_text_color: officeColor.white,
		gold: officeColor.gold,
		button: {
			fill: officeColor.green,
			stroke: officeColor.black,
			color: officeColor.tone
		}
	},
	
	unCover_color: officeColor.gray
};