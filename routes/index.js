var express = require('express');
var router = express.Router();
var url = require("url");

/* GET home page. */
router.get('/:vidId', function(req, res, next) {
	var vidId = req.params.vidId;
	console.log(vidId);
	res.render('vidId', req.params);
});

router.get('/', function(req, res, next) {
	res.render('index', req.params);
});
router.post('/', function(req,res,next) { //add auth
	return res.redirect('/videolist');
});

// router.get('/videolist', function(req,res,next) {
// 	const { Client } = require('pg');

// 	const client = new Client({
//   	connectionString: process.env.DATABASE_URL,
//   	ssl: true,
// 	});

// 	client.connect();

// 	client.query('SELECT * FROM feedback;', (err, res) => {
// 		console.log('HELP');
//   	if (err) throw err;
//   	for (let row of res.rows) {
//     	res.send(JSON.stringify(row));
//   	}
//   	client.end();
// 	});
// 	res.render('videolist', req.params);

// });

router.post('/videolist', function(req,res,next) {
});

module.exports = router;
