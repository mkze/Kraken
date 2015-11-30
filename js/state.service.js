
"use strict";

kraken.factory('state', function () {

    var state = {
        stream: '',
        iswatching: false,
        isplaying: false,
        volume: 100
    };

    return state;
});