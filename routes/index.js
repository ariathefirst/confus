var express = require('express');
var router = express.Router();
var url = require("url");

/* GET home page. */
router.get('/:vidId', function(req, res, next) {
	var vidId = url.parse(req.url).pathname;
	console.log(vidId);
	res.render('index', req.params);
});

module.exports = router;
