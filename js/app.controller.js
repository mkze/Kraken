
"use strict";

function AppController($router, user) {

    this.$router = $router;
    this.user = user;
    this.menuOpen = false;

};

AppController.prototype.redirect = function (path) {
    var _this = this;

    var video = document.getElementById("player");
    var view = document.querySelector("[ng-viewport]");

    view.hidden = false;
    video.hidden = true;

    _this.$router.navigate(path);
    _this.menuOpen = false;
};

AppController.$routeConfig = [
  { path: '/index.html', component: 'home' },
  { path: '/streams', component: 'streams' }
];

kraken.controller("AppController", ["$router", "user", AppController]);