
"use strict";

function HomeController($location, $http, $timeout) {

    var _this = this;
    this.user = {};

    this.authenticate = function () {
        location.href = "https://api.twitch.tv/kraken/oauth2/authorize?response_type=token&client_id=dpns6ijfs3228myzqg1593j8p27dn8h&redirect_uri=app%3A%2F%2Fkraken%2Findex.html&scope=user_read";
    };

    this.redirect = function () {
        $timeout(function () {
            $location.path("/streams");
        }, 500);
    }

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
        $http.get("https://api.twitch.tv/kraken/user?oauth_token=" + access_token).then(function (response) {

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

}

kraken.controller('HomeController', ["$location", "$http", "$timeout", HomeController]);
