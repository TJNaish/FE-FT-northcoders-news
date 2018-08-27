import React from "react";
import DisplayArticleInfo from "../components/DisplayArticleInfo";

const Home = props => {
  return props.articles.length ? (
    <div className="articleInfoBox">
      <DisplayArticleInfo articles={props.articles} />
    </div>
  ) : null;
};

export default Home;
