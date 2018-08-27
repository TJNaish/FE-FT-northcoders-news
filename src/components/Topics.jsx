import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DisplayArticleInfo from "../components/DisplayArticleInfo";

class Topics extends Component {
  state = { articles: [], topics: [] };
  componentDidMount() {
    axios
      .get("https://tnaish-ncnews.herokuapp.com/api/topics")
      .then(({ data }) => {
        this.setState({ topics: data.topics, articles: [] }, () => {});
      });
  }
  componentDidUpdate(prevProps, prevState) {
    const { topicid } = this.props.match.params;
    if (topicid && prevState.articles === this.state.articles) {
      axios
        .get(
          `https://tnaish-ncnews.herokuapp.com/api/topics/${topicid}/articles`
        )
        .then(({ data }) => {
          const formatDate = this.props.formatDate;
          data.articles.sort(function(a, b) {
            let aDate = formatDate(a.created_at);
            let bDate = formatDate(b.created_at);
            return bDate - aDate;
          });
          this.setState({ articles: data.articles });
        });
    }
  }
  render() {
    return (
      <ul className="topicbar">
        {this.state.topics.map(topic => {
          return (
            <li key={topic._id}>
              <Link to={`/topics/${topic.slug}/articles`}>{topic.title}</Link>
            </li>
          );
        })}
        {this.state.articles.length > 0 && (
          <DisplayArticleInfo articles={this.state.articles} />
        )}
      </ul>
    );
  }
}

export default Topics;
