let p1Button = document.querySelector("#p1");
let p2Button = document.getElementById("p2");
let p1Score = 0
let p2Score = 0;
let p1Display = document.querySelector("#p1Display");
let p2Display = document.querySelector("#p2Display");
let gameOver = false;
var winningScore = 5;

p1Button.addEventListener("click", function() {
	if (!gameOver) {
		p1Score++;
		p1Display.textContent = p1Score;
		if (p1Score === winningScore) {
		gameOver = true;
		}
	}
});

p2Button.addEventListener("click", function() {
	if (!gameOver) {
		p2Score++;
		p2Display.textContent = p2Score;
		if (p2Score === winningScore) {
		gameOver = true;
		}
	}
});

