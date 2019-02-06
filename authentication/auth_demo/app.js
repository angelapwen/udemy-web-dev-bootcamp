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

app.use(require("express-session")({
	secret: "Phu Quoc Vacation",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize()); // Set passport up
app.use(passport.session());

passport.serializeUser(User.serializeUser()); // Encoding data to insert to session
passport.deserializeUser(User.deserializeUser()); // Unencoding data from session

app.get("/", function(req, res) {
	res.render("home");
});

app.get("/secret", function(req, res) {
	res.render("secret");
});


// Tell Express to listen for requests (start server)
app.listen(3000, function() {
	console.log("Server has started!");
});