let express = require("express");
let app = express();
// Import body parser package to parse body into JavaScript object
let bodyParser = require("body-parser");

// Tell Express to use body parser
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

// Move friends outside routes for access
let friends = ["Julian", "Isobel", "Justine", "Elena", "Alex"];

app.get("/", function(req, res) {
	res.render("Home");
});

app.post("/addFriend", function(req, res) {
	let newFriend = req.body.newfriend;
	friends.push(newFriend); // Push new friend to end of array
	res.redirect("/friends"); // Redirect to /friends route
});

app.get("/friends", function(req, res) {
	res.render("friends", {friends: friends});
});

app.listen(3000,function(){
	console.log("Server started!");
});
