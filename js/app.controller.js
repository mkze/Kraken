
"use strict";

function AppController($router, user) {
    this.$router = $router;
    this.user = user;
    this.menuOpen = false;
};

AppController.prototype.return = function () {
    this.user.watching = true;
}

AppController.prototype.redirect = function (path) {
    this.user.watching = false;
    this.$router.navigate(path);
    this.menuOpen = false;
};

AppController.$routeConfig = [
  { path: '/main.html', component: 'home' },
  { path: '/streams', component: 'streams' },
  { path: '/channels', component: 'channels' }
];


kraken.controller("AppController", ["$router", "user", AppController]);