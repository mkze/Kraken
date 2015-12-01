
"use strict";

function PlayerController($scope, $mdToast, $timeout, api, player, user) {

    var _this = this;
    this.buffering = false;
    this.playing = false;
    this.fullscreen = false;
    this.$api = api;
    this.$player = player;
    this.wcjs = player.createPlayer();
    this.user = user;
    this.volume = user.volume || 50;

    this.qualities = [
        { raw: 'audio_only', view: 'Audio' },
        { raw: 'mobile', view: 'Mobile' },
        { raw: 'low', view: 'Low' },
        { raw: 'medium', view: 'Medium' },
        { raw: 'high', view: 'High' },
        { raw: 'chunked', view: 'Source' }
    ];

    this.wcjs.onOpening = function () {
        _this.buffering = true;
        $scope.$apply();
    };

    this.wcjs.onBuffering = function (percent) {
        _this.buffering = (percent < 100);
        $scope.$apply();
    };

    this.wcjs.onPlaying = function () {
        _this.buffering = false;
        _this.playing = true;
        $timeout(function () {
            _this.wcjs.volume = _this.volume;
        }, 100);
        $scope.$apply();
    };
    

};

PlayerController.prototype.togglePlayback = function () {
    this.wcjs.togglePause();
    this.playing = !this.playing;
};

PlayerController.prototype.volumeChanged = function () {
    this.wcjs.volume = this.volume;
    this.user.volume = this.volume;

    //save user object to local storage
    localStorage.setItem("user", JSON.stringify(this.user));
};

PlayerController.prototype.qualityChanged = function () {

    var _this = this;
    this.buffering = true;

    var stream = this.user.stream;
    var token_req = _this.$api.get_live_token(stream);

    token_req.then(function (response) {
        var access_token = response.data;
        var hls_req = _this.$api.get_hls_links(stream, access_token);

        hls_req.then(function (response) {
            var M3U_data = response.data;
            var url = _this.$api.parse_m3u(M3U_data, _this.user.quality);
            _this.$player.play(url);

        }, function () {
            _this.$toast.showSimple("Error retrieving stream HLS links");
        });

    }, function () {
        _this.$toast.showSimple("Error retrieving stream access token");
    });

    //save user object to local storage
    localStorage.setItem("user", JSON.stringify(this.user));
};

PlayerController.prototype.toggleFullscreen = function () {
    this.$player.toggleFullscreen();
};

kraken.controller("PlayerController",["$scope", "$mdToast", "$timeout", "api", "player", "user", PlayerController]);