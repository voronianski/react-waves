'use strict';

var React = require('react');

var MusicBox = require('../components/MusicBox.jsx');

var TrackList = React.createClass({
    render: function () {
        return (
            <div className="track-list">
                <header className="top-header">
                    <div className="shuffler-logo"></div>
                    <h2 className="intro-title">What is popular on blogs?</h2>
                    <p className="intro-text">Listen to the web's most published SoundlCloud tracks.</p>
                </header>
                <MusicBox />
            </div>
        );
    }
});

module.exports = TrackList;
