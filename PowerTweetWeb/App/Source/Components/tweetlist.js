var React = require('react'),
    Tweet = require('./tweet'),
    TweetListComponent;

TweetListComponent = React.createClass({
    getInitialState() {
        return {
            tweets: []
        };
    },

    componentDidMount() {
        var url = "https://partnercatalysthack-powertwitter.azurewebsites.net/twitter?q=" + encodeURIComponent(this.props.hashtag);
        console.log(url);

        $.ajax({
            url: url,
            dataType: 'json',
            success: function(data) {
                console.log(data);
                if (data && data.statuses) {
                    this.setState({ tweet: data.statuses });
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(url, status, err.toString());
            }.bind(this)
        });
    },

    render() {
        let tweets = require('../tweet_example.json').statuses;
        let renderedTweets = [];

        tweets.forEach((tweet) => {
            renderedTweets.push(<Tweet tweet={tweet} />);
        });

        return (
            <div className="padding">
                <div className="tweetListHeader">
                    <h1>Tweets for {this.props.hashtag}</h1>
                </div>
                <div>
                    {renderedTweets}
                </div>
            </div>
        );
    }
});

module.exports = TweetListComponent;
