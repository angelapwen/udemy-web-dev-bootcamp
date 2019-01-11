var numSquares = 6;
var colors = generateRandomColors(numSquares);
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

for (let i = 0; i < modeButtons.length; i++) {
	modeButtons[i].addEventListener("click", function() {
		// Remove both selected classes, add to clicked class
		modeButtons[0].classList.remove("selected");
		modeButtons[0].classList.remove("selected");
		this.classList.add("selected");

		// How many squares to show
		if (this.textContent === "Easy") {
			numSquares = 3;
		}
		else {
			numSquares = 6;
		}

		reset();
	});
}

function reset() {	
	// Generate all new colors
	colors = generateRandomColors(numSquares);
	// Pick a new random color
	pickedColor = pickColor();
	// Change colorDisplay to match pickedColor
	colorDisplay.textContent = pickedColor;
	// Change colors of squares
	for (let i = 0; i < squares.length; i++) {
		// Add initial colors to squares
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} 
		// If there is no color, make 2nd row disappear 
		else {
			squares[i].style.display = "none";
		}
	}
	// Reset h1 background
	h1.style.background = "steelblue";
	// Change message display so it doesn't say CORRECT
	messageDisplay.textContent = " ";
	// Change PLAY AGAIN to NEW COLORS
	resetButton.textContent = "New Colors";
}

resetButton.addEventListener("click", function() {
	reset();
});

colorDisplay.textContent = pickedColor; 

for (let i = 0; i < squares.length; i++) {
	// Add initial colors to squares
	squares[i].style.backgroundColor = colors[i];

	// Add click listeners to square
	squares[i].addEventListener("click",function() {
		// Grab color of picked square
		var clickedColor = this.style.backgroundColor;
		// Compare to picked color
		if (clickedColor === pickedColor) {
			messageDisplay.textContent = "Correct!";
			changeColors(clickedColor);
			h1.style.background = clickedColor;
			resetButton.textContent = "Play Again?";
		}
		else {
			this.style.background = "#232323";
			messageDisplay.textContent = "Try Again";
		}
	});
}

function changeColors(color) {
	// Loop through all squares
	for (let i = 0; i < squares.length; i++) {
		// Change each color to match correct color
		squares[i].style.background = color;
	}
}

function pickColor() {
	// Pick a random number between 1 and max index of array
	var random = Math.floor(Math.random() * colors.length)
	// Use the number to access 
	return colors[random];
}

function generateRandomColors(num) {
	// Make an array
	let arr = [];
	// Add num random colors to array
	for (let i = 0; i < num; i++) {
		// Get random color and add to array
		arr.push(randomColor());
	}
	// Return array
	return arr;
}

function randomColor() {
	// Pick a "red" from 0 - 255
	let red = Math.floor(Math.random() * 256)
	// Pick a "green" from 0 - 255
	let green = Math.floor(Math.random() * 256)
	// Pick a "blue" from 0 - 255
	let blue = Math.floor(Math.random() * 256)
	return "rgb(" + red + ", " + green + ", " + blue + ")"
}