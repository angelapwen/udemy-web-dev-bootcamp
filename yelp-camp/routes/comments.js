const express = require("express");
const router = express.Router({mergeParams: true}); //merge campground and comments params together
const Campground = require("../models/campground");
const Comment = require("../models/comment");

// Comments - new
router.get("/new", isLoggedIn, function(req, res) {
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

// Comments - create
router.post("/", isLoggedIn, function(req, res) {
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
					// Add username and id to comment
					comment.author.id = req.user._ud;
					comment.author.username = req.user.username;
					// Save comment
					comment.save();
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

// Middleware
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

module.exports = router;