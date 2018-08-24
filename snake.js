const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");

let dir, balls, food, flag=false;
let stop = setInterval(animation, 222);

let scoreProperties = {
	score: 0,
	foodCount: 0
};


//estado inicial do jogo
function init(){
	dir = 'right';
	balls = [
		{x: 40, y: 40},
		{x: 60, y: 40},
		{x: 80, y: 40}

	];

	//quando o jogo for reiniciado o score sera reposto como 0
	scoreProperties.score = 0;
	flag = false;
	createFood();
}


//update do score
function updateScore(){
	document.getElementById('score').innerText ='Score: ' + scoreProperties.score;
}

//print das instrucoes
function instructions(){
	document.getElementById('instrucoes').innerText = 'ArrowLeft: move a cobra para a esquerda\nArrowUp: move a cobra para cima\nArrowRight: move a cobra para a direita mais depressa\nArrowDown: move a cobra para baixo';
}


//cria a comida
function createFood(){
	
	//vai gerar coordenadas aleatorias para o obejto food
	food = {
		x: Math.floor(Math.random() * 39),
		y: Math.floor(Math.random() * 24)
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
		

		case 32: //barra de espaco
			init();
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

//Para o jogo e aparece um texto com score e instrucoes para reniciar o jogo
function stopTime(flag){
	if(flag){	
		//limpa pixeis especificos da tela
		context.clearRect(0,0, 888,555);
		context.font = "50px Arial"; //define o tamanho e font do texto
		context.fillStyle = 'white'; //cor do texto
		context.textAlign = "center"; //alinhamento do texto
		context.fillText("GAME OVER", 400, 200);
		context.fillText("press space to restart", canvas.width/2, canvas.height/2);
		context.fillText("Score: " + scoreProperties.score , 400, 300);


		clearInterval(stop);
		stop =0; //atribui se o valor de 0 a stop para se entrar no estado de pausa

		if(stop == 0){
			//restart jogo
			document.addEventListener('keydown', event =>{
				let key = event.keyCode;
					if(key == 32){
						stop = setInterval(animation, 222);
						init();
					}
			});
		}
	}
}

function animation(){
	//limpa pixeis especificos da tela
	context.clearRect(0,0, 888,555);
	//pinta os pixeis de vermelho
	context.fillStyle = 'lightgreen';

	balls.shift(); //remove o primeiro elemento
	add();

	let lastBall = balls[balls.length-1];

	//comer
	if(lastBall.x == food.x*20 && lastBall.y == food.y*20){
		scoreProperties.foodCount++;
		scoreProperties.score += 5 * balls.length * scoreProperties.foodCount;

		updateScore();
		createFood();
		add();
	}

	//vai dar um print a cobra
	for(let i = 0; i < balls.length; i++){
		ball = balls[i];

		//caso a cobra chegue a um limite, ela recomecara no limite contrario
		if(ball.x > 780){
			ball.x = 0;
		}else if(ball.y > 480){
			ball.y = 0;
		}else if(ball.x < 0){
			ball.x = 780;
		}else if(ball.y < 0){
			ball.y = 480;
		}

		//verificar se a cobra colide consigo mesma
		if(ball.x == lastBall.x && ball.y == lastBall.y && i < balls.length-2){		
			flag = true;
			stopTime(flag);		
		}

		context.fillRect(ball.x, ball.y, 19, 19);

	}

	context.fillStyle = 'red';
	context.fillRect(food.x *20, food.y *20 , 19, 19);

}

updateScore();
instructions();

init();

