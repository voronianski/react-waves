'use strict';

var React = require('react');

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
                <CommentForm onCommentSubmit={this.sendComment} />
                <CommentList data={this.state.comments} />
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function () {
        var commentNodes = this.props.data.map(function (comment) {
            return <Comment key={comment.id} author={comment.user}>{comment.body}</Comment>;
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

        return (
            <div className="comment clearfix">
                <a href={author.permalink_url}>
                    <img className="comment-avatar" src={author.avatar_url} />
                </a>
                <div className="comment-text">
                    <div className="comment-author">
                        <a href={author.permalink_url}>{author.username}</a>
                    </div>
                    <div>{this.props.children}</div>
                </div>
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
