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

        return (
            <div className="tweet">
                <blockquote className="twitter-tweet">
                    <div>
                        <img src={this.props.avatar} />
                        <p>{this.props.author}</p>
                        <p>@{this.props.screen_name}</p>
                    </div>
                    <p>{this.props.text}</p>
                </blockquote>
            </div>
        );
    }
});

module.exports = TweetComponent;
