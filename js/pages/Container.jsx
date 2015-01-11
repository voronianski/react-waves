'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var RouteHandler = ReactRouter.RouteHandler;

var Container = React.createClass({
    render: function () {
        return (
            <div className="container clearfix">
                <RouteHandler />

                <div className="info">
                    This is a demo application that makes use of <a href="https://developers.soundcloud.com">SoundCloud</a> and <a href="http://developers.shuffler.fm">Shuffler.fm</a> APIs powered by <a href="http://facebook.github.io/react">React</a> components.
                </div>
            </div>
        );
    }
});

module.exports = Container;
