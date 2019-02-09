const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");

// INDEX ROUTE - show all routes
router.get("/", function(req, res) {
	// Get all campgrounds from database
	Campground.find({}, function(err, allCampgrounds) {
		if(err) {
			console.log("ERROR");
		}
		else {
			res.render("campgrounds/campgrounds", {campgrounds: allCampgrounds});
		}
	});
});

// CREATE ROUTE - add new campground 
router.post("/", function (req, res) {
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
router.get("/new", function (req, res) {
	res.render("campgrounds/new");
});

// SHOW - show smore info about one campground 
router.get("/:id", function(req, res) {
	// Find campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
		if(err) {
			console.log(err);
		}
		else {
			console.log(foundCampground);
			// Render show template 
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});	
});

module.exports = router;
