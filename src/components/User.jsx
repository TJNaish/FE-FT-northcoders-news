import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class User extends Component {
  state = { user: [], comments: [], articles: [], error: false };
  componentDidMount() {
    axios
      .get(
        `https://tnaish-ncnews.herokuapp.com/users/${
          this.props.match.params.username
        }`
      )
      .then(({ data }) => {
        this.setState({ user: data.foundUser }, () => {})
      })
      .catch((err) => {console.log(err)})
  }
  render() {
    if (this.state.error) return <Redirect to="/error" />;
    return (
      <div>
        <h1>{this.state.user.username}</h1>
        <h2>{this.state.user.name}</h2>
        <img src={this.state.user.avatar_url} onError={(e)=>{e.target.src="../images/default.png"}} alt="user avatar" />
      </div>
    );
  }
}

export default User;
