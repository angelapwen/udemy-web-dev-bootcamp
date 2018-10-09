let p1Button = document.querySelector("#p1");
let p2Button = document.getElementById("p2");
let resetButton = document.getElementById("reset");
let p = document.querySelector("#p");
let p1Score = 0
let p2Score = 0;
let p1Display = document.querySelector("#p1Display");
let p2Display = document.querySelector("#p2Display");
let numInput = document.querySelector("input");
let winningScoreDisplay = document.querySelector("p span")
let gameOver = false;
let winningScore = 5;

p1Button.addEventListener("click", function() {
	if (!gameOver) {
		p1Score++;
		p1Display.textContent = p1Score;
		if (p1Score === winningScore) {
			gameOver = true;
			p1Display.classList.add("winner");
		}
	}
});

p2Button.addEventListener("click", function() {
	if (!gameOver) {
		p2Score++;
		p2Display.textContent = p2Score;
		if (p2Score === winningScore) {
			gameOver = true;
			p2Display.classList.add("winner");

		}
	}
});

resetButton.addEventListener("click", function() {
	reset();
});

numInput.addEventListener("change",function() {
	winningScoreDisplay.textContent = numInput.value
	winningScore = Number(numInput.value);
	reset();
});

function reset() {
	p1Score = p2Score = 0;
	p1Display.textContent = p2Display.textContent = 0;
	p1Display.classList.remove("winner");
	p2Display.classList.remove("winner");
	gameOver = false;
}