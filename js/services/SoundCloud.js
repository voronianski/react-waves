'use strict';

var inherits = require('util').inherits;
var SoundCloudAudio = require('soundcloud-audio');
var Waveform = require('waveform.js');
var request = require('superagent');

var _instance;

function SoundCloud (clientId) {
    SoundCloudAudio.call(this, clientId);
}

inherits(SoundCloud, SoundCloudAudio);

// for future versions this needs to be investigated
// in order to add SoundCloud-like pretty waveforms
SoundCloud.prototype.resolveWaveform = function (opts, callback) {
    request.get(this._baseUrl+'/tracks/'+opts.trackId)
        .query({'client_id': this._clientId})
        .end(function (res) {
            var track = res.body;

            var waveform = new Waveform({
                container: opts.container,
                innerColor: 'rgba(255,255,255,.8)',
                height: 80
            });

            // magic due to lack of High DPI Canvas support
            // https://github.com/soundcloud/waveformjs/pull/22
            var ctx = waveform.context;
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
        });
};

module.exports = SoundCloud;


