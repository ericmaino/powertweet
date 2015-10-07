var React = require('react'),
    TweetComponent;

TweetComponent = React.createClass({
    render: function () {
        return (
            <span>{this.props.text}</span>
        );
    }
});

module.exports = TweetComponent;
