
"use strict";

function AppController($router) {

    this.$router = $router;

    this.user = JSON.parse(localStorage.getItem("user"));
    this.menuOpen = false;

};

AppController.prototype.redirect = function (path) {
    var _this = this;
    _this.$router.navigate(path);
    _this.menuOpen = false;
};

AppController.$routeConfig = [
  { path: '/index.html', component: 'home' },
  { path: '/streams', component: 'streams' }
];

kraken.controller("AppController", ["$router", AppController]);