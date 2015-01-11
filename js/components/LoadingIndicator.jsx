'use strict';

var React = require('react');

var LoadingIndicator = React.createClass({
    render: function () {
        return (
            <div className="loading">
                <img src="./assets/loading-bars.svg" width="64" height="64" />
            </div>
        );
    }
});

module.exports = LoadingIndicator;
