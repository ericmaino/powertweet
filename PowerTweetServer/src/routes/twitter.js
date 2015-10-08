var express = require('express');
var router = express.Router();
var Twit = require('twit');
var fs = require('fs');
var crypto = require('crypto');



var T = new Twit({
    consumer_key: 'uQ1zsyyKuoZkFKMQWHPxC9Ozq',
    consumer_secret: '0b7HQECvcohaApp7tAC03DC8s9QSZjez1vaavf9gACVlhV9hTu',
    access_token: ,
    access_token_secret: process.env.Twitter_Access_Token_Secret.trim()
});

function saveToken(token) {
    if (!fs.existsSync("tokens")) {
        fs.mkdirSync("tokens");
    }
    
    fs.writeFileSync("tokens\\" + token.id + ".json", JSON.stringify(token), "UTF-8", function(err) {
        console.log(err);
    });
}

function getToken(token) {
    var result = null;
    var tokenFile = "tokens\\" + token + ".json";
    
    if (fs.existsSync(tokenFile)) {
        result = JSON.parse(fs.readFileSync(tokenFile, "UTF-8"));
    }
    else {
        result = {
            id: generateToken(8)
        }
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
    return crypto.randomBytes(Math.ceil(len / 2))
        .toString('hex')// convert to hexadecimal format
        .slice(0, len);  // return required number of characters
}

function processTweets(token, data, res) {
    token.last_id = data.search_metadata.max_id;
    saveToken(token);
    data.token = token.id;
    //data = cleanTweets(data);
    res.send(data);
}

function getTweetsAsync(query, params) {
    return new Promise((resolve, reject) => {
        T.get(query, params, (err, data) => {
            if (err) {
                return reject(err);
            }
            
            return resolve(data);
        });
    });
}

/* GET users listing. */
router.get('/', async function (req, res, next) {
    var search = req.query.q;
    var token = req.query.token;
    var tweetCount = req.query.count || 10;
    
    var queryParameters = {
        q: search,
        count: tweetCount
    };
    
    var token = getToken(token);
    queryParameters.since_id = token.last_id;
    
    let tweets = await getTweetsAsync("search/tweets", queryParameters);
    processTweets(token, tweets, res);
});

module.exports = router;
