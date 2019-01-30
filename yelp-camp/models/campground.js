const mongoose = require("mongoose");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

// Compile into model
module.exports = mongoose.model("Campground", campgroundSchema);