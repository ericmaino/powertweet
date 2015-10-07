var React = require('react'),
    Tweet = require('./tweet'),
    SetIntervalMixin = require('./../Mixin/setinterval'),
    TweetListComponent;

TweetListComponent = React.createClass({
    mixins: [SetIntervalMixin], 

    getInitialState() {
        return {
            twitterUrl: '',
            tweets: []
        };
    },

    componentDidMount() {
        this.setState({
            twitterUrl: "https://partnercatalysthack-powertwitter.azurewebsites.net/twitter?q=" + encodeURIComponent(this.props.hashtag)
        }, function() {
            this.setInterval(this._getTweets, 1000);
        });
    },

    _getTweets() {
        $.ajax({
            url: this.state.twitterUrl,
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
        })
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
