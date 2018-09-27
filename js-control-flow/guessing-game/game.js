// Create secret number
var myNum = 10;

// Ask user for guess
var userGuess = Number(prompt("Guess my number!"));

// If guess is lower than number
if (userGuess < myNum) {
	alert("Your guess is too low.");
}

// Else if guess is higher than number
else if (userGuess > myNum) {
	alert("Your guess is too high.");
}

// Else guess is correct 
else {
	alert("You guessed it!");
}