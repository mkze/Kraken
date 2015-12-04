
"use strict";

function PlayerController($scope, $mdToast, $timeout, api, player, user) {

    var _this = this;
    this.buffering = false;
    this.playing = false;
    this.fullscreen = false;
    this.quality = user.quality;
    this.$api = api;
    this.$player = player;
    this.$timeout = $timeout;

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

    this.createPlayer($scope);
};

PlayerController.prototype.createPlayer = function ($scope) {

    var _this = this;
    var toolbarPromise;

    this.wcjs = this.$player.createPlayer(canvas);

    //video events
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
        _this.$timeout(function () {
            _this.wcjs.volume = _this.volume;
        }, 10);
        $scope.$apply();
    };

    // window resized event handler
    window.onresize = function () {

        var destAspect = container.clientWidth / container.clientHeight;
        var sourceAspect = canvas.width / canvas.height;

        if (destAspect > sourceAspect) {
            canvasParent.style.height = "100%";
            canvasParent.style.width = (((container.clientHeight * sourceAspect) / container.clientWidth) * 100) + "%";
        } else {
            canvasParent.style.height = (((container.clientWidth / sourceAspect) / container.clientHeight) * 100) + "%";
            canvasParent.style.width = "100%";
        }

    };

    // toolbar show/hide handler on player mouse move
    container.onmousemove = function () {

        //clear previous timeout
        _this.$timeout.cancel(toolbarPromise);

        //show toolbar
        playertoolbar.style.opacity = 1;

        //set timeout to hide toolbar again
        toolbarPromise = _this.$timeout(function () {
            playertoolbar.style.opacity = 0;
        }, 1500);
    };

    //fullscreen on double click
    canvasParent.ondblclick = function () {
        _this.toggleFullscreen();
        $scope.$apply();
    };

};

PlayerController.prototype.togglePlayback = function () {
    this.wcjs.togglePause();
    this.playing = !this.playing;
};

PlayerController.prototype.toggleMute = function () {
    if (this.playing) {
        this.wcjs.toggleMute();
        if (this.wcjs.mute) {
            this.volume = 0;
        } else {
            this.volume = this.user.volume;
        }
    }
};

PlayerController.prototype.volumeChanged = function () {

    //unmute if muted
    if (this.wcjs.mute)
        this.wcjs.toggleMute();

    //set volume to slider value
    this.wcjs.volume = this.volume;
    this.user.volume = this.volume;

    //unfocus the volume slider
    volumeslider.blur();

    //save user object to local storage
    localStorage.setItem("user", JSON.stringify(this.user));
};

PlayerController.prototype.qualityChanged = function () {

    if (this.quality == this.user.quality)
        return;

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
            _this.quality = _this.user.quality;
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

    if (document.webkitCurrentFullScreenElement) {
        container.classList.remove("player-fullscreen");
        document.webkitCancelFullScreen();
        window.onresize();
    } else {
        container.classList.add("player-fullscreen");
        container.webkitRequestFullScreen();
        window.onresize();
    }

    this.fullscreen = !this.fullscreen;
};

kraken.controller("PlayerController", ["$scope", "$mdToast", "$timeout", "api", "player", "user", PlayerController]);