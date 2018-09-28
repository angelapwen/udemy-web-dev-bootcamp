var input = prompt("Are we there yet?");

while (input.indexOf("yes") === -1 && input.indexOf("yeah") === -1) {
	input = prompt("Are we there yet?");
}

alert("Yay, we finally made it!");