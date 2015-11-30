
"use strict";

function PlayerService(state) {

    var wcjs = require("wcjs-renderer");
    var container = document.getElementById("player");
    var canvasParent = document.getElementById("center");
    var canvas = document.getElementById("canvas");

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
            
            // set state
            state.isplaying = true;

            //call resize event handler
            window.onresize();
        }
    }
}

kraken.factory('player', ['state', PlayerService]);