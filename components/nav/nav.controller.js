
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
    };

    var unmaximize = document.getElementById("unmaximize");
    unmaximize.onclick = function () {
        win.unmaximize();
    };

    var close = document.getElementById("close");
    close.onclick = function () {
        win.close();
    };

    //maximize event handler
    win.on('maximize', function () {
        _this.maximized = true;
        $scope.$apply();
    });

    //unmaximize event handler
    win.on('unmaximize', function () {
        _this.maximized = false;
        $scope.$apply();
    });

};


kraken.controller("NavController", ["$scope", NavController]);