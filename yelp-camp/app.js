const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const seedDB = require("./seeds");


mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

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
			res.render("campgrounds/campgrounds", {campgrounds: allCampgrounds});
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
	res.render("campgrounds/new");
});

// SHOW - show smore info about one campground 
app.get("/campgrounds/:id", function(req, res) {
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

// ============================
// COMMENTS ROUTES
// ============================
app.get("/campgrounds/:id/comments/new", function(req, res) {
	// Find campground by ID
	Campground.findById(req.params.id, function(err, campground) {
		if(err) {
			console.log(err);
		}
		else {
			res.render("comments/new", {campground: campground});
		}
	})
});

app.post("/campgrounds/:id/comments", function(req, res) {
	// Look up campground using ID
	Campground.findById(req.params.id, function(err, campground) {
		if(err) {
			console.log(err);
			res.redirect("/campgrounds");
		}
		else {
			// Create new comment
			Comment.create(req.body.comment, function(err, comment) {
				if(err) {
					console.log(err);
				}
				else {
					// Connect new comment to campground
					campground.comments.push(comment);
					campground.save(); 
					// Redirect campground to show page
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

// Tell Express to listen for requests (start server)
app.listen(3000, function() {
	console.log("YelpCamp Server has started!");
});