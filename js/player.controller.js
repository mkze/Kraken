

function PlayerController($scope, $timeout, player, user) {

    var _this = this;
    this.buffering = false;
    this.playing = false;
    this.user = user;
    this.volume = user.volume || 50;
    this.wcjs = {};

    this.wcjs = player.createPlayer();

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
};

kraken.controller("PlayerController",["$scope", "$timeout", "player", "user", PlayerController]);