
"use strict";

function PlayerService() {
    return {
        createPlayer: function() {
            var wcjs = require("wcjs-player");
            var player = new wcjs("#player").addPlayer({ autoplay: true });
            global.player = player;
        },
        play: function (url) {

            var player = global.player;
            var video = document.getElementById("player");
            var view = document.querySelector("[ng-viewport]");

            if (player.playing())
                player.clearPlaylist();

            player.addPlaylist(url);
            player.play();

            view.hidden = true;
            video.hidden = false;
        }
    }
}

kraken.factory('player', PlayerService);