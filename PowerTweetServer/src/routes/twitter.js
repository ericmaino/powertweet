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
    }
    else {
        result = {
            id: generateToken(8),
            search: search
        }
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
    return crypto.randomBytes(Math.ceil(len / 2))
        .toString('hex')// convert to hexadecimal format
        .slice(0, len);  // return required number of characters
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
    
    var token = getToken(token, search);
    queryParameters.since_id = token.last_id;
    
    try {
        let tweets = await getTweetsAsync("search/tweets", queryParameters);
        processTweets(token, tweets, res);
    } catch (e) {
        console.log(e);
        res.status(500).send({ error: e });
    }


});

module.exports = router;
