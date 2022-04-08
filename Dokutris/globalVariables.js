const ERROR = -1, START = 0, OA_STATS = 0.1, PLAYING = 1, CONT_POPUP = 2, FINISH_POP = 3.1, SHOW_ENDSTATS = 3.2; // FOR GAME STATES

const fr = 60;

const canvasLength = Math.min(window.innerWidth, window.innerHeight), //  Changeable
    margin = 20, sbMargin = 5,
	gsLength = Math.floor(canvasLength-2*margin),
	numPieces = 26;

// Game states
let pieces = new Array(3), redPiece = new Array(3), highlightPiece = new Array(3),
	board = create2DArray(9,9), highlightBoard = create2DArray(9,9),
	appState = START;
	
let cache,
	skin, skinState = 1, skinFont,
	mainBag = new Array(numPieces), miniBag = new Array(numPieces),
	touchControl = {tolerance: fr/20, current: 0, isStarted: false},
	pointer, scoreBoard,
	stats, overallStats,
	animHolder, animQueue,
	freezeControl = false;
	
const gridLength = Math.floor(gsLength / board.length), // Gamefield
	scoreHeight = Math.floor(gsLength / pieces.length / 2),
	sidebarLength = Math.floor((canvasLength - (3*margin + scoreHeight)) / 3),
	sidebarBuffer = Math.floor((gsLength/pieces.length - sidebarLength)/2);
