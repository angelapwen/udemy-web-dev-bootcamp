var colors = [
	"rgb(255, 0, 0)",
	"rgb(255, 255, 0)",
	"rgb(0, 255, 0)",
	"rgb(0, 255, 255)",
	"rgb(0, 0, 255)",
	"rgb(255, 0, 255)",
];

var squares = document.querySelectorAll(".square");
var pickedColor = randomColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");

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

function randomColor() {
	// Pick a random number between 1 and max index of array
	var random = Math.floor(Math.random() * colors.length)
	// Use the number to access 
	return colors[random];
}