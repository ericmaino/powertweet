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
        let url = "http://partnercatalysthack-powertwitter.azurewebsites.net/twitter/" + encodeURIComponent(this.props.hashtag);

        $.get(url, (result) => {
            if (this.isMounted()) {
                this.setState({
                    tweets: result
                });
            }
        }).fail((error) => {
            console.log(error);
        });
    },

    render() {
        let tweets = this.state.tweets;
        let renderedTweets = [];

        tweets.forEach((tweet) => {
            renderedTweets.push(<Tweet text={tweet.text}
                                       author={tweet.user.screen_name}
                                       avatar={tweet.user.profile_image_url_https}
                                       timestamp={tweet.created_at} />);
        });

        return (
            <div>{renderedTweets}</div>
        );
    }
});

module.exports = TweetListComponent;
