let express = require("express");
let app = express();

// Tells Express to serve the contents of the public directory
app.use(express.static("public"));

// Tell server to expect ejs files so don't have to include extension
app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("home");
});

app.get("/fallinlovewith/:thing", function(req, res) {
	let thing = req.params.thing;
	res.render("love", {thingVar: thing});
});

app.get("/posts", function(req, res) {
	var posts = [
		{title: "Post 1", author: "Suzy"},
		{title: "Help me", author: "Angela"},
		{title: "Crazy title here", author: "Colt"}
	];

	res.render("posts", {posts: posts})
});


app.listen(3000, function() {
	console.log("Server is listening!");
});