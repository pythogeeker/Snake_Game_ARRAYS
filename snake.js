
function init()
{
	var canvas =document.getElementById('mycanvas');
	W=H=canvas.width=canvas.height=1000;
	pen=canvas.getContext("2d");
	cs =66;
	game_over=false;
	score=5;
	
	//creating a image object for food
	food_img = new Image();
	food_img.src='Assets/apple.png';

	trophy = new Image();
	trophy.src='Assets/trophy.png';

	food =getRandomFood();

	snake ={
		init_len: 5,
		cells: [],
		color: "blue",
		direction: "right",

		//creating initial snake
		createSnake:function(){
			for(var i=this.init_len;i>0;i--){
				this.cells.push({x:i,y:0});
			}
		},

		drawSnake: function(){
			for(var i=0;i<this.cells.length;i++){
				pen.fillStyle = this.color;
				pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs,cs);
			//                                          to make gap between each cell 
		}
	},
		updateSnake: function(){
			//now we are making snake move so how to do that we will remove one cell from end and add one in front 
			// also we need to erase prev so in clearRect in draw()
			//check if snake has eaten the food if so then incrase length by one 
			// and generate new food object as well
			console.log("updating according to dirxn property");
			

			headX=this.cells[0].x;
			headY=this.cells[0].y;
			
			if(headX==food.x && headY==food.y){
				console.log("food is eaten");
				food=getRandomFood();
				score++;
			}
			else{
			this.cells.pop();
		    }
				
			var nextX,nextY;

			if(this.direction=="right"){
				nextX=headX+1;
				nextY=headY;
			}
			else if(this.direction=="left"){
				nextX=headX-1;
				nextY=headY;
			}
			else if(this.direction=="down"){
				nextX=headX;
				nextY=headY+1;
			}
			else{
				nextX=headX;
				nextY=headY-1;
			}
			this.cells.unshift({x:nextX,y:nextY});

			//check so that snake doesn't go out

			var lastX=Math.round(W/cs);
			var lastY=Math.round(H/cs);
			if( this.cells[0].x < 0 || this.cells[0].y < 0 || this.cells[0].x > lastX || this.cells[0].y > lastY){
				game_over = true;
			}	
			
		}	
	};
	snake.createSnake();		
	//Now adding a event listener on document object for keyboard input
	function keyPressed(e){
		if(e.key=="ArrowRight")
			snake.direction="right";
		else if(e.key=="ArrowLeft")
			snake.direction="left";
		else if(e.key=="ArrowDown")
			snake.direction="down";
		else if(e.key=="ArrowUp")
			snake.direction="up";
		console.log(snake.direction);
	}
	document.addEventListener('keydown',keyPressed);	
}

function draw(){
	pen.clearRect(0,0,W,H);
	snake.drawSnake();

	pen.drawImage(trophy,18,20,cs,cs);

	pen.fillStyle = "blue";
	pen.font ="22px Roboto";
	pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
	pen.fillText(score,50,50);
	//console.log("in draw");
	//we need to clear prev rec before drawing next
}

function update(){
	//console.log("in update");
	snake.updateSnake(); 
}

function getRandomFood(){
	var foodX =Math.round(Math.random()*(W-cs)/cs);
//rounding so that it comes in a cell       food should be in canvas margin 66px 
	var foodY=Math.round(Math.random()*(H-cs)/cs);
	
	var food = {
		x:foodX,
		y:foodY,
		color:"red",
	} 
	return food;
}

//we want it to be called again again
function gameloop(){
	if(game_over==true){
		pen.clearRect(W,H,0,0);
		alert("GAME OVER Bro");
	}
	draw();
	update();
}

init();
//To run gameloop function contionously we use a speacial function in javascript
var f=setInterval(gameloop,100);
//we take the output in var f because when the game is over wa want to stop the movement of the box