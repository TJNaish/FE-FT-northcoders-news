import React, { Component } from "react";
import axios from "axios";

class CommentBox extends Component {
  state = { comment: "" };
  render() {
    const { comment } = this.state;
    return (
      <textarea
        placeholder="Type your comment here, and press enter to send."
        className="commentbox"
        value={comment}
        onKeyUp={this.handleKeyUp}
        onChange={this.handleChange}
      />
    );
  }

  handleChange = text => {
    this.setState({ comment: text.target.value });
  };
  postComment = comment => {
    return axios.post(
      `https://tnaish-ncnews.herokuapp.com/api/articles/${
        this.props.articleId
      }/comments`,
      comment
    );
  };
  handleKeyUp = e => {
    if (e.key === "Enter") {
      const sentText = {
        created_by: `${this.props.currentUserId}`,
        body: this.state.comment
      };
      this.postComment(sentText).then(comment => {
        let commentData = comment.data.comment;
        let user = { username: this.props.currentUser };
        commentData.created_by = user;
        this.props.updateComments(comment.data.comment);
      });
      this.setState({ comment: "" });
    }
  };
}

export default CommentBox;
