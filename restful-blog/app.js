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

// INDEX ROUTE
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

// NEW ROUTE
app.get("/blogs/new", function(req, res) {
	res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res) {
	// Create blog
	Blog.create(req.body.blog, function(err, newBlog) {
		if(err) {
			res.render("new");
		}
		else {
			// Redirect to index
			res.redirect("/blogs");
		}
	});
});


// Tell Express to listen for requests (start server)
app.listen(3000, function() {
	console.log("Server has started!");
});