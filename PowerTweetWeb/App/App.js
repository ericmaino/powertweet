/* Common app functionality */

var app = (function () {
    "use strict";

    var app = {};

    Date.prototype.yyyymmdd = function () {
        var yyyy = this.getFullYear().toString();
        var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
        var dd = this.getDate().toString();
        return yyyy + (mm[1] ? mm : "0" + mm[0]) + (dd[1] ? dd : "0" + dd[0]); // padding
    };

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    }

    app.getHashTag = function () {
        var documentUrlSplitted = Office.context.document.url.split('\\');
        var nameIndex = documentUrlSplitted.length - 1;
        var name = documentUrlSplitted[nameIndex];
        var prefixIndex = name.lastIndexOf(".");
        if (prefixIndex > 0)
            name = name.substring(0, prefixIndex);
        var d = new Date();
        return '#' + toTitleCase(name).replace(/ /g, '') + d.yyyymmdd();
    };

    // Common initialization function (to be called from each page)
    app.initialize = function () {
        $('body').append(
            '<div id="notification-message">' +
                '<div class="padding">' +
                    '<div id="notification-message-close"></div>' +
                    '<div id="notification-message-header"></div>' +
                    '<div id="notification-message-body"></div>' +
                '</div>' +
            '</div>');

        $('#notification-message-close').click(function () {
            $('#notification-message').hide();
        });


        // After initialization, expose a common notification function
        app.showNotification = function (header, text) {
            $('#notification-message-header').text(header);
            $('#notification-message-body').text(text);
            $('#notification-message').slideDown('fast');
        };
    };

    return app;
})();
