const ERROR = -1, START = 0, PLAYING = 1, FINISH = 2, ANIMATING = 3; // FOR GAME STATES

let anims = [];

let arr = [0,1,2,3,4,5], appState = START, fr = 10;

const canvasLength = Math.min(window.innerWidth, window.innerHeight), //  Changeable
    margin = 20, sbMargin = 5,
	gsLength = Math.floor(canvasLength-2*margin);