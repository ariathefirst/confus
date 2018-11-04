var express = require('express');
var router = express.Router();
var url = require("url");
var mongoose = require("mongoose");
var schema = require("../schema.js");

router.get('/:vidId', function(req, res, next) {
	var vidId = url.parse(req.url).pathname;
	console.log(vidId);
	res.render('vidId', req.params);
});

var Feedback = mongoose.model('Feedbacks', schema.feedbackSchema);

router.post('/:vidId', function(req, res, next) {
	console.log(req);
	var feedback = new Feedback({
		videoId: req.body.videoId,
		confusionArray: req.body.confusionArray,
	});
	feedback.save()
		.then(item => {res.send("item saved to database");})
});

router.get('/', function(req, res, next) {
	res.render('index', req.params);
});

module.exports = router;
