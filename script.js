const choices = ['K', 'P', 'N']
const userScoreCounter = document.getElementById("userScore")
const computerScoreCounter = document.getElementById("computerScore")
const outcomes = {
	'draw': (userChoice, computerChoice) => userChoice === computerChoice,
	'userWins': (userChoice, computerChoice) => winningCombinations[userChoice] === computerChoice,
	'computerWins': (userChoice, computerChoice) => winningCombinations[userChoice] !== computerChoice
}
const winningCombinations = {
	'K': 'N',
	'P': 'K',
	'N': 'P'
};
let userScore = 0
let computerScore = 0
let userChoice
let computerChoice
let gameHistory = []
let choiceCount = { 'K': 0, 'P': 0, 'N': 0 }

document.addEventListener('keydown', function (event) {
	if (event.key === ' ') startGame()
});

function startGame() {
	alert("Hra začíná! Zadejte K pro Kámen, P pro Papír nebo N pro Nůžky.")
	getChoices()
	determineWinner()
	gameHistory.push({ userChoice, computerChoice, userScore, computerScore })
}

function determineWinner() {
	let outcome = outCome(userChoice, computerChoice)
	switch (outcome) {
		case 'draw':
			alert("Je to remíza!")
			console.log("Je to remíza!")
			break;
		case 'userWins':
			alert("Vyhráli jste!")
			console.log("Uživatel vyhrává!")
			userScore++;
			break;
		case 'computerWins':
			alert("Počítač vyhrává!")
			console.log("Počítač vyhrává!")
			computerScore++
			break;
	}
	updateScoreboard()
	updateChoiceCount()
	if (userScore === 5 || computerScore === 5) {
		setTimeout(showTheWinner, 100);
	}
}

function updateScoreboard() {
	userScoreCounter.textContent = `Skóre Uživatele: ${userScore}`
	computerScoreCounter.textContent = `Skóre Počítače: ${computerScore}`
}

async function showTheWinner() {
	await updateScoreboard()
	alert(`Konec hry! ${userScore === 5 ? 'Uživatel' : 'Počítač'} vyhrál!`)
	console.log(`Konec hry! ${userScore === 5 ? 'Uživatel' : 'Počítač'} vyhrál!`)
	console.log(gameHistory)
	restartGameVariables()
}

function getChoices() {
	do {
		let input = prompt("Zadejte K (Kámen), P (Papír) nebo N (Nůžky):");
		userChoice = input ? input.toUpperCase().replace(/\s+/g, '') : null;
	} while (!['K', 'P', 'N'].includes(userChoice))
	computerChoice = choices[Math.floor(Math.random() * choices.length)]
}

function updateChoiceCount() {
	choiceCount[userChoice]++
	choiceCount[computerChoice]++
	console.log(`Uživatel: ${userChoice}, Počítač: ${computerChoice}`)
	console.log(`K: ${choiceCount['K']}, P: ${choiceCount['P']}, N: ${choiceCount['N']}`)
}

function restartGameVariables() {
	userScore = 0
	computerScore = 0
	updateScoreboard()
	gameHistory = []
	choiceCount = { 'K': 0, 'P': 0, 'N': 0 }
}

function outCome(userChoice, computerChoice) {
	return Object.keys(outcomes).find(outcome => outcomes[outcome](userChoice, computerChoice))
}