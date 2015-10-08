(function () {
    "use strict";

    function initialize() {
        $(document).ready(function () {
            let React = require('react');
            let ReactDOM = require('react-dom');
            let PowerTweet = require('./components/powertweet.js');

            app.initialize();
            ReactDOM.render(<PowerTweet />, document.getElementById('content-main'));
        });
    }

    // Checking for Office
    if (window.external.GetContext) {
        // The initialize function must be run each time a new page is loaded
        Office.initialize = (reason) => initialize();
    } else {
        // We're probably *not* running in Office
        initialize();
    }
})();
