'use strict';

var React = require('react');
var ReactRouter = require('react-router');

var StreamBox = require('../components/StreamBox.jsx');
var CommentBox = require('../components/CommentBox.jsx');

var TrackDetails = React.createClass({
    mixins: [ReactRouter.State],

    render: function () {
        var trackId = this.getParams().trackId;
        return (
            <div className="track-details">
                <StreamBox trackId={trackId} />
                <CommentBox url="comments" />
            </div>
        );
    }
});

module.exports = TrackDetails;
