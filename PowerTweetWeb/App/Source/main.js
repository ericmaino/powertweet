(function () {
    "use strict";

    // The initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            let React = require('react');
            let Tweet = require('./tweet.js');

            app.initialize();

            React.render(<Tweet text="Hi!" />, document.getElementById('content-main'));
        });
    };
})();
