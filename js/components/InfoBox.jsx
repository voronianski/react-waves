'use strict';

var React = require('react');

var InfoBox = React.createClass({
    render: function () {
        return (
            <div className="info">
                This is a demo application that makes use of <a href="https://developers.soundcloud.com">SoundCloud</a> and <a href="http://developers.shuffler.fm">Shuffler.fm</a> APIs powered by <a href="http://facebook.github.io/react">React</a> components.
            </div>
        );
    }
});

module.exports = InfoBox;
