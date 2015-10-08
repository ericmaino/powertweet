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

function getSafeSearch(search) {
    var base64 = new Buffer(search).toString('base64');
    return base64.substring(0, base64.length - 2);
}

function mkDir(dir) {
    console.log("mkDir");
    var result = "";
    var x = dir.split("\\");

    for (var d in x) {
        if (result.length > 0) {
            result = result + "\\";
        }

        result += x[d];

        console.log(result);
        if (!fs.existsSync(result)) {
            fs.mkdirSync(result);
        }
    }
}

function getTokenPath(search, id) {
    console.log("getTokenPath");
    return "tokens\\" + getSafeSearch(search) + "\\" + id;
}

function saveToken(token) {
    console.log("saveToken");
    var basePath = getTokenPath(token.search, token.id);
    mkDir(basePath);
    fs.writeFileSync(basePath + "\\token.json", JSON.stringify(token), "UTF-8", function (err) {
        console.log(err);
    });
}

function getToken(token, search) {
    console.log("getToken");
    var result = null;
    var tokenPath = getTokenPath(search, token) + "\\token.json";

    if (fs.existsSync(tokenPath)) {
        result = JSON.parse(fs.readFileSync(tokenPath, "UTF-8"));
    } else {
        result = {
            id: generateToken(8),
            search: search
        };
    }

    return result;
}

function cleanTweets(twitterResponse) {
    console.log("cleanTweets");
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
    console.log('Processing tweets');
    token.last_id = data.search_metadata.max_id;
    saveToken(token);
    data.token = token.id;
    data = cleanTweets(data);
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
                token = getToken(token, search);

                queryParameters.since_id = token.last_id;

                context$1$0.prev = 6;
                context$1$0.next = 9;
                return regeneratorRuntime.awrap(getTweetsAsync("search/tweets", queryParameters));

            case 9:
                tweets = context$1$0.sent;

                processTweets(token, tweets, res);
                context$1$0.next = 17;
                break;

            case 13:
                context$1$0.prev = 13;
                context$1$0.t0 = context$1$0['catch'](6);

                console.log(context$1$0.t0);
                res.status(500).send({ error: context$1$0.t0 });

            case 17:
            case 'end':
                return context$1$0.stop();
        }
    }, null, this, [[6, 13]]);
});

module.exports = router;