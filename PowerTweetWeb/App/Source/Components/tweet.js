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
                <h2>{this.props.author}</h2>
                <p>{this.props.text}</p>
            </div>
        );
    }
});

module.exports = TweetComponent;
