
"use strict";

function PlayerService($timeout) {

    var _player;
    var wcjs = require("wcjs-renderer");

    var service = {
        createPlayer: function (canvas, buffer) {

            if (_player)
                return _player;

            _player = wcjs.init(canvas, ["--network-caching=" + buffer]);

            // create a mutation observer
            var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    window.onresize();
                });
            });

            // observe the canvas for attribute changes (width, height)
            observer.observe(canvas, { attributes: true });

            return _player;

        },
        play: function (url) {

            //stop any existing playback
            _player.playlist.clear();
            _player.stop();

            //play url
            _player.play(url);

            //call resize event handler
            window.onresize();
        }
    };

    return service; 
}

kraken.factory('player', ["$timeout", PlayerService]);