let express = require("express");
let app = express();

// "/" => "Hi there, welcome to my assignment!"
app.get("/", function(req, res) {
	res.send("Hi there, welcome to my assignment!");
});

// "/speak/pig" => "The pig says 'Oink'""
// "/speak/cow" => "The cow says 'Moo'"
// "/speak/dog" => "The dog says 'Woof Woof!'"
// Two more animals

app.get("/speak/:animal", function(req, res) {
	let animal = req.params.animal.toLowerCase();

	// Create dictionary mapping animals to sounds
	let sounds = {
		pig: "Oink",
		cow: "Moo",
		dog: "Woof Woof!",
		duck: "Quaaack",
		cricket: "Chirp"
	}

	let sound = sounds[animal];
	res.send("The " + animal + " says '" + sound + "'");
});

// "/repeat/hello/3" => "hello hello hello"
// "/repeat/hello/5" => "hello hello hello hello hello"
// "/repeat/blah/2" => "blah blah"
app.get("/repeat/:word/:number", function(req, res) {
	let word = req.params.word;
	let number = req.params.number;
	// Change number from string to number type
	number = Number(number);
	// Loop to build a string to print
	let printString = "";
	for (i = 0; i < number; i++) {
		printString += (" " + word);
	}
	res.send(printString);
});

// Any other route => "Sorry, page not found...What are you doing with your life?"
app.get("*", function(req, res) {
	res.send("Sorry, page not found...What are you doing with your life?")
});

// Tell Express to listen for requests (start server)
app.listen(3000, function() {
	console.log("Server has started!");
});
