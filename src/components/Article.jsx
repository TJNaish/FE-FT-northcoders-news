import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import DisplayArticle from "../components/DisplayArticle";
import DisplayComments from "../components/DisplayComments";
import CommentBox from "../components/CommentBox";

class Article extends Component {
  state = {
    comments: [],
    article: {},
    upvoted: [],
    downvoted: [],
    error: false
  };
  componentDidMount() {
    Promise.all([
      axios
        .get(
          `https://tnaish-ncnews.herokuapp.com/api/articles/${
            this.props.match.params.articleid
          }`
        )
        .then(res => res.data.foundArticle)
        .catch(err => this.setState({ error: true })),
      axios
        .get(
          `https://tnaish-ncnews.herokuapp.com/api/articles/${
            this.props.match.params.articleid
          }/comments/`
        )
        .then(res => res.data.comments)
    ]).then(data => {
      const formatDate = this.props.formatDate;
      data[1].sort(function(a, b) {
        let aDate = formatDate(a.created_at);
        let bDate = formatDate(b.created_at);
        return bDate - aDate;
      });
      this.setState({ article: data[0], comments: data[1] });
    });
  }
  render() {
    if (this.state.error) return <Redirect to="/error" />;
    return Object.keys(this.state.article).length ? (
      <main>
        <div className="articleBox">
          <DisplayArticle
            key={this.state.article._id}
            article={this.state.article}
            currentUser={this.props.currentUser}
            vote={this.vote}
          />
        </div>
        {this.props.currentUser && (
          <div className="commentbox">
            <CommentBox
              currentUser={this.props.currentUser}
              currentUserId={this.props.currentUserId}
              articleId={this.props.match.params.articleid}
              updateComments={this.updateComments}
            />
          </div>
        )}
        {!this.props.currentUser && <h3>Please login to post a comment</h3>}
        <div className="commentcontainer">
          <DisplayComments
            comments={this.state.comments}
            currentUser={this.props.currentUser}
            deleteCommentRefresh={this.deleteCommentRefresh}
            vote={this.vote}
          />
        </div>
      </main>
    ) : null;
  }
  updateComments = comment => {
    const comments = this.state.comments.slice();
    comments.unshift(comment);
    this.setState({ comments });
  };
  deleteCommentRefresh = commentID => {
    let comments = this.state.comments.slice();
    comments.map((comment, index) => {
      if (comment._id === commentID) comments.splice(index, 1);
      this.setState({ comments });
      return null;
    });
  };
  updateCommentVotes = (itemID, n) => {
    let comments = this.state.comments.slice();
    comments.map(comment => {
      if (comment._id === itemID) comment.votes += n;
      this.setState({ comments });
      return null;
    });
  };
  updateArticleVotes = n => {
    let article = { ...this.state.article };
    article.votes += n;
    this.setState({ article });
    return null;
  };
  vote = (itemID, upOrDown, votetype) => {
    if (this.state[`${upOrDown}voted`].includes(itemID)) return;
    if (upOrDown === "up") {
      if (votetype === "comment")
        axios
          .put(
            `https://tnaish-ncnews.herokuapp.com/api/comments/${itemID}?vote=up`
          )
          .then(this.updateCommentVotes(itemID, 1));
      if (votetype === "article")
        axios
          .put(
            `https://tnaish-ncnews.herokuapp.com/api/articles/${itemID}?vote=up`
          )
          .then(
            this.updateArticleVotes(1),
            this.props.updateArticleListVotes(this.state.article._id, 1)
          );
    } else {
      if (votetype === "comment")
        axios
          .put(
            `https://tnaish-ncnews.herokuapp.com/api/comments/${itemID}?vote=down`
          )
          .then(this.updateCommentVotes(itemID, -1));
      if (votetype === "article")
        axios
          .put(
            `https://tnaish-ncnews.herokuapp.com/api/articles/${itemID}?vote=down`
          )
          .then(
            this.updateArticleVotes(-1),
            this.props.updateArticleListVotes(this.state.article._id, -1)
          );
    }
  };
}

export default Article;
