const express = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/auth_demo_app", {useNewUrlParser: true});

const app = express();
app.set('view engine', 'ejs');

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