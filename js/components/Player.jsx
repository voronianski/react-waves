'use strict';

var React = require('react');
var soundcloud = require('../services/SoundCloud');

// var  = new SoundCloud(config.soundcloud.clientID);

var PlayerUtilsMixin = {
    prettyTime: function (time) {
        var hours = Math.floor(time / 3600);
        var mins = '0' + Math.floor((time % 3600) / 60);
        var secs = '0' + Math.floor((time % 60));

        mins = mins.substr(mins.length - 2);
        secs = secs.substr(secs.length - 2);
        if (!isNaN(secs)) {
            if (hours) {
                return hours+':'+mins+':'+secs;
            } else {
                return mins+':'+secs;
            }
        } else {
            return '00:00';
        }
    }
};

var Player = React.createClass({
    mixins: [PlayerUtilsMixin],

    getInitialState: function () {
        return {
            duration: 0,
            currentTime: 0,
            playing: false,
            seeking: false
        };
    },

    componentDidMount: function () {
        soundcloud.preload(this.props.streamUrl);
        soundcloud.on('timeupdate', this.getCurrentTime);
        soundcloud.on('loadedmetadata', this.getDuration);
        soundcloud.on('seeking', this.onSeekingTrack);
        soundcloud.on('seeked', this.onSeekedTrack);
        soundcloud.on('ended', this.onAudioEnded);
    },

    componentWillUnmount: function () {
        soundcloud.pause();
        soundcloud.unbindAll();
    },

    playPauseTrack: function () {
        if (this.state.playing) {
            soundcloud.pause();
        } else {
            soundcloud.play();
        }
        this.setState({playing: soundcloud.playing});
    },

    seekTrack: function (e) {
        var xPos = (e.pageX - e.target.getBoundingClientRect().left) / e.target.offsetWidth;
        soundcloud.audio.currentTime = (xPos * soundcloud.audio.duration);
    },

    onSeekingTrack: function () {
        this.setState({seeking: true});
    },

    onSeekedTrack: function () {
        this.setState({seeking: false});
    },

    onAudioEnded: function () {
        this.setState({playing: false});
    },

    getCurrentTime: function () {
        this.setState({currentTime: soundcloud.audio.currentTime});
    },

    getDuration: function () {
        this.setState({duration: soundcloud.audio.duration});
    },

    render: function () {
        var btnIcon = this.state.seeking ?
            './assets/loading-bars-white.svg' :
             this.state.playing ?
                './assets/pause.svg' :
                './assets/play.svg';

        var progressVal = (this.state.currentTime/this.state.duration) || 0;

        return (
            <div className="soundcloud-player">
                <div className="play-btn" onClick={this.playPauseTrack}>
                    <img src={btnIcon} />
                </div>
                <div className="waveform">
                    <progress onClick={this.seekTrack} value={progressVal}></progress>
                </div>
                <div className="timer">
                    {this.prettyTime(this.state.currentTime)} / {this.prettyTime(this.state.duration)}
                </div>
            </div>
        );
    }
});

module.exports = Player;
