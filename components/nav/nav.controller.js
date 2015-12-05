
"use strict";

function NavController($scope) {

    this.maximized = false;

    this.bindHandlers($scope);

};

NavController.prototype.bindHandlers = function ($scope) {
    
    var _this = this;
    var nw = require("nw.gui");
    var win = nw.Window.get();


    // --
    win.showDevTools();
    // --

    var minimize = document.getElementById("minimize");
    minimize.onclick = function () {
        win.minimize();
    };

    var maximize = document.getElementById("maximize");
    maximize.onclick = function () {
        win.maximize();
        _this.maximized = true;
        $scope.$apply();
    };

    var unmaximize = document.getElementById("unmaximize");
    unmaximize.onclick = function () {
        win.unmaximize();
        _this.maximized = false;
        $scope.$apply();
    };

    var close = document.getElementById("close");
    close.onclick = function () {
        win.close();
    };

};


kraken.controller("NavController", ["$scope", NavController]);