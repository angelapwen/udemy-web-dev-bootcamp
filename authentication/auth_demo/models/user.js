const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	username: String,
	password: String
});

// Add methods that come with passport local mongoose
UserSchema.plugin(passportLocalMongoose); 

module.exports = mongoose.model("User", UserSchema);