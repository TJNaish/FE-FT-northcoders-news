import React from "react";
import { Link } from "react-router-dom";

const DisplayArticleInfo = articles => {
  return articles.articles.map(article => {
    return (
      <div className={`${article.belongs_to.title}`} key={article._id}>
        <p className="articleTextTitle">
          {article.votes} |{" "}
          <Link to={`/articles/${article._id}`}>{article.title}</Link>
        </p>
        <p className="articleTextInfo">
          <Link to={`/users/${article.created_by.username}`}>
            {article.created_by.username}
          </Link>
          {" | "}
          {article.created_at.slice(0, 10) +
            " " +
            article.created_at.slice(11, 16)}
          {" | "} <Link to={`/topics/${article.belongs_to.slug}/articles`}>{article.belongs_to.title}</Link>
        </p>
      </div>
    );
  });
};

export default DisplayArticleInfo;
