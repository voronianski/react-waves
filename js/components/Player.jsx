'use strict';

var React = require('react');
var SoundCloud = require('../services/SoundCloud');
var config = require('../config');

var soundcloud = new SoundCloud(config.soundcloud.clientID);

var PlayerUtilsMixin = {
    prettyTime: function (time) {
        var hours = Math.floor(time / 3600);
        var mins = '0' + Math.floor((time % 3600) / 60);
        var secs = '0' + Math.floor((time % 60));

        mins = mins.substr(mins.length - 2);
        secs = secs.substr(secs.length - 2);
        if (!isNaN(secs)) {
            if (hours){
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
            playing: false
        };
    },

    componentDidMount: function () {
        soundcloud.preload(this.props.streamUrl);
        soundcloud.on('timeupdate', this.getCurrentTime);
        soundcloud.on('loadedmetadata', this.getDuration);
        soundcloud.on('ended', this.finishPlaying);
    },

    componentWillUnmount: function () {
        soundcloud.pause();
        soundcloud.off('timeupdate', this.getCurrentTime);
        soundcloud.off('loadedmetadata', this.getDuration);
        soundcloud.off('ended', this.finishPlaying);
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

    finishPlaying: function () {
        this.setState({playing: false});
    },

    getCurrentTime: function () {
        this.setState({currentTime: soundcloud.audio.currentTime});
    },

    getDuration: function () {
        this.setState({duration: soundcloud.audio.duration});
    },

    render: function () {
        var btnIcon = this.state.playing ?
            <svg viewBox="0 0 32 32" fill="#fff"><path d="M0 0 H12 V32 H0 z M20 0 H32 V32 H20 z"></path></svg> :
            <svg viewBox="0 0 32 32" fill="#fff"><path d="M0 0 L32 16 L0 32 z"></path></svg>;
        var progressVal = (this.state.currentTime/this.state.duration) || 0;

        return (
            <div className="soundcloud-player">
                <div className="play-btn" onClick={this.playPauseTrack}>
                    {btnIcon}
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
