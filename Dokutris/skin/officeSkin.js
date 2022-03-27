const officeColor = { // Probably not correct terms
	white: "#f1f6f1",
	black: "#5d4d38",
	
	beige: "#c4b49b",
	green: "#7cd957",
	gray: 50,
	
	neutral: "#fbe49a", // Light-ish pink
	
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
			subtitle_color: officeColor.green
		}
	},
	
	endScreen: {
		color: officeColor.tone,
		stroke: officeColor.beige,
		text: {
			color: officeColor.green,
			stroke: officeColor.black
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
		gold: "#ffd500",
		green: officeColor.green,
		stroke: officeColor.black
	},
	
	unCover_color: officeColor.gray
};