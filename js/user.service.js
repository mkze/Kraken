
"use strict";

kraken.factory('user', function () {

    var user = JSON.parse(localStorage.getItem("user"));

    var defaultUser = {
        name: '',
        access_token: '',
        watching: false,
        stream: '',
        volume: 50
    };

    return user || defaultUser;
});