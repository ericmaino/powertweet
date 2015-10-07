(function () {
    "use strict";

    // The initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            let ReactDOM = require('react-dom');
            let React = require('react');
            let Tweet = require('./Components/tweet.js');

            app.initialize();

            ReactDOM.render(<Tweet hashtag="#mspowertweet" />, document.getElementById('react-container'));
        });
    };
})();
