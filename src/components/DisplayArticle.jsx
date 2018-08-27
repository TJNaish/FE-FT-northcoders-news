import React, { Component } from "react";
import { Link } from "react-router-dom";

class DisplayArticle extends Component {
  state ={ vote:''}
  render(){
  return (
    <article className="mainArticle">
      <div>
        <h1>{this.props.article.title}</h1>
        <h3>
          {this.props.currentUser &&
            this.props.currentUser !== this.props.article.created_by.username && (
              <span>
                {this.state.vote !== 'down' &&
                  <img
                    src="../images/down.png"
                    className="arrow"
                    alt="arrowdown"
                    onClick={() => {
                      this.props.vote(this.props.article._id, "down", "article");
                      this.setState({vote:"down"});
                    }}
                  />}
                  {this.state.vote === 'down' &&
                  <img 
                    src="../images/downgrey.png"
                    className="arrow"
                    alt="arrowdown"/>}
                  {" "}
                  {this.props.article.votes}{" "}
                  {this.state.vote !== 'up' &&
                  <img
                    src="../images/up.png"
                    className="arrow"
                    alt="arrowup"
                    onClick={() => {
                      this.props.vote(this.props.article._id, "up", "article");
                      this.setState({vote:"up"})
                    }}
                  />}
                  {this.state.vote === 'up' &&
                  <img 
                    src="../images/upgrey.png"
                    className="arrow"
                    alt="arrowup" 
                    />}
                  {" "}
                  |{" "}
              </span>
            )}
          {(!this.props.currentUser ||
            this.props.currentUser === this.props.article.created_by.username) && (
            <span>{this.props.article.votes} | </span>
          )}
          <span>
            <Link
              className="articlelink"
              to={`/users/${this.props.article.created_by.username}`}
            >
              {this.props.article.created_by.username}
            </Link>
          </span>
        </h3>
      </div>

      <p>{this.props.article.body}</p>
    </article>
  );
};
}

export default DisplayArticle;
