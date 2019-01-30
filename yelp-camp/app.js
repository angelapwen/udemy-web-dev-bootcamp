const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Campground = require("./models/campground");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

Campground.create(
	{
		name: "Granite Hill", 
		image: "https://farm4.staticflickr.com/3911/14707566622_af236f9b65.jpg",
		description: "This is a new campground, no bathrooms yet but is beautiful."
	}, function(err, campground) {
		if(err) {
			console.log(err);
		}
		else {
			console.log("Newly created campground: ");
			console.log(campground);
		}
	});

app.get("/", function(req, res) {
	res.render("landing");
});

// INDEX ROUTE - show all routes
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

// CREATE ROUTE - add new campground 
app.post("/campgrounds", function (req, res) {
	// Get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc};
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

// NEW - show form to create new campground
app.get("/campgrounds/new", function (req, res) {
	res.render("new");
});

// SHOW - show smore info about one campground 
app.get("/campgrounds/:id", function(req, res) {
	// Find campground with provided ID
	Campground.findById(req.params.id, function(err, foundCampground) {
		if(err) {
			console.log(err);
		}
		else {
			// Render show template 
			res.render("show", {campground: foundCampground});
		}
	});	
});

// Tell Express to listen for requests (start server)
app.listen(3000, function() {
	console.log("YelpCamp Server has started!");
});