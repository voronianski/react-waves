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

var Waveform = React.createClass({
    componentDidMount: function () {
        var container = this.getDOMNode();
        soundcloud.resolveWaveform({
            container: container,
            trackId: this.props.trackId
        });
    },

    render: function () {
        return <div className="waveform"></div>;
    }
});

var PlayButton = React.createClass({
    render: function () {

    }
});

var Timer = React.createClass({
    mixins: [PlayerUtilsMixin],

    getInitialState: function () {
        return {currentTime: 0};
    },

    onTimerUpdate: function () {
        this.setState({currentTime: this.props.audio.currentTime});
    },

    render: function () {
        return <span>{this.prettyTime(this.state.currentTime)} - {this.prettyTime(this.props.audio.duration)}</span>;
    }
});

var Player = React.createClass({
    getInitialState: function () {
        return {playing: false};
    },

    playPauseTrack: function () {
        if (this.state.playing) {
            this.setState({playing: false});
            soundcloud.pause();
        } else {
            soundcloud.play({streamUrl: this.props.streamUrl});
            this.setState({playing: true});
        }
    },

    render: function () {
        var btnIcon = this.state.playing ?
            <svg viewBox="0 0 32 32" fill="#fff"><path d="M0 0 H12 V32 H0 z M20 0 H32 V32 H20 z"></path></svg> :
            <svg viewBox="0 0 32 32" fill="#fff"><path d="M0 0 L32 16 L0 32 z"></path></svg>;

        return (
            <div className="soundcloud-player">
                <div className="play-btn" onClick={this.playPauseTrack}>
                    {btnIcon}
                </div>
                <div className="waveform">
                    <progress value="0.33715897273180045"></progress>
                </div>
                <div className="timer">
                    02:35 / 05:40
                </div>
            </div>
        );
    }
});

module.exports = Player;
