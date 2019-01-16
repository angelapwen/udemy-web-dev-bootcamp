const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("landing");
});

app.get("/campgrounds", function(req, res) {
	// Define array of campground objects
	let campgrounds = [
		{name: "Salmon Creek", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
		{name: "Granite Hill", image: "https://farm4.staticflickr.com/3911/14707566622_af236f9b65.jpg"},
		{name: "Mountain Goat's Rest", image: "https://farm3.staticflickr.com/2931/14128269785_f27fb630f3.jpg"}
	];

	res.render("campgrounds", {campgrounds: campgrounds});
});



// Tell Express to listen for requests (start server)
app.listen(3000, function() {
	console.log("YelpCamp Server has started!");
});