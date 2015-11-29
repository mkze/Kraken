
"use strict";

function AppController($router, user) {

    this.$router = $router;
    this.user = user;
    this.menuOpen = false;

};

AppController.prototype.return = function () {
    var video = document.getElementById("player");
    var view = document.querySelector("[ng-viewport]");
    var returnButton = document.getElementById("return");

    view.hidden = true;
    video.hidden = false;
    returnButton.hidden = true;
}

AppController.prototype.redirect = function (path) {

    var video = document.getElementById("player");
    var view = document.querySelector("[ng-viewport]");
    var returnButton = document.getElementById("return");

    view.hidden = false;
    video.hidden = true;
    returnButton.hidden = false;

    this.$router.navigate(path);
    this.menuOpen = false;
};

AppController.$routeConfig = [
  { path: '/index.html', component: 'home' },
  { path: '/streams', component: 'streams' }
];

kraken.controller("AppController", ["$router", "user", AppController]);