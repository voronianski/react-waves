'use strict';

var React = require('react');
var marked = require('marked');
var api = require('../services/apiMock');

var CommentBox = React.createClass({
    getInitialState: function () {
        return {comments: []};
    },

    loadComments: function () {
        api.get(this.props.url, function (data) {
            if (this.isMounted()) {
                this.setState({comments: data});
            }
        }.bind(this));
    },

    sendComment: function (comment) {
        var newComments = this.state.comments.concat([comment]);
        this.setState({comments: newComments});
        api.post(this.props.url, comment, function (data) {
            this.setState({comments: data});
        }.bind(this));
    },

    componentDidMount: function () {
        this.loadComments();
    },

    render: function () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.comments} />
                <CommentForm onCommentSubmit={this.sendComment} />
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function () {
        var commentNodes = this.props.data.map(function (comment) {
            return <Comment key={comment.id} author={comment.author}>{comment.text}</Comment>;
        });

        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

var Comment = React.createClass({
    render: function () {
        var parsedMarkdown = marked(this.props.children.toString());
        return (
            <div className="comment">
                <h2 className="commentAuthor">{this.props.author}</h2>
                <div dangerouslySetInnerHTML={{__html: parsedMarkdown}} />
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
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your name" ref="author" />
                <textarea placeholder="Say something..." ref="text" />
                <button type="submit">Post</button>
            </form>
        );
    }
});

module.exports = CommentBox;
