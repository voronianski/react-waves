'use strict';

var React = require('react');

var SoundCloud = require('../services/SoundCloud');

var Waveform = React.createClass({
    componentDidMount: function () {
        var el = this.getDOMNode();
        SoundCloud.generateWaveform({
            el: el,
            trackId: this.props.trackId
        });
    },

    render: function () {
        return <div className="waveform"></div>;
    }
});

var Player = React.createClass({
    getInitialState: function () {
        return {};
    },

    componentDidMount: function () {
    },

    render: function () {
        var trackId = this.props.trackUrl.slice(-16, -7);

        return (
            <div>
                <div>Player: Artist - Track 3:22</div>
                <Waveform trackId={trackId} />
            </div>
        );
    }
});

module.exports = Player;
