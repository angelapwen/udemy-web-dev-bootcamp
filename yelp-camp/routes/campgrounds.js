const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware");

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
router.post("/", middleware.isLoggedIn, function (req, res) {
	// Get data from form and add to campgrounds array
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = {name: name, price: price, image: image, description: desc, author: author};
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
router.get("/new", middleware.isLoggedIn, function (req, res) {
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

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
	Campground.findById(req.params.id, function(err, foundCampground) {
		res.render("campgrounds/edit", {campground: foundCampground});
	});	
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
	// Find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
		if(err) {
			res.redirect("/campgrounds");
		}
		else {
			// Redirect somewhere (show page)
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
	Campground.findByIdAndRemove(req.params.id, function(err) {
		if(err) {
			res.redirect("/campgrounds");
		}
		else {
			res.redirect("/campgrounds");
		}
	});
});

module.exports = router;
