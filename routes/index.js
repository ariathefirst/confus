var express = require('express');
var router = express.Router();
var url = require("url");
var mongoose = require("mongoose");
var schema = require("../schema.js");

var Feedback = mongoose.model('Feedbacks', schema.feedbackSchema);

router.get('/:vidId', function(req, res, next) {
	var vidId = url.parse(req.url).pathname;
	console.log(vidId);
	res.render('vidId', req.params);
});

router.get('/:vidId/summary', function(req, res, next) {
	var videoId = req.path.split('/')[0];
	console.log(videoId);
	Feedback.find({'videoId': videoId}).exec(function(err, result) {
		if (!err) {
			console.log(result);
			let aggreagateArray = Array(result[0].length);
			aggregateArray.fill(0);
			for(let i=0;i<result.length;i++) {
				for(let j=0;j<result[i].length;j++) {
					aggregateArray[j] += result[i][j];
				}
			}
			res.render('vidSummary', {'feedbackMatrix': result, 'aggregateArray': aggregateArray});
		}
	});
});


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
