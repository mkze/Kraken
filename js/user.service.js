
"use strict";

kraken.factory('user', function () {
    var user = JSON.parse(localStorage.getItem("user"));
    return user;
});