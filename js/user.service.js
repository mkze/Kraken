
"use strict";

kraken.factory('user', function () {
    this.user = JSON.parse(localStorage.getItem("user"));
    return this.user;
});