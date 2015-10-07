var React = require('react'),
    TweetComponent;

TweetComponent = React.createClass({
    getInitialState() {
        return {
            text: '',
            author: '',
            avatar: ''
        };
    },

    render() {
        let t = this.props.tweet;

        return (
            <div className="tweet">
                <blockquote className="twitter-tweet">
                    <div>
                        <img src={t.avatar} />
                        <p>{t.author}</p>
                        <p>@{t.screen_name}</p>
                    </div>
                    <p>{t.text}</p>
                </blockquote>
            </div>
        );
    }
});

module.exports = TweetComponent;
