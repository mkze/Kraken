
"use strict";

function HomeController($location, $http, $timeout, api, player) {

    this.$location = $location;
    this.$http = $http;
    this.$timeout = $timeout;
    this.$api = api;
    this.$player = player;

    this.user = {};

    this.checkAuth();
}

HomeController.prototype.authenticate = function () {
    location.href = "https://api.twitch.tv/kraken/oauth2/authorize?response_type=token&client_id=dpns6ijfs3228myzqg1593j8p27dn8h&redirect_uri=app%3A%2F%2Fkraken%2Findex.html&scope=user_read";
};

HomeController.prototype.redirect = function () {
    var _this = this;

    //create player before redirecting
    _this.$player.createPlayer();

    //redirect after 500ms
    _this.$timeout(function () {
        _this.$location.path("/streams");
    }, 500);
}

HomeController.prototype.checkAuth = function () {

    var _this = this;
    this.user = JSON.parse(localStorage.getItem("user"));

    if (this.user) {

        //already authenticated, redirect to streams
        this.redirect();

    } else if (location.hash) {

        //hash access token set from twitch auth redirect
        var hash = location.hash;
        var hashes = hash.split("&");
        var raw_token = hashes[0].split("=");
        var access_token = raw_token[1];

        //retrieve the user's data
        var user_req = _this.$api.get_user(access_token);
        user_req.then(function (response) {

            //get user data from response
            _this.user = response.data;

            //add access token property
            _this.user.access_token = access_token;

            //save user object to local storage
            localStorage.setItem("user", JSON.stringify(_this.user));

            //redirect to streams
            _this.redirect();

        }, function (error) {
            alert("Failed to retrieve user object");
        });

    }
};

kraken.controller('HomeController', HomeController);
