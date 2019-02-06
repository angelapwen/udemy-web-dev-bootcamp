const express = require("express"),
      mongoose = require("mongoose"),
      passport = require("passport"),
      bodyParser = require("body-parser"),
      LocalStrategy = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose"),
      User = require("./models/user");
mongoose.connect("mongodb://localhost:27017/auth_demo_app", {useNewUrlParser: true});

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
	secret: "Phu Quoc Vacation",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize()); // Set passport up
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser()); // Encoding data to insert to session
passport.deserializeUser(User.deserializeUser()); // Unencoding data from session

//===========
// ROUTES
//===========


app.get("/", function(req, res) {
	res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res) {
	res.render("secret");
});

// Auth routes

// Show sign-up form
app.get("/register", function(req,res) {
	res.render("register");
});

// Handle user sign-up
app.post("/register", function(req,res) {
	User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
		if(err) {
			console.log(err);
			return res.render('register');
		}
		else {
			// Log user in
			passport.authenticate("local")(req, res, function() {
				// Redirect
				res.redirect("/secret");
			});
		}
	});
});

// LOGIN ROUTES

// Render login form
app.get("/login", function(req, res) {
	res.render("login");
});

// Login logic
app.post("/login",passport.authenticate("local", {
	successRedirect: "/secret", // If works, redirect to /secret
	failureRedirect: "/login" // Else redirect to /login
}),function(req, res) {
});

app.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/");
});

// Define middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()) {
		return next();
	}
	else {
		res.redirect("/login");
	}
};

// Tell Express to listen for requests (start server)
app.listen(3000, function() {
	console.log("Server has started!");
});