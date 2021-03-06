const express = require("express");
const app = express();
const request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("search");
});

app.get("/results", function(req, res) {
	let searchTerm = req.query.search;
	request(`https://www.omdbapi.com/?s=${searchTerm}&apikey=thewdb`, function(error, response, body) {
		if(!error && response.statusCode == 200) {
			let data = JSON.parse(body);
			res.render("results", {data: data});
		}
	});
});

// Tell Express to listen for requests (start server)
app.listen(3000, function() {
	console.log("Server has started!");
});