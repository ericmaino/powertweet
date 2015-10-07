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
            <div className="expansion-container js-expansion-container">
                <div className="tweetcard">
                    <div className="content clearfix">
                        <div className="permalink-header">
                            <a className="account-group">
                                <img alt="" className="avatar" src={t.user.profile_image_url_https} />
                                <strong className="fullname">{t.user.name}</strong>
                                <span className="username"><span>@</span><b>{t.user.screen_name}</b></span>
                            </a>
                        </div>
                    </div>

                    <p className="tweet-text">{t.text}</p>
                </div>
            </div>
        );
    }
});

module.exports = TweetComponent;
