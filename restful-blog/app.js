const express = require("express"),
mongoose      = require("mongoose"),
bodyParser    = require("body-parser"),
app           = express();

// App configuration
mongoose.connect("mongodb://localhost:27017/restful_blog_app", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// Mongoose/model configuration
const blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});
const Blog = mongoose.model("Blog", blogSchema);

// RESTFUL ROUTES

// NEW - show form to create new campground
app.get("/", function(req, res) {
	res.redirect("/blogs");
});

app.get("/blogs", function(req, res) {
	Blog.find({}, function(err, blogs) {
		if(err) {
			console.log("ERROR");
		}
		else {
			res.render("index", {blogs: blogs});
		}
	});
	
});




// Tell Express to listen for requests (start server)
app.listen(3000, function() {
	console.log("Server has started!");
});