var mongoose = require ("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

// Defines a pattern for our data
var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

// Compile cat schema into a model saved in Cat; "Cat" should be singular version of collection name
var Cat = mongoose.model("Cat", catSchema);

// Create a new cat
// var george = new Cat({
// 	name: "Mrs. Norris",
// 	age: 7,
// 	temperament: "Suspicious"
// });

// // Add cat to db, callback function will return when save is done
// george.save(function (err, cat) {
// 	if(err) {
// 		console.log("Something went wrong..");
// 	}
// 	else {
// 		console.log("We just saved a cat to the db:");
// 		console.log(cat);
// 	}
// });

// create method is like new and save together
Cat.create({
	name: "Snow White",
	age: 15,
	temperament: "Neutral"
}, function(err, cat) {
	if(err) {
		console.log(err);
	}
	else {
		console.log(cat);
	}
});

// Retrieve all cats from DB and console.log() each one
Cat.find({}, function(err, cats) {
	if(err) {
		console.log("Oh no, error");
		console.log(err);
	}
	else {
		console.log("ALL THE CATS:");
		console.log(cats);
	}
});