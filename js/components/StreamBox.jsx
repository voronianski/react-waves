'use strict';

var React = require('react');

var ShufflerFM = require('../services/ShufflerFM');
var Player = require('./Player.jsx');
var LoadingIndicator = require('./LoadingIndicator.jsx');

var TrackDetails = React.createClass({
    getInitialState: function () {
        return {track: null};
    },

    loadTrackData: function () {
        ShufflerFM.getTrackById(this.props.trackId, function (track) {
            if (this.isMounted()) {
                this.setState({track: track});
            }
        }.bind(this));
    },

    componentDidMount: function () {
        this.loadTrackData();
    },

    render: function () {
        if (!this.state.track) {
            return <LoadingIndicator />;
        }

        var track = this.state.track;
        var divStyles = track.images ?
            {backgroundImage: 'url('+track.images['640x400'].url+')'} :
            {};

        return (
            <div style={divStyles} className="artwork">
                <h2><span className="track info-box">{track.metadata.title}</span></h2>
                <h3><span className="artist info-box">by {track.metadata.artist.name}</span></h3>
                <Player streamUrl={this.state.track.stream.url} />
                <a href={this.state.track.stream.url} className="soundcloud-logo">
                    <img src="assets/soundcloud-logo.svg" />
                </a>
            </div>
        );
    }
});

module.exports = TrackDetails;
