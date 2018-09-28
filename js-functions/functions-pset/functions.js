function isEven(number) {
	// Return true if even
	if (number % 2 === 0) {
		return true;
	}
	// Else return false
	else {
		return false;
	}
}

// Test 
console.log(isEven(4));
console.log(isEven(11));

function factorial(number) {
	// Define a variable to count up from
	var start = 1;
	// For as many integers up to number, multiply start
	for (var i = 2; i <= number; i++) {
		start *= i;
	}
	return start;
}

console.log(factorial(10));
console.log(factorial(1));


// Using recursion
function recursiveFactorial(number) {
	if (number === 1) {
		return number;
	}
	else {
		return number * recursiveFactorial(number - 1);
	}	
}

console.log(recursiveFactorial(10));

function kebabToSnake(string) {
	// Use str.replace method
	var newString = string.replace(/-/g,"_");
	return newString;
}

console.log(kebabToSnake("i-am-a-kebab"));