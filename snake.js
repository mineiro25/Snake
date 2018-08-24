const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");

let dir, score, balls, food;

//estado inicial do jogo
function init(){
	dir = 'right';
	score = 0;
	balls = [
		{x: 40, y: 40},
		{x: 60, y: 40},
		{x: 80, y: 40}

	];

	createFood();
}

//cria a comida
function createFood(){
	
	//vai gerar coordenadas aleatorias para o obejto food
	food = {
		x: Math.floor(Math.random() * 39),
		y: Math.floor(Math.random() * 39)
	};
}

//movimento da cobra
document.addEventListener('keydown', event =>{
	let key = event.keyCode;

	switch(key){
		case 37: //seta esquerda
			if(dir != 'right'){
				dir = 'left';
			}

			break;

		case 38: //seta cima
			if(dir != 'down'){
				dir = 'up';
			}
			break;

		case 39: //seta direita
			if(dir != 'left'){
				dir = 'right';
			}
			break;

		case 40: //seta baixo
			if(dir != 'up'){
				dir = 'down';
			}
			break;

		default:
			break;
	}
});


//adiciona ao fim do array um novo elemento
function add(){
	let lastBall = balls[balls.length-1];
	
	//movimento da cabeca da cobra
	if(dir == 'right'){
		balls.push({x: lastBall.x + 20, y: lastBall.y});
	}else if(dir == 'left'){
		balls.push({x: lastBall.x - 20 , y: lastBall.y});
	}else if(dir == 'up'){
		balls.push({x: lastBall.x , y: lastBall.y - 20});

	}else if(dir == 'down'){
		balls.push({x: lastBall.x , y: lastBall.y + 20});

	}

}

//distancia entre 2 pontos
function distance(x1,y1,x2,y2){

	let sum = (x2-x1)^2+(y2-y1)^2;
	let dist = Math.floor(Math.sqrt(sum));

	return dist;
}

function animation(){
	//limpa pixeis especificos da tela
	context.clearRect(0,0, 600,600);
	//pinta os pixeis de vermelho
	context.fillStyle = 'lightgreen';

	balls.shift(); //remove o primeiro elemento
	add();

	let lastBall = balls[balls.length-1];

	if(distance(lastBall.x, lastBall.y, food.x*15, food.y*15) < 5 && 
		(lastBall.x - food.x*15 < 5 || lastBall.y - food.y*15 <5)){
		createFood();
		add();

		score += 5;
	}

	//vai dar um print a cobra
	for(let i = 0; i < balls.length; i++){
		ball = balls[i];

		//caso a cobra chegue a um limite, ela recomecara no limite contrario
		if(ball.x > 580){
			ball.x = 0;
		}else if(ball.y > 580){
			ball.y = 0;
		}else if(ball.x < 20){
			ball.x = 580;
		}else if(ball.y < 20){
			ball.y = 580;
		}

		//verificar se a cobra colide consigo mesma
		if(ball.x == lastBall.x && ball.y == lastBall.y && i < balls.length-2){
			alert("game over");
			init();
		}

		context.fillRect(ball.x, ball.y, 19, 19);

	}

	context.fillStyle = 'red';
	context.fillRect(food.x *15, food.y *15 , 19, 19);

}

//vai chamar a funcao animation a cada 222ms
setInterval(animation, 222);

//update do score
function updateScore(){
	document.getElementById('score').innerText ='Score: ' + score;
}

//print das instrucoes
function instructions(){
	document.getElementById('instrucoes').innerText = 'ArrowLeft: move a cobra para a esquerda\nArrowUp: move a cobra para cima\nArrowRight: move a cobra para a direita mais depressa\nArrowDown: move a cobra para baixo';
}

init();
updateScore();
instructions();
