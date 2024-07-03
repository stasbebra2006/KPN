let userScore = 0;
let computerScore = 0;
let gameHistory = [];
let choiceCount = { 'K': 0, 'P': 0, 'N': 0 };
const winningCombinations = {
	'K': 'N',
	'P': 'K',
	'N': 'P'
};

function startGame() {
	alert("Hra začíná! Zadejte K pro Kámen, P pro Papír nebo N pro Nůžky.");
	const userChoice = prompt("Zadejte K (Kámen), P (Papír) nebo N (Nůžky):").toUpperCase();
	const choices = ['K', 'P', 'N'];
	const computerChoice = choices[Math.floor(Math.random() * choices.length)];
	choiceCount[userChoice]++;
	choiceCount[computerChoice]++;
	console.log(`Uživatel: ${userChoice}, Počítač: ${computerChoice}`);
	determineWinner(userChoice, computerChoice);
	updateScoreboard();
	gameHistory.push({ userChoice, computerChoice, userScore, computerScore });
}

function determineWinner(userChoice, computerChoice) {
	if (userChoice === computerChoice) {
		alert("Je to remíza!");
		console.log("Je to remíza!");
	} else if (winningCombinations[userChoice] === computerChoice) {
		alert("Vyhráli jste!");
		console.log("Uživatel vyhrává!");
		userScore++;
	} else {
		alert("Počítač vyhrává!");
		console.log("Počítač vyhrává!");
		computerScore++;
	}
}

function updateScoreboard() {
	document.getElementById("userScore").textContent = `Skóre Uživatele: ${userScore}`;
	document.getElementById("computerScore").textContent = `Skóre Počítače: ${computerScore}`;
	console.log(`K: ${choiceCount['K']}, P: ${choiceCount['P']}, N: ${choiceCount['N']}`);
}