
"use strict";

function ApiService($http) {

    return {
        get_user: function(access_token) {
            return $http.get("https://api.twitch.tv/kraken/user?oauth_token=" + access_token);
        },
        get_streams: function(access_token) {
            return $http.get("https://api.twitch.tv/kraken/streams/followed?oauth_token=" + access_token);
        },
        get_live_token: function (channel) {
            return $http.get("https://api.twitch.tv/api/channels/" + channel + "/access_token");
        },
        get_hls_links: function (channel, access_token) {
            return $http.get("http://usher.twitch.tv/api/channel/hls/" + channel + ".m3u8?allow_source=true&allow_audio_only=true&type=any&private_code=null&player=twitchweb" +
                             "&token=" + access_token.token + "&sig=" + access_token.sig + "&p=00042");
        },
        parse_m3u: function (data, quality) {
            var url = "";
            var arr = data.split("\n");

            arr.forEach(function (line) {
                if (line.indexOf("://") != -1 && line.indexOf(quality) != -1) {
                    url = line;
                }
            });

            return url;
        }
    };

};

kraken.factory('api', ApiService);