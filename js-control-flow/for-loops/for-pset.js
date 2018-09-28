console.log("PRINT ALL NUMBERS BETWEEN -10 AND 19");
for (var i = -10; i < 20; i++) {
	console.log(i);
}

console.log("PRINT ALL EVEN NUMBERS BETWEEN 10 AND 40");
for (var i = 10; i < 41; i++) {
	if (i % 2 === 0) {
		console.log(i);
	}
}

console.log("PRINT ALL ODD NUMBERS BETWEEN 300 AND 333");
for (var i = 300; i < 334; i++) {
	if (i % 2 === 1) {
		console.log(i);
	}
}

console.log("PRINT ALL NUMBERS DIVISIBLE BY 5 AND 3 AND BETWEEN 5 AND 50");
for (var i = 5; i < 51; i++) {
	if ((i % 5 === 0) && (i % 3) === 0) {
		console.log(i);
	}
}