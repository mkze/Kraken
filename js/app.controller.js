
"use strict";

function AppController($location, user) {
    this.$location = $location;
    this.user = user;
    this.menuOpen = false;
};

AppController.prototype.return = function () {
    this.user.watching = true;
}

AppController.prototype.redirect = function (path) {
    this.user.watching = false;
    this.$location.path(path);
    this.menuOpen = false;
};

AppController.$routeConfig = [
  { path: '/main.html', component: 'home' },
  { path: '/streams', component: 'streams' },
  { path: '/channels', component: 'channels' },
  { path: '/games', component: 'games' }
];


kraken.controller("AppController", ["$location", "user", AppController]);