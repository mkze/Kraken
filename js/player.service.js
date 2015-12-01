
"use strict";

function PlayerService($timeout) {

    var wcjs = require("wcjs-renderer");
    var container = document.getElementById("player");
    var canvasParent = document.getElementById("center");
    var canvas = document.getElementById("canvas");
    var toolbar = document.getElementById("playertoolbar");
    var toolbarPromise = null;

    return {
        createPlayer: function() {

            if (global.player)
                return global.player;

            var player = wcjs.init(canvas);

            // window resized event handler
            window.onresize = function () {

                var destAspect = container.clientWidth / container.clientHeight;
                var sourceAspect = canvas.width / canvas.height;

                if (destAspect > sourceAspect) {
                    canvasParent.style.height = "100%";
                    canvasParent.style.width = (((container.clientHeight * sourceAspect) / container.clientWidth) * 100) + "%";
                } else {
                    canvasParent.style.height = (((container.clientWidth / sourceAspect) / container.clientHeight) * 100) + "%";
                    canvasParent.style.width = "100%";
                }

            };

            // toolbar show/hide handler on player mouse move
            container.onmousemove = function () {
                
                //clear previous timeout
                $timeout.cancel(toolbarPromise);

                //show toolbar
                toolbar.style.opacity = 1;

                //set timeout to hide toolbar again
                toolbarPromise = $timeout(function () {
                    toolbar.style.opacity = 0;
                },1500);
            };

            // create a mutation observer
            var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    window.onresize();
                });
            });

            // observe the canvas for attribute changes (width, height)
            observer.observe(canvas, { attributes: true });

            // set the created player as a property in the global object
            global.player = player;
            
            return player;
            
        },
        play: function (url) {

            //retrieve player object
            var player = global.player;

            //stop any existing playback
            player.playlist.clear();
            player.stop();

            //play url
            player.play(url);

            //call resize event handler
            window.onresize();
        }
    }
}

kraken.factory('player', ["$timeout", PlayerService]);