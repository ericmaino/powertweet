var React = require('react'),
    TweetComponent;

TweetComponent = React.createClass({
    getInitialState() {
        return {
            tweets: "", 
        };
    },

    componentDidMount() {
        var url = "http://partnercatalysthack-powertwitter.azurewebsites.net/twitter/" + encodeURIComponent(this.props.hashtag);
        console.log(url);

        $.get(url, function(result) {
            console.log(result);
            if (this.isMounted()) {
                this.setState({
                    tweets: result
                });
            }
        }).fail(function(error) {
            console.log(error);
        }).bind(this);
    },

    render() {
        var tweets = this.state.tweets;

        return (
            <span>{tweets}</span>
        );
    }
});

module.exports = TweetComponent;
