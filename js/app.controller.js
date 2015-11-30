
"use strict";

function AppController($router, user, state, player) {

    this.$router = $router;
    this.user = user;
    this.state = state;
    this.menuOpen = false;
    this.player = player.createPlayer();
};

AppController.prototype.return = function () {
    this.state.iswatching = true;
}

AppController.prototype.redirect = function (path) {
    this.state.iswatching = false;

    this.$router.navigate(path);
    this.menuOpen = false;
};

AppController.prototype.togglePlayback = function () {

    if (this.player.playing) {
        this.player.pause();
    } else {
        this.player.play();
    }
}

AppController.$routeConfig = [
  { path: '/index.html', component: 'home' },
  { path: '/streams', component: 'streams' },
  { path: '/channels', component: 'channels' }
];

kraken.controller("AppController", ["$router", "user", "state", "player", AppController]);