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
router.get('/:query', function (req, res, next) {
    T.get('search/tweets', { q: req.params.query, count: 100 }, function (err, data, response) {
        if (err) {
            res.status(500).end();
        } else {
            res.send(data);
        }
    });
});

module.exports = router;
