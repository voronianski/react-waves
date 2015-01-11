'use strict';

var React = require('react');

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
        var content = this.state.track ?
            <h2>{this.state.track.metadata.title}</h2> :
            <div>Loading...</div>;

         return <div>{content}</div>;
    }
});

module.exports = TrackDetails;
