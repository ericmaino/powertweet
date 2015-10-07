var React = require('react'),
    WelcomePage = require('./welcome.js'),
    TweetList = require('./tweetlist.js'),
    PowerTweet;

PowerTweet = React.createClass({
    getInitialState() {
        return {
            hashtag: null
        };
    },

    render: function () {
        let content;

        if (this.state.hashtag && this.state.hashtag.length > 0) {
            content = (<TweetList hashtag={this.state.hashtag} />);
        } else {
            content = (<WelcomePage getTweets={(hashtag) => this.setState({hashtag: hashtag})} />);
        }

        return (content);
    }
});

module.exports = PowerTweet;
