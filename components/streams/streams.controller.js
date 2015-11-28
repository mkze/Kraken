
"use strict";

function StreamsController($http, api, player) {

    this.$http = $http;
    this.$api = api;
    this.$player = player;

    this.streams = {};
    this.user = {};

    this.loadStreams();
}

StreamsController.prototype.loadStreams = function () {

    var _this = this;
    _this.user = JSON.parse(localStorage.getItem("user"));

    var streams_req = _this.$api.get_streams(_this.user.access_token);
    streams_req.then(function (response) {

        _this.streams = response.data.streams;

    }, function () {
        alert("Failed to retrieve streams");
    });
}

StreamsController.prototype.watch = function (index) {

    var _this = this;
    var stream = _this.streams[index];

    var token_req = _this.$api.get_live_token(stream.channel.name);

    token_req.then(function (response) {
        var access_token = response.data;
        var hls_req = _this.$api.get_hls_links(stream.channel.name, access_token);

        hls_req.then(function (response) {
            var M3U_data = response.data;
            var url = _this.$api.parse_m3u(M3U_data, "chunked");
            _this.$player.play(url);

        }, function () {
            alert("Error retrieving stream HLS links");
        });

    }, function () {
        alert("Error retrieving stream access token");
    });

    //$http.get("https://api.twitch.tv/api/channels/" + stream.channel.name + "/access_token").then(function (response) {

    //    var token = response.data;


    //    $http.get("http://usher.twitch.tv/api/channel/hls/" + stream.channel.name + ".m3u8?allow_source=true&allow_audio_only=true&type=any&private_code=null&player=twitchweb" + "&token=" + token.token + "&sig=" + token.sig + "&p=0420420").then(function (response) {
    //        console.log(response);

    //        var m3u_data = response.data;
    //        var m3u_a = m3u_data.split("\n");
    //        console.log(m3u_a);

    //        m3u_a.forEach(function (line) {
    //            if (line.indexOf("://") != -1 && line.indexOf("chunked") != -1) {
    //                var url = line;
    //                console.log(url);

    //                var wcjs = require("wcjs-player");
    //                var player = new wcjs("#player").addPlayer({ autoplay: true });
    //                player.addPlaylist(url);
    //                console.log(player);

    //                document.getElementById("view").style.display = "none";

    //            }
    //        });

    //    }, function () {
    //        alert("error usher");
    //    });


    //}, function () {
    //    alert("error token");
    //});
}


kraken.controller('StreamsController', StreamsController);
