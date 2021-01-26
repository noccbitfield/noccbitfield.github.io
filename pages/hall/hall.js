var myGamePiece;

function startGame() {
    myGamePiece = new component(30, 30, "red", 10, 120);
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 900;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        //updateGameArea();
        this.interval = setInterval(updateGameArea, 15);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.modX = 0;
    this.modY = 0;
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.modX;
        this.y += this.modY;        
    }    
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.newPos();    
    myGamePiece.update();
}



var keys = {}; 
onkeydown = onkeyup = function(e){
    keys[e.keyCode] = e.type == 'keydown';

	if (keys[37]){
		//left
		myGamePiece.modX = -1;
		myGamePiece.modY = 0;
	}
	else if (keys[38]){
		//down
		myGamePiece.modY = -1;
		myGamePiece.modX = 0;
	}
	else if (keys[39]){
		//right
		myGamePiece.modX = 1;
		myGamePiece.modY = 0;
	}
	else if (keys[40]){
		//up
		myGamePiece.modY = 1;
		myGamePiece.modX = 0;
	} else {
		myGamePiece.modX = 0;
		myGamePiece.modY = 0;
	}
}


