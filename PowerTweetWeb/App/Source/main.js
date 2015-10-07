(function () {
    "use strict";

    // The initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            let ReactDOM = require('react-dom');
            let React = require('react');
            let PowerTweet = require('./components/powertweet.js');

            app.initialize();
            ReactDOM.render(<PowerTweet />, document.getElementById('content-main'));
        });
    };
})();
