var numSquares = 6;
var colors = generateRandomColors(numSquares);
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");

easyBtn.addEventListener("click", function () {
	easyBtn.classList.add("selected");
	hardBtn.classList.remove("selected");
	numSquares = 3;
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	// Loop through all six squares, fill in top 3 with colors and remove bottom 3 display
	for (let i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.background = colors[i];
		}
		else {
			squares[i].style.display = "none";
		}
	}
});

hardBtn.addEventListener("click", function () {
	easyBtn.classList.remove("selected");
	hardBtn.classList.add("selected");
	numSquares = 6;
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	// Loop through all six squares, fill all with color and make all block
	for (let i = 0; i < squares.length; i++) {
		squares[i].style.background = colors[i];
		squares[i].style.display = "block";
	}
});

resetButton.addEventListener("click", function() {
	// Generate all new colors
	colors = generateRandomColors(numSquares);
	// Pick a new random color
	pickedColor = pickColor();
	// Change colorDisplay to match pickedColor
	colorDisplay.textContent = pickedColor;
	// Change colors of squares
	for (let i = 0; i < squares.length; i++) {
	// Add initial colors to squares
		squares[i].style.backgroundColor = colors[i];
	}
	// Reset h1 background
	h1.style.background = "#232323";
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