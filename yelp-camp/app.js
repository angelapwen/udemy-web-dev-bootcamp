const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

// Compile into model
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{
// 		name: "Granite Hill", 
// 		image: "https://farm4.staticflickr.com/3911/14707566622_af236f9b65.jpg"
// 	}, function(err, campground) {
// 		if(err) {
// 			console.log(err);
// 		}
// 		else {
// 			console.log("Newly created campground: ");
// 			console.log(campground);
// 		}
// 	});

app.get("/", function(req, res) {
	res.render("landing");
});

app.get("/campgrounds", function(req, res) {
	// Get all campgrounds from database
	Campground.find({}, function(err, allCampgrounds) {
		if(err) {
			console.log("ERROR");
		}
		else {
			res.render("campgrounds", {campgrounds: allCampgrounds});
		}
	});
});

app.post("/campgrounds", function (req, res) {
	// Get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	// Create new campground and save to database
	Campground.create(newCampground, function(err, newlyCreatedCampground) {
		if(err) {
			console.log(err);
		}
		else {
			// Redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	})
});

app.get("/campgrounds/new", function (req, res) {
	res.render("new");
});

// Tell Express to listen for requests (start server)
app.listen(3000, function() {
	console.log("YelpCamp Server has started!");
});