var express = require('express');
var router = express.Router();
var Twit = require('twit')

var T = new Twit({
    consumer_key:         process.env.Twitter_Consumer_Key,
  	consumer_secret:      process.env.Twitter_Consumer_Secret,
   	access_token:         process.env.Twitter_Access_Token,
    access_token_secret:  process.env.Twitter_Access_Token_Secret
});

/* GET users listing. */
router.get('/:query', function(req, res, next) {
	var consumer_key = req.query.consumerKey;
	var consumer_secret = req.query.consumerSecret;
	var access_token = req.query.accessToken;
	var access_token_secret = req.query.accessTokenSecret;

	T.get('search/tweets', { q: req.params.query, count: 100 }, function(err, data, response) {
	  res.send(data);
	});
});

module.exports = router;
