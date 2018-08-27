import React, {Component} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class DisplayComments extends Component {
  state = {up:[], down:[]};
  render() {
  const deleteComment = comment => {
    return axios
      .delete(`https://tnaish-ncnews.herokuapp.com/api/comments/${comment}`)
      .then(this.props.deleteCommentRefresh(comment));
  };
  return this.props.comments
    ? this.props.comments.map(comment => {
        return (
          <section className="comment" key={comment._id}>
            <p>{comment.body}</p>
            <p className="commentInfo">
              {this.props.currentUser &&
                this.props.currentUser !== comment.created_by.username && (
                  <span className="commentInfo">
                    {!this.state.down.includes(comment._id) &&
                    <img
                      src="../images/down.png"
                      alt="arrowdown"
                      className="arrow"
                      onClick={() => {
                        this.props.vote(comment._id, "down", "comment");
                        let down = this.state.down.splice()
                        let up = this.state.up.splice()
                        down.push(comment._id)
                        if (up.includes(comment._id)){
                          let index=up.indexOf(comment._id)
                          up.splice(index,1)
                        }
                        this.setState({up, down})
                      }}
                    />}
                    {this.state.down.includes(comment._id) &&
                    <img
                      src="../images/downgrey.png"
                      alt="arrowdown"
                      className="arrow"
                      />}
                    {" "}
                    {comment.votes}{" "}
                    {!this.state.up.includes(comment._id) &&
                    <img
                      src="../images/up.png"
                      alt="arrowup"
                      className="arrow"
                      onClick={() => {
                        this.props.vote(comment._id, "up", "comment");
                        let down = this.state.down.splice()
                        let up = this.state.up.splice()
                        up.push(comment._id)
                        if (down.includes(comment._id)) {
                          let index=down.indexOf(comment._id)
                          down.splice(index,1)
                        }
                        this.setState({up, down})
                      }}
                    />}
                    {this.state.up.includes(comment._id) &&
                    <img
                      src="../images/upgrey.png"
                      alt="arrowup"
                      className="arrow"
                    />}
                  </span>
                )}
              {(!this.props.currentUser ||
                this.props.currentUser === comment.created_by.username) && (
                <span className="commentInfo">{comment.votes}</span>
              )}
              {" | "}
              <Link
                className="articlelink commentInfo"
                to={`/users/${comment.created_by.username}`}
              >
                {comment.created_by.username}
              </Link>
              {" | "}
              {comment.created_at.slice(0, 10) +
                " " +
                comment.created_at.slice(11, 16)}
            </p>
            {this.props.currentUser === comment.created_by.username && (
              <span
                className="articlelink"
                onClick={() => {
                  deleteComment(comment._id);
                }}
              >
                Delete comment
              </span>
            )}
          </section>
        );
      })
    : null;
};
}

export default DisplayComments;
