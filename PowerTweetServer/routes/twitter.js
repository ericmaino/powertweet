var express = require('express');
var router = express.Router();
var Twit = require('twit');

var T = new Twit({
    consumer_key:         process.env.Twitter_Consumer_Key || 'uQ1zsyyKuoZkFKMQWHPxC9Ozq',
  	consumer_secret:      process.env.Twitter_Consumer_Secret || '0b7HQECvcohaApp7tAC03DC8s9QSZjez1vaavf9gACVlhV9hTu',
   	access_token:         process.env.Twitter_Access_Token || '1687031706-Ch229Sp86WTxrwb6IBg13NQxekhankZA1BYdM5t',
    access_token_secret:  process.env.Twitter_Access_Token_Secret || '7AZgSNsYKB6zEX8TNGPC09D7aKBwR1UTXEmxgFgXnwADs'
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
