const Campground = require("../models/campground");
const Comment = require("../models/comment");

// All the middleware
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
	if (req.isAuthenticated()) {
			Campground.findById(req.params.id, function(err, foundCampground) {
				if(err) {
					req.flash("error", "Campground not found.");
					res.redirect("back");
				}
				else {
					// Does user own campground?
					console.log(foundCampground);
					if(foundCampground.author.id.equals(req.user._id)) { // Mongoose equals method
						next();
					}
					else {
						req.flash("error", "You don't have permission to do that.");
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

middlewareObj.checkCommentOwnership = function(req, res, next) {
	if (req.isAuthenticated()) {
			Comment.findById(req.params.comment_id, function(err, foundComment) {
				if(err) {
					req.flash("error", "Comment not found.");
					res.redirect("back");
				}
				else {
					console.log(foundComment);
					// Does user own comment?
					if(foundComment.author.id.equals(req.user._id)) { // Mongoose equals method
						next();
					}
					else {
						req.flash("error", "You don't have permission to do that.");
						res.redirect("back");
					}
				}
			});
		}
	// If not, redirect
	else {
		req.flash("error", "You need to be logged in to do that.");
		res.redirect("back");
	}
}

// Middleware
middlewareObj.isLoggedIn = function (req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	req.flash("error", "You need to be logged in to do that.");
	res.redirect("/login");
}


module.exports = middlewareObj;