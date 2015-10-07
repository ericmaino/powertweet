function setupButton() {
    var Twitter = require('twitter');

    $('#getTweets').click(() => {
        console.log('hi!');

        let client = new Twitter({
            consumer_key: 'uQ1zsyyKuoZkFKMQWHPxC9Ozq',
            consumer_secret: '0b7HQECvcohaApp7tAC03DC8s9QSZjez1vaavf9gACVlhV9hTu'
        });

        client.get('search/tweets', { q: 'Microsoft' }, function (error, tweets, response) {
            console.log(tweets);
        });
    });
}

module.exports = {
    setupButton: setupButton
}