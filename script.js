const choices = ['K', 'P', 'N'];
let userScore = 0;
let computerScore = 0;
let userChoice;
let computerChoice;
let gameHistory = [];
let choiceCount = { 'K': 0, 'P': 0, 'N': 0 };
const winningCombinations = {
	'K': 'N',
	'P': 'K',
	'N': 'P'
};

document.addEventListener('keydown', function (event) {
	if (event.key === ' ') startGame();
});

async function startGame() {
	alert("Hra začíná! Zadejte K pro Kámen, P pro Papír nebo N pro Nůžky.");
	getChoices()
	await determineWinner(userChoice, computerChoice);
	showTheWinner();
	gameHistory.push({ userChoice, computerChoice, userScore, computerScore });
}

async function determineWinner(userChoice, computerChoice) {
	if (userChoice === computerChoice) {
		alert("Je to remíza!");
		console.log("Je to remíza!");
	} else if (winningCombinations[userChoice] === computerChoice) {
		alert("Vyhráli jste!");
		console.log("Uživatel vyhrává!");
		userScore++;
		await updateScoreboard();
		await updateChoiceCount();
	} else {
		alert("Počítač vyhrává!");
		console.log("Počítač vyhrává!");
		computerScore++;
		await updateScoreboard();
		await updateChoiceCount();
	}
}

function updateScoreboard() {
	document.getElementById("userScore").textContent = `Skóre Uživatele: ${userScore}`;
	document.getElementById("computerScore").textContent = `Skóre Počítače: ${computerScore}`;
}

async function showTheWinner() {
	await updateScoreboard();
	if (userScore === 5 || computerScore === 5) {
		alert(`Konec hry! ${userScore === 5 ? 'Uživatel' : 'Počítač'} vyhrál!`);
		console.log(`Konec hry! ${userScore === 5 ? 'Uživatel' : 'Počítač'} vyhrál!`);
		console.log(gameHistory);
		restartGameVariables();
	}
}

function getChoices() {
	do {
		userChoice = prompt("Zadejte K (Kámen), P (Papír) nebo N (Nůžky):").toUpperCase().replace(/\s+/g, '');
	} while (!['K', 'P', 'N'].includes(userChoice));
	computerChoice = choices[Math.floor(Math.random() * choices.length)];
}

function updateChoiceCount() {
	choiceCount[userChoice]++;
	choiceCount[computerChoice]++;
	console.log(`Uživatel: ${userChoice}, Počítač: ${computerChoice}`);
	console.log(`K: ${choiceCount['K']}, P: ${choiceCount['P']}, N: ${choiceCount['N']}`);
}

function restartGameVariables() {
	userScore = 0;
	computerScore = 0;
	updateScoreboard();
	gameHistory = [];
	choiceCount = { 'K': 0, 'P': 0, 'N': 0 };
}