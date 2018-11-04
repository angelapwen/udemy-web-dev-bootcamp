let express = require("express");
let app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("Home");
});

app.get("/friends", function(req, res) {
	let friends = ["Julian", "Isobel", "Justine", "Elena", "Alex"];
	res.render("friends", {friends: friends});
});

app.post("/addFriend", function(req, res) {
	res.send("You have reached the post route");
});

app.listen(3000,function(){
	console.log("Server started!");
});
