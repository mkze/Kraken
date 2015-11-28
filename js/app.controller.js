
"use strict";

function AppController($router) {

    var _this = this;
    this.user = JSON.parse(localStorage.getItem("user"));
    this.menuOpen = false;

    this.redirect = function (path) {
        $router.navigate(path);
        _this.menuOpen = false;
    }

};

AppController.$routeConfig = [
  { path: '/index.html', component: 'home' }
];

kraken.controller("AppController", ["$router", AppController]);