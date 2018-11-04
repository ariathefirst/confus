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
	var videoId = req.params.vidId;
	
	console.log(videoId);
	console.log(Feedback.find({}).exec((err, result) => result));
	Feedback.find({'videoId': videoId}).exec(function(err, result) {
		if (!err) {
			if(result.length === 0) {
				res.send("No data available.");
				return;
			}
			for(let i=0;i<result.length;i++) {
				
				result[i].confusionArray = result[i].confusionArray[0].split(',');
				
				result[i].confusionArray = result[i].confusionArray.map(x => parseInt(x));
				if (i === 0) {
					var aggregateArray = Array(result[0].length);
					aggregateArray.fill(0);
				}
				console.log(`Length of agg array is ${aggregateArray.length}`);
				console.log(result[i].confusionArray);
				for(let j=0;j<result[i].confusionArray.length;j++) {
					if (j >= aggregateArray.length) {
						aggregateArray.push(0);
					}
					aggregateArray[j] += result[i].confusionArray[j];
				}
			}
			res.render('vidSummary', {'feedbackMatrix': result, 'aggregateArray': aggregateArray});
		}
	});
});


router.post('/:vidId', function(req, res, next) {
	var feedback = new Feedback({
		videoId: req.body.videoId,
		confusionArray: req.body.confusionArray,
	});
	feedback.save((err) => {if (err) console.log('ERROR ON SAVE!');});
	res.send('item saved to database!');
});

router.get('/', function(req, res, next) {
	res.render('index', req.params);
});

module.exports = router;
