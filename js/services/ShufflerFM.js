'use strict';

var config = require('../config');
var request = require('superagent');

var BASE_URL = 'https://api.shuffler.fm/v2';
var APP_KEY = config.shufflerfm.appKey;

var ShufflerFM = exports;

var _cachedTracks;

ShufflerFM.getPopularTracks = function (callback) {
    if (_cachedTracks) {
        return callback(_cachedTracks);
    }

    request.get(BASE_URL+'/charts/popular')
        .query({'app-key': APP_KEY})
        .end(function (res) {
            _cachedTracks = res.body;
            callback(_cachedTracks||[]);
        });
};

ShufflerFM.getTrackById = function (trackId, callback) {
    if (_cachedTracks) {
        var track = _cachedTracks.find(function (track) {
            return track.id === parseInt(trackId, 10);
        });
        return callback(track);
    }
    request.get(BASE_URL+'/tracks/'+trackId)
        .query({'app-key': APP_KEY})
        .end(function (res) {
            callback(res.body);
        });
};
