
"use strict";

function HomeController($location, $http, $timeout, $mdToast, api, user) {

    this.$location = $location;
    this.$http = $http;
    this.$timeout = $timeout;
    this.$toast = $mdToast;

    this.api = api;
    this.user = user;

    this.checkAuth();
}

HomeController.prototype.authenticate = function () {
    location.href = "https://api.twitch.tv/kraken/oauth2/authorize?response_type=token&client_id=dpns6ijfs3228myzqg1593j8p27dn8h&redirect_uri=app%3A%2F%2Fkraken%2Fmain.html&scope=user_read";
};

HomeController.prototype.redirect = function () {
    var _this = this;

    //redirect after 500ms
    this.$timeout(function () {
        _this.$location.path("/streams");
    }, 500);
}

HomeController.prototype.checkAuth = function () {

    var _this = this;

    if (this.user.access_token) {

        //already authenticated, redirect to streams
        this.user.stream = '';
        this.user.watching = false;
        this.redirect();

    } else if (location.hash) {

        //hash access token set from twitch auth redirect
        var hash = location.hash;
        var hashes = hash.split("&");
        var raw_token = hashes[0].split("=");
        var access_token = raw_token[1];

        //retrieve the user's data
        var user_req = this.api.get_user(access_token);
        user_req.then(function (response) {

            //indicate success
            _this.$toast.showSimple("Successfully Authenticated");

            //get user data from response
            var user_data = response.data;
            _this.user.name = user_data.display_name;
            _this.user.access_token = access_token;
            _this.user.watching = false;

            //save user object to local storage
            localStorage.setItem("user", JSON.stringify(_this.user));

            //redirect to streams
            _this.redirect();

        }, function (error) {
            _this.$toast.showSimple("Failed to retrieve user object");
        });

    }
};

kraken.controller('HomeController', HomeController);
