function printReverse(array) {
	// Loop through starting from end of array
	for (var i = array.length - 1; i >= 0; i--) {
		console.log(array[i]);
	}
}

printReverse([1,2,3,4]);
printReverse(["a","b","c"]);

function isUniform(array) {
	// Store the first item in the array
	var first = array[0];
	// Declare boolean variable flag "true"
	var uniform = true;
	// Loop through the rest of the array
	for (var i = 1; i < array.length; i++) {
		// If the first item does not match another item, change flag to false
		if (uniform === true && first !== array[i]) {
			uniform = false;
		}
	}
	return uniform;
}

console.log(isUniform([1,1,1,1]));
console.log(isUniform([2,1,1,1]));
console.log(isUniform(["a","b","c"]));
console.log(isUniform(["b","b","b"]));

function sumArray(array) {
	// Declare sum variable
	var sum = 0;
	// Loop through array and add each element to sum variable
	for (var i = 0; i < array.length; i++) {
		sum += array[i];
	}
	return sum;
}

console.log(sumArray([1,2,3]));
console.log(sumArray([10,3,10,4]));
console.log(sumArray([-5,100]));

function max(array) {
	// Declare current max variable as first element
	var currMax = array[0];
	// Loop through rest of array
	for (var i = 1; i < array.length; i++) {
		// If variable is larger than currMax, store as currMax
		if (array[i] > currMax) {
			currMax = array[i];
		}
	}
	return currMax;
}

console.log(max([1,2,3]));
console.log(max([10,3,10,4]));
console.log(max([-5,100]));