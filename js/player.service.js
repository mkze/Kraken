
"use strict";

function PlayerService() {
    return {
        createPlayer: function() {
            var wcjs = require("wcjs-player");
            var player = new wcjs("#player").addPlayer({ autoplay: true });
            global.player = player;
        },
        play: function (url) {

            var video = document.getElementById("player");
            video.hidden = false;

            var player = global.player;
            if (player.playing())
                player.clearPlaylist();

            player.addPlaylist(url);
            player.play();
        }
    }
}

kraken.factory('player', PlayerService);