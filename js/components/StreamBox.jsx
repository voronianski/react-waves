'use strict';

var React = require('react');

var ShufflerFM = require('../services/ShufflerFM');

var Player = require('./Player.jsx');
var CommentBox = require('./CommentBox.jsx');
var LoadingIndicator = require('./LoadingIndicator.jsx');
var InfoBox = require('./InfoBox.jsx');

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
        var track = this.state.track;

        if (!track) {
            return <LoadingIndicator />;
        }

        var streamUrl = track.stream.url;
        var commentsUrl = streamUrl.replace('stream', 'comments');
        var divStyles = track.images ?
            {backgroundImage: 'url('+track.images['640x400'].url+')'} :
            {};

        return (
            <div>
                <div style={divStyles} className="artwork">
                    <div className="soundcloud-logo"><img src="assets/soundcloud-logo.svg" /></div>
                    <h2><span className="track info-box">{track.metadata.title}</span></h2>
                    <h3><span className="artist info-box">by {track.metadata.artist.name}</span></h3>
                    <Player streamUrl={streamUrl} />
                </div>
                <CommentBox url={commentsUrl} />
                <InfoBox />
            </div>
        );
    }
});

module.exports = TrackDetails;
