const express = require("express");
const app = express();
const request = require("request");

app.get("/results", function(req, res) {
	request("https://www.omdbapi.com/?s=california&apikey=thewdb", function(error, response, body) {
		if(!error && response.statusCode == 200) {
			let results = JSON.parse(body);
			res.send(results["Search"][0]["Title"]);
		}
	});
});

// Tell Express to listen for requests (start server)
app.listen(3000, function() {
	console.log("Server has started!");
});