'use strict';

var React = require('react');
var moment = require('moment');

var soundcloud = require('../services/SoundCloud');

var CommentBox = React.createClass({
    getInitialState: function () {
        return {comments: []};
    },

    loadComments: function () {
        soundcloud.get(this.props.url, function (data) {
            if (this.isMounted()) {
                this.setState({comments: data});
            }
        }.bind(this));
    },

    // sendComment: function (comment) {
    //     var newComments = this.state.comments.concat([comment]);
    //     this.setState({comments: newComments});
    //     api.post(this.props.url, comment, function (data) {
    //         this.setState({comments: data});
    //     }.bind(this));
    // },

    componentDidMount: function () {
        this.loadComments();
    },

    render: function () {
        return (
            <div className="comment-box">
                <CommentList data={this.state.comments} />
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function () {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <Comment key={comment.id} author={comment.user} created={comment.created_at}>
                    {comment.body}
                </Comment>
            );
        });

        return (
            <div className="comment-list">
                {commentNodes}
            </div>
        );
    }
});

var Comment = React.createClass({
    render: function () {
        var author = this.props.author || {};
        var timeAgo = moment(this.props.created).fromNow(true);

        return (
            <div className="comment clearfix animated fadeIn">
                <a href={author.permalink_url}>
                    <img className="comment-avatar" src={author.avatar_url} />
                </a>
                <div className="comment-text">
                    <div className="comment-author">
                        <a href={author.permalink_url}>{author.username}</a>
                    </div>
                    <div className="comment-body">{this.props.children}</div>
                </div>
                <div className="comment-time">{timeAgo}</div>
            </div>
        );
    }
});

var CommentForm = React.createClass({
    handleSubmit: function (e) {
        e.preventDefault();
        var author = this.refs.author.getDOMNode().value.trim();
        var text = this.refs.text.getDOMNode().value.trim();

        if (!text || !author) {
            return;
        }

        this.props.onCommentSubmit({author: author, text: text});
        this.refs.author.getDOMNode().value = '';
        this.refs.text.getDOMNode().value = '';

        return;
    },

    render: function () {
        return (
            <form className="comment-form" onSubmit={this.handleSubmit}>
                <textarea placeholder="Say something..." ref="text" />
                <button type="submit">Post</button>
            </form>
        );
    }
});

module.exports = CommentBox;
