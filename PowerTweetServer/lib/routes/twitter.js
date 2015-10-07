'use strict';

var express = require('express');
var router = express.Router();
var Twit = require('twit');
var fs = require('fs');
var crypto = require('crypto');

var T = new Twit({
    consumer_key: process.env.Twitter_Consumer_Key.trim(),
    consumer_secret: process.env.Twitter_Consumer_Secret.trim(),
    access_token: process.env.Twitter_Access_Token.trim(),
    access_token_secret: process.env.Twitter_Access_Token_Secret.trim()
});

function saveToken(token) {
    if (!fs.existsSync("tokens")) {
        fs.mkdirSync("tokens");
    }

    fs.writeFileSync("tokens\\" + token.id + ".json", JSON.stringify(token), "UTF-8");
}

function getToken(token) {
    var result = null;
    var tokenFile = "tokens\\" + token + ".json";

    if (fs.existsSync(tokenFile)) {
        result = JSON.parse(fs.readFileSync(tokenFile, "UTF-8"));
    } else {
        result = {
            id: generateToken(8)
        };
    }

    return result;
}

function cleanTweets(twitterResponse) {
    var origin = twitterResponse.statuses;
    var cleaned = [];

    for (var s in origin) {
        s = origin[s];
        var tweet = {};
        tweet.text = s.text;
        tweet.screen_name = s.user.screen_name;
        cleaned.push(tweet);
    }

    twitterResponse.statuses = cleaned;
    return twitterResponse;
}

function generateToken(len) {
    return crypto.randomBytes(Math.ceil(len / 2)).toString('hex') // convert to hexadecimal format
    .slice(0, len); // return required number of characters
}

function processTweets(token, data, res) {
    token.last_id = data.search_metadata.max_id;
    saveToken(token);
    data.token = token.id;
    //data = cleanTweets(data);
    res.send(data);
}

function getTweetsAsync(query, params) {
    return new Promise(function (resolve, reject) {
        T.get(query, params, function (err, data) {
            if (err) {
                return reject(err);
            }

            return resolve(data);
        });
    });
}

/* GET users listing. */
router.get('/', function callee$0$0(req, res, next) {
    var search, token, tweetCount, queryParameters, tweets;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                search = req.query.q;
                token = req.query.token;
                tweetCount = req.query.count || 10;
                queryParameters = {
                    q: search,
                    count: tweetCount
                };
                token = getToken(token);

                queryParameters.since_id = token.last_id;

                context$1$0.next = 8;
                return regeneratorRuntime.awrap(getTweetsAsync("search/tweets", queryParameters));

            case 8:
                tweets = context$1$0.sent;

                processTweets(token, tweets, res);

            case 10:
            case 'end':
                return context$1$0.stop();
        }
    }, null, this);
});

module.exports = router;