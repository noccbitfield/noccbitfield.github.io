

var isMobile = false;
$(document).ready(function(){
  $("#about").css("visibility", "hidden");
  $("#projectSection").css("visibility", "visible");

  isMobile = mobileCheck();
  startField();

  if (isMobile == true){
    $("#pageTitle1").css("font-size", window.innerWidth * 0.04 + "px");
    $(".smallTitle").css("font-size", window.innerWidth * 0.02 + "px");
    $("#pageTitle2").css("font-size", window.innerWidth * 0.123 + "px");
    $("#pageTitle2").css("letter-spacing", window.innerWidth * 0.03 + "px");

    
    $("canvas").css("width", "100%");
    $("canvas").css("height",  parseInt($("canvas").css("width"),10)/6 + "px");
    $("canvas").css("left", "0");

    $(".menuOption").css("margin-left","10px");
    $(".menuOption").css("margin-right","10px");

  }


  readyGrass();


  $(".menuOption").on("click", function(){
    $(".menuOption").css("text-decoration", "");
    if (this.innerHTML != "ILLUSTS"){
      
      $(this).css("text-decoration", "underline wavy 1px");
      $(this).css("text-underline-offset", "2px");
    }
    

    if (this.innerHTML == "SOFTWARE"){
      $("#about").css("visibility", "hidden");
      $("#projectSection").css("visibility", "visible");
    } 
    else if (this.innerHTML == "ABOUT"){
      $("#about").css("visibility", "visible");
      $("#projectSection").css("visibility", "hidden");

    }
  });

  $("body").on("pointerdown", function (event){
    nudgeMyPiece(event);
  });

  $("body").on("pointerup", function(event){
    myFieldPiece.isStill = true;
    myFieldPiece.modX = 0;
  });

  var lastScrollTop = 0;
  $(window).scroll(function(event){
    var st = $(this).scrollTop();
    oldBottom = parseInt($("#grasstabSection").css("bottom"),10);
    oldCanvasBottom = parseInt($("canvas").css("bottom"),10);
    oldtabExtensionHeight = parseInt($("#tabExtension").css("height"),10);
    if (st > lastScrollTop){
      //scroll down      
      if (oldBottom < 100){
        $("#grasstabSection").css("bottom", oldBottom + 5 + "px");
        $("#canvas").css("bottom", oldCanvasBottom + 5 + "px");
        $("#tabExtension").css("height", oldtabExtensionHeight + 5 + "px");
      }     
    } else {
      // scroll up
      if (oldBottom > 20){
        $("#grasstabSection").css("bottom", oldBottom - 5 + "px");
        $("#canvas").css("bottom", oldCanvasBottom - 5 + "px");
        $("#tabExtension").css("height", oldtabExtensionHeight - 5 + "px");
      } 

    }
      
    lastScrollTop = st;
  });




	
});

function mobileCheck(){
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    return true;
  }

}

function readyGrass(){




}

function nudgeMyPiece(e){
  var x = event.clientX;
  var y = event.clientY;
  var coords = "x: " + x + " y: " + y;

  var ratio = myFieldPiece.x / 1800; //where piece is in canvas coor
  var actualPos = parseInt($("canvas").css("width"),10) * ratio; //where piece is on according to actual canvas size
  var pieceHalfSize = parseInt($("canvas").css("width"),10)/14; //to make centering more convenient 

  var myPieceCoorX = parseInt($("canvas").css("left"),10) + actualPos + pieceHalfSize;

  if ( x < myPieceCoorX){
    myFieldPiece.modX = -10;
    myFieldPiece.isStill = false;
    myFieldPiece.isRight = false;
  }
  else if (x > myPieceCoorX){
    myFieldPiece.modX = 10;
    myFieldPiece.isStill = false;
    myFieldPiece.isRight = true;
  }


}

var myFieldPiece;

function startField() {
    myFieldArea.start();
    myFieldPiece = new component(300*0.69, 300, "red", 796, 0);

    var canvas = document.getElementsByTagName("canvas");
    var string = "window w: " + window.innerWidth + " canvas w: " +  parseInt($("canvas").css("width"),10);
      $("#test").html(string);



}

var myFieldArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1800;
        this.canvas.height = 300;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        this.interval = setInterval(updateFieldArea, 30);
    },
    clear : function() {
    	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;    
    this.img = new Image();
    this.img.src = "sources/sprite.png";
    this.row = 0;
    this.column = 5;
    this.isRight = true;
    this.isStill = true;


    ctx = myFieldArea.context;
    //ctx.fillStyle = color;
    //ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(this.img, this.column*510, this.row*741, 510, 741, this.x, this.y, this.width, this.height);

    this.update = function() {
    	if (this.isStill == true){
          if (this.isRight == true){
            this.column = 5;
          } else {
            this.column = 4;
          }  
        }

        else {
          if (this.isRight == true){
            this.column = this.column + 1;
            if ( this.column > 9){
              this.column = 6;
            }
          }

          else if (this.isRight == false){
            this.column = this.column - 1;
            if (this.column < 0){
              this.column = 3;
            }

          }
        }

    	ctx.drawImage(this.img, this.column*510, this.row*741, 510, 741, this.x, this.y, this.width, this.height);
    }
    this.newPos = function(){
    	if (( this.x + this.modX) > 0 && (this.x + this.modX) < (1800-this.width)){
          this.x += this.modX;
        }
        if ((this.y + this.modY) > 0 && (this.y + this.modY) < (300-this.height)){
          this.y += this.modY;   
        }

    }
}

function updateFieldArea() {
	myFieldArea.clear();

	myFieldPiece.update();
	myFieldPiece.newPos();

}

var keys = {};
onkeydown = onkeyup = function(e){
	//e.preventDefault();
    keys[e.keyCode] = e.type == 'keydown';

    if (keys[37]){
    	myFieldPiece.modX = -10;
    	myFieldPiece.isStill = false;
    	myFieldPiece.isRight = false;
    }
    else if (keys[39]){
    	myFieldPiece.modX = 10;
    	myFieldPiece.modY = 0;
    	myFieldPiece.isStill = false;
    	myFieldPiece.isRight = true;
    }
   else {
    	myFieldPiece.modX = 0;
    	myFieldPiece.modY = 0;
    	myFieldPiece.isStill = true;
    }

}



