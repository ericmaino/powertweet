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
            success: (data) => {
                console.log(data);
                if (data && data.statuses) {
                    this.setState({ tweet: data.statuses });
                }
            },
            error: (xhr, status, err) => {
                console.error(url, status, err.toString());
            }
        });
    },

    render () {
        let tweets = this.state.tweet || [];
        let renderedTweets = [];

        for (let i = 0; i < tweets.length; i = i + 1) {
            renderedTweets.push(<Tweet tweet={tweets[i]} />);
        }

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
