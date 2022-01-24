let order = [];
let clickedOrder = [];
let score = 0;
let lostGameAudio = new Audio("./assets/sounds/negative_beeps-6008.mp3");
let nextLeveAudio = new Audio("./assets/sounds/level-win-6416.mp3");

// POSIÇÕES
// 0 - green 
// 1 - red
// 2 - yellow
// 3 - blue

const green = document.querySelector('.green');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const blue = document.querySelector('.blue');

// Gera ordem aleatória de cores
let shuffleOrder = () => {

	let colorOrder = Math.floor(Math.random() * 4);

	order[order.length] = colorOrder;

	clickedOrder = [];

	for(let i in order) {
		let elementColor = createColorElement(order[i]);
		lightColor(elementColor, Number(i)+1);
	}

}

// Acende as cores
let lightColor = (element, number) => {

	number = number * 500;

	setTimeout(() => {
		element.classList.add('selected');
	}, number - 250);

	setTimeout(() => {
		element.classList.remove('selected');
	}, number + 200);
}

// Verifica se os botoes clicados sao os mesmos gerados
let checkOrder = () => {

	for(let i in clickedOrder) {
		if(clickedOrder[i] != order[i]) {
			gameOver();
			break;
		}
	}

	if(clickedOrder.length == order.length) {
		nextLeveAudio.play();
		alert(`Pontuação: ${score}\n Você acertou! Iniciando próximo nível...`)
		nextLevel();
	}
}

// Clique do usuario
let click = (color) => {

	clickedOrder[clickedOrder.length] = color;
	createColorElement(color).classList.add('selected');

	setTimeout(() => {
		createColorElement(color).classList.remove('selected');
		checkOrder();
	}, 250)
}


let createColorElement = (color) => {
	if(color == 0) {
		return green;
	} else if (color == 1) {
		return red;
	} else if (color == 2) {
		return yellow;
	} else if (color == 3) {
		return blue;
	}
}


let nextLevel = () => {
    score++;
    shuffleOrder();
}


let gameOver = () => {
	lostGameAudio.play();
    alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
    order = [];
    clickedOrder = [];

    playGame();
}


let playGame = () => {
    alert('Bem vindo ao Gênesis! Iniciando novo jogo!');
    score = 0;

    nextLevel();
}

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);


playGame();