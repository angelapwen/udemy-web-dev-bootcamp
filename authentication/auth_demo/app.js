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

passport.serializeUser(User.serializeUser()); // Encoding data to insert to session
passport.deserializeUser(User.deserializeUser()); // Unencoding data from session

//===========
// ROUTES
//===========


app.get("/", function(req, res) {
	res.render("home");
});

app.get("/secret", function(req, res) {
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


// Tell Express to listen for requests (start server)
app.listen(3000, function() {
	console.log("Server has started!");
});