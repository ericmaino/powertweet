var React = require('react'),
    WelcomeComponent;

WelcomeComponent = React.createClass({
    render: function () {
        return (
            <div className="ms-Dialog ms-Dialog--lgHeader welcome">
                <div className="ms-Overlay"></div>
                <div className="ms-Dialog-main">
                    <div className="ms-Dialog-header">
                        <p className="ms-Dialog-title">PowerTweet</p>
                    </div>
                    <div className="ms-Dialog-inner">
                        <div className="ms-Dialog-content">
                            <p className="ms-Dialog-subText">Display a live feed of tweets about your presentation, directly in PowerPoint or Word!</p>
                            <div className="ms-TextField">
                                <label className="ms-Label">Search Term</label>
                                <input placeholder="Hashtag, Username, etc" className="ms-TextField-field hashtag" />
                            </div>
                        </div>
                        <div className="ms-Dialog-actions">
                            <div className="ms-Dialog-actionsRight">
                                <button className="ms-Dialog-action ms-Button ms-Button--primary">
                                    <span onClick={this.getTweets} className="ms-Button-label">Show Livefeed</span>
                                </button>
                                <button className="ms-Dialog-action ms-Button">
                                    <span onClick={this.displayOptions} className="ms-Button-label">Advanced Options</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },

    getTweets: function () {
        let hashtag = $('input.hashtag').val();

        if (hashtag && this.props.getTweets) {
            this.props.getTweets(hashtag);
        }
    },

    displayOptions: function () {
        console.log('hi!');
    }
});

module.exports = WelcomeComponent;
