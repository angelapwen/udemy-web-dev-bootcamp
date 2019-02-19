const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

router.get("/", function(req, res) {
	res.render("landing");
});

// Show register form
router.get("/register", function(req, res) {
	res.render("register");
});

// Handle sign up logic
router.post("/register", function(req, res) {
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user) {
		if(err) {
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		});
	});
});

// Show log in form
router.get("/login", function(req, res) {
	res.render("login", {message: req.flash("error")});
});
// Handle log-in logic
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login" 
	}), function(req, res) {

});

// Add logout route
router.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/campgrounds");
});

// Middleware
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

module.exports = router;
