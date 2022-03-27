const ERROR = -1, START = 0, PLAYING = 1, FINISH = 2; // FOR GAME STATES

const fr = 60;

const canvasLength = Math.min(window.innerWidth, window.innerHeight), //  Changeable
    margin = 20, sbMargin = 5,
	gsLength = Math.floor(canvasLength-2*margin);

// Game states
let pieces = new Array(3), redPiece = new Array(3), highlightPiece = new Array(3);
	board = create2DArray(9,9), highlightBoard = create2DArray(9,9),
	appState = START;
	
let skin, skinFont;

let pointer, scoreBoard,
	stats, animHolder, animQueue,
	freezeControl = false;
	
const gridLength = Math.floor(gsLength / board.length), // Gamefield
	scoreHeight = Math.floor(gsLength / pieces.length / 2);
	sidebarLength = Math.floor((canvasLength - (3*margin + scoreHeight)) / 3),
	sidebarBuffer = Math.floor((gsLength/pieces.length - sidebarLength)/2);
