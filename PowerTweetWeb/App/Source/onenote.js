var request = require('request');

var Onenote = {
    api: 'https://www.onenote.com/api/v1.0/pages?sectionName=pcthackfest',

    createPageWithSavedTweets: function (accessToken, callback) {
        var htmlPayload =
            "<!DOCTYPE html>" +
            "<html>" +
            "<head>" +
            "    <title>PowerTweet</title>" +
            "    <meta name=\"created\" content=\"" + dateTimeNowISO() + "\">" +
            "</head>" +
            "<body>" +
            "    <p>Tweets:</p>" +
            "    <ul id=\"tweetlist\"></ul>" +
            "</body>" +
            "</html>";
        
        this.createPage(accessToken, htmlPayload, callback);
    },

    createPage: function (accessToken, payload, callback) {
        var options = {
            url: this.api,
            headers: {'Authorization': 'Bearer ' + accessToken}
        };
        // Build simple request
        if (!multipart) {
            options.headers['Content-Type'] = 'text/html';
            options.body = payload;
        }
        var r = request.post(options, callback);
        pageId = r.id;
        console.log( r);
        
    }
}

module.exports = Onenote;