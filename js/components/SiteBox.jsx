'use strict';

var React = require('react');

var SiteBox = React.createClass({
    render: function () {
        console.log(this.props);
        return (
            <div className="sidebar">
                <img src={this.props.site.images[0].url} />
                <a href={this.props.site.url}>{this.props.site.title}</a>
                <p>{this.props.site.about}</p>
            </div>
        );
    }
});

module.exports = SiteBox;
