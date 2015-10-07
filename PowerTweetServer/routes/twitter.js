var express = require('express');
var router = express.Router();
var Twit = require('twit');

var T = new Twit({
    consumer_key: process.env.Twitter_Consumer_Key,
    consumer_secret: process.env.Twitter_Consumer_Secret,
    access_token: process.env.Twitter_Access_Token,
    access_token_secret: process.env.Twitter_Access_Token_Secret
});

/* GET users listing. */
router.get('/', function (req, res, next) {
    var search = req.query.q;
    var token = req.query.token;
    var tweetCount = req.query.count || 10;
    
    T.get('search/tweets', { q: search, count: tweetCount }, function (err, data, response) {
        if (err) {
            res.status(500).end();
        } else {
            data.token = "1234";
            data.count = tweetCount;
            res.send(data);
        }
    });
});

module.exports = router;
