
"use strict";

var kraken = angular.module('kraken', ['ngMaterial', 'ngNewRouter']);

kraken.config(function ($locationProvider) {

    var nw = require("nw.gui");

    //allow app:// protocol redirect from twitch auth endpoint
    nw.App.addOriginAccessWhitelistEntry("https://api.twitch.tv", "app", "kraken", true);

    //enable html5 mode routing
    $locationProvider.html5Mode(true);
});
