'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var RouteHandler = ReactRouter.RouteHandler;

var Container = React.createClass({
    render: function () {
        return (
            <div className="container clearfix">
                <RouteHandler />
            </div>
        );
    }
});

module.exports = Container;
