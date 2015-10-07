(function () {
    "use strict";

    // The initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            let twitter = require('./twitter.es6.js');

            app.initialize();
            twitter.setupButton();
        });
    };
})();