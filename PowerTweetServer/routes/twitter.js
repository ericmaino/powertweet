var express = require('express');
var router = express.Router();
var Twit = require('twit')

/* GET users listing. */
router.get('/:query', function(req, res, next) {
	var consumer_key = req.query.consumerKey;
	var consumer_secret = req.query.consumerSecret;
	var access_token = req.query.accessToken;
	var access_token_secret = req.query.accessTokenSecret;

	var T = new Twit({
		consumer_key:     		consumer_key,
		consumer_secret:  		consumer_secret,    
		access_token:       	access_token,
		access_token_secret:  	access_token_secret,
	});


	T.get('search/tweets', { q: req.params.query, count: 100 }, function(err, data, response) {
	  res.send(data);
	});
});

module.exports = router;
