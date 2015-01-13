'use strict';

var load = require('load-script');
var request = require('superagent');
var Waveform = require('waveform.js');
var config = require('../config');

var CLIENT_ID = config.soundcloud.clientID;
var BASE_URL = 'http://api.soundcloud.com';
var SDK_URL = 'http://connect.soundcloud.com/sdk.js';

var SoundCloud = exports;

var _SC; // shared instance

SoundCloud.init = function (callback) {
    load(SDK_URL, function (err) {
        if (err) {
            console.error(err);
            throw new Error('SoundCloud cannot be initialized!');
        }
        _SC = window.SC;
        _SC.initialize({client_id: CLIENT_ID});
    });
};

SoundCloud.sharedInstance = function () {
    return _SC;
};

SoundCloud.createWaveform = function (options) {
    options = options || {};

    _SC.get('/tracks/'+options.trackId, function (track) {
        var waveform = new Waveform({
            container: options.element,
            innerColor: '#333'
        });

        waveform.dataFromSoundCloudTrack(track);

        var streamOptions = waveform.optionsForSyncedStream();
        _SC.stream(track.uri, streamOptions, function (stream) {
            stream.play();
        });
    });
};

SoundCloud.generateWaveform = function (options) {
    request.get(BASE_URL+'/tracks/'+options.trackId)
        .query({'client_id': CLIENT_ID})
        .end(function (res) {
            var track = res.body;

            var waveform = new Waveform({
                container: options.el,
                innerColor: '#333',
                height: 50
            });

            // magic due to lack of High DPI Canvas support
            // https://github.com/soundcloud/waveformjs/pull/22
            var ctx = waveform.ctx;
            var devicePixelRatio = window.devicePixelRatio || 1;
            var backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                                    ctx.mozBackingStorePixelRatio ||
                                    ctx.msBackingStorePixelRatio ||
                                    ctx.oBackingStorePixelRatio ||
                                    ctx.backingStorePixelRatio || 1;
            var ratio = devicePixelRatio / backingStoreRatio;
            if (devicePixelRatio !== backingStoreRatio) {
                var canvas = waveform.canvas;
                canvas.width  = ratio * waveform.width;
                canvas.height = ratio * waveform.height;
                canvas.style.width  = waveform.width+'px';
                canvas.style.height = waveform.height+'px';
                ctx.scale(ratio, ratio);
            }

            waveform.dataFromSoundCloudTrack(track);
            // var streamOptions = waveform.optionsForSyncedStream();
            // _SC.stream(track.uri, streamOptions, function (stream) {
            //     stream.play();
            // });
        });
};


