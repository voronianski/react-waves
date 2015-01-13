'use strict';

var React = require('react');

var Player = require('./Player.jsx');
var LoadingIndicator = require('./LoadingIndicator.jsx');
var ShufflerFM = require('../services/ShufflerFM');

var TrackDetails = React.createClass({
    getInitialState: function () {
        return {
            track: null
        };
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
        var divStyles = {
            backgroundImage: 'url('+(track.images ? track.images['640x400'].url : './assets/empty-card.png')+')'
        };

        return (
            <div style={divStyles} className="artwork">
                <h2><span className="track">{track.metadata.title}</span></h2>
                <h3><span className="artist">{track.metadata.artist.name}</span></h3>
            </div>
        );
    }
});

module.exports = TrackDetails;
