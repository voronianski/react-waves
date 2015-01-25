'use strict';

var React = require('react');
var ReactRouter = require('react-router');

var StreamBox = require('../components/StreamBox.jsx');

var TrackDetails = React.createClass({
    mixins: [ReactRouter.State],

    render: function () {
        var trackId = this.getParams().trackId;
        return (
            <div className="track-details">
                <StreamBox trackId={trackId} />
            </div>
        );
    }
});

module.exports = TrackDetails;
