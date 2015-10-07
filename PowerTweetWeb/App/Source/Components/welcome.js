var React = require('react'),
    WelcomeComponent;

WelcomeComponent = React.createClass({
    render: function () {
        return (
            <div>
                <div className="header">
                    <h1>PowerTweet</h1>
                </div>
                <div className="padding">
                    <span>Display a live feed of tweets about your presentation, directly in PowerPoint!</span>
                    <input type="text" className="hashtag"/>
                    <button id="getTweets" onClick={this.getTweets}>Show Live Feed</button>
                </div>
            </div>
        );
    },

    getTweets: function () {
        let hashtag = $('input.hashtag').val();

        if (hashtag && this.props.getTweets) {
            this.props.getTweets(hashtag);
        }
    }
});

module.exports = WelcomeComponent;
