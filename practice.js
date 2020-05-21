//suppose there is event some happens someone clicks on canvas or on webpage 
// so we create a event listner which will trigger some fucntion

function f(){
	console.log("you clicked on a document");
}
document.addEventListener('click',f);
                         //when click call function f

                         console.log("in init");
	var canvas = document.getElementById('mycanvas');
	W=canvas.width = 500;
	H=canvas.height= 500;
	game_over=false;
	pen=canvas.getContext('2d');
	

	rect={
		x:20,
		y:20,
		w:40,
		h:40,
		speed: 10,
		}
		
	
}

function draw(){
	//snake.drawSnake();
	//console.log("in draw");
	//we need to clear prev rec before drawing next
	pen.clearRect(0,0,W,H);
	pen.fillRect(rect.x,rect.y,rect.w,rect.h);
	pen.fillStyle="red";
}
function update(){
	//console.log("in update");
	//condition so that box remains within boundary
	if(rect.x>W-rect.w||rect.x<0)
		rect.speed*=-1;
	rect.x+=rect.speed;
}
//we want it to be called again again
function gameloop(){
	//this condition is basically for stopping the game loop
	if(game_over==true)
		clearInterval(f);
	
	draw();
	update();
}
init();
gameloop();
//To run gameloop function contionously we use a speacial function in javascript
var f=setInterval(gameloop,100);
//we take the output in var f because when the game is over wa want to stop the movement of the box