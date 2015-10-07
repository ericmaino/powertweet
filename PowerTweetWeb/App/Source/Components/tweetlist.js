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
        let tweets = this.state.tweets;
        let renderedTweets = [];

        tweets.forEach((tweet) => {
            renderedTweets.push(<Tweet tweet={tweet} />);
        });

        return (
            <div>{renderedTweets}</div>
        );
    }
});

module.exports = TweetListComponent;
