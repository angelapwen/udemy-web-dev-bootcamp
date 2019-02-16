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
					comment.author.id = req.user._id;
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

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", checkCommentOwnership, function(req, res) {
	Comment.findById(req.params.comment_id, function(err, foundComment) {
		if(err) {
			res.redirect("back");
		}
		else {
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
		}
	});
	
});

// COMMENT UPDATE ROUTE
router.put("/:comment_id", checkCommentOwnership, function(req, res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
		if(err) {
			res.redirect("back");
		}
		else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// COMMENTS DESTROY ROUTE
router.delete("/:comment_id", checkCommentOwnership, function(req, res) {
	Comment.findByIdAndRemove(req.params.comment_id, function(err) {
		if(err) {
			res.redirect("back");
		}
		else {
			res.redirect("/campgrounds/" + req.params.id);
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


function checkCommentOwnership(req, res, next) {
	if (req.isAuthenticated()) {
			Comment.findById(req.params.comment_id, function(err, foundComment) {
				if(err) {
					res.redirect("back");
				}
				else {
					console.log(foundComment);
					// Does user own comment?
					if(foundComment.author.id.equals(req.user._id)) { // Mongoose equals method
						next();
					}
					else {
						res.redirect("back");
					}
				}
			});
		}
	// If not, redirect
	else {
		console.log("You need to be logged in to do that!");
		res.redirect("back");
	}
}

module.exports = router;
