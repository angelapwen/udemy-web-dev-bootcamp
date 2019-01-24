const express = require("express"),
methodOverride = require("method-override"),
expressSanitizer = require("express-sanitizer"),
mongoose      = require("mongoose"),
bodyParser    = require("body-parser"),
app           = express();

// App configuration
mongoose.connect("mongodb://localhost:27017/restful_blog_app", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer()); // Must come after bodyParser line
app.use(methodOverride("_method"));

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
	req.body.blog.body = req.sanitize(req.body.blog.body); // Sanitize JS
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

// SHOW ROUTE
app.get("/blogs/:id", function(req,res) {
	Blog.findById(req.params.id, function(err, foundBlog) {
		if(err) {
			res.redirect("/blogs");
		}
		else {
			res.render("show", {blog: foundBlog});
		}
	});
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res) {
	Blog.findById(req.params.id, function(err, foundBlog) {
		if(err) {
			res.redirect("/blogs");
		}
		else {
			res.render("edit", {blog: foundBlog});
		}
	});
});

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res) {
	req.body.blog.body = req.sanitize(req.body.blog.body); // Sanitize JS
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
		if(err) {
			res.redirect("/blogs");
		}
		else {
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

// DELETE ROUTE
app.delete("/blogs/:id", function(req, res) {
	// Destroy blog
	Blog.findByIdAndRemove(req.params.id, function(err) {
		if(err) {
			res.redirect("/blogs");
		} 
		else {
			res.redirect("/blogs");
		}
	});
});

// Tell Express to listen for requests (start server)
app.listen(3000, function() {
	console.log("Server has started!");
});