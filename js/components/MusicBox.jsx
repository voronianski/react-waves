'use strict';

var React = require('react/addons');
var Link = require('react-router').Link;

var LoadingIndicator = require('./LoadingIndicator.jsx');
var ShufflerFM = require('../services/ShufflerFM');

var Track = React.createClass({
    render: function () {
        var track = this.props.track;
        var divStyles = track.images ?
            {backgroundImage: 'url('+track.images.ipad364.url+')'} :
            {};

        return (
            <div style={divStyles} className="box">
                <div className="content">
                    <h2>
                        <span className="artist nowrap">{track.metadata.artist.name}</span>
                    </h2>
                    <p>
                        <span className="track nowrap">{track.metadata.title}</span>
                    </p>
                </div>
                <Link className="link" to="track" params={{trackId: track.id}}></Link>
            </div>
        );
    }
});

var TrackList = React.createClass({
    render: function () {
        var trackNodes = this.props.data
            .filter(function (track) {
                return track.stream && track.stream.platform === 'soundcloud';
            })
            .map(function (track) {
                return <Track key={track.id} track={track} />;
            });

        return (
            <div>
                <div className="popular-list animated bounceInUp clearfix">
                    {trackNodes}
                </div>
                <div className="info">
                    This is a demo application that makes use of <a href="https://developers.soundcloud.com">SoundCloud</a> and <a href="http://developers.shuffler.fm">Shuffler.fm</a> APIs powered by <a href="http://facebook.github.io/react">React</a> components.
                </div>
            </div>
        );
    }
});

var MusicBox = React.createClass({
    getInitialState: function () {
        return {tracks: []};
    },

    loadPopularTracks: function () {
        ShufflerFM.getPopularTracks(function (tracks) {
            if (this.isMounted()) {
                this.setState({tracks: tracks});
            }
        }.bind(this));
    },

    componentDidMount: function () {
        this.loadPopularTracks();
    },

    render: function () {
        return (
            !this.state.tracks.length ?
                <LoadingIndicator /> :
                <TrackList data={this.state.tracks}/>
        );
    }
});

module.exports = MusicBox;
