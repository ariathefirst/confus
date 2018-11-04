var mongoose = require("mongoose");
var feedbackSchema = new mongoose.Schema({
	videoId: String,
	confusionArray: Array
});

exports.feedbackSchema = feedbackSchema;
