'use strict';

require('es5-shim');
require('es5-shim/es5-sham');
require('array.prototype.find'); // es6-shim

var React = require('react');
var ReactRouter = require('react-router');

var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;

var Container = require('./pages/Container.jsx');
var TrackList = require('./pages/TrackList.jsx');
var TrackDetails = require('./pages/TrackDetails.jsx');

var routes = (
    <Route path="/" handler={Container}>
        <Route name="track" path="track/:trackId" handler={TrackDetails} />
        <DefaultRoute handler={TrackList} />
    </Route>
);

ReactRouter.run(routes, function (Handler) {
    React.render(
        <Handler />,
        document.getElementById('ReactWavesApp')
    );
});
