import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Topics from "./components/Topics";
import Article from "./components/Article";
import User from "./components/User";
import Error404 from "./components/Error404";
import axios from "axios";

class App extends Component {
  state = {
    currentUser: "jessjelly",
    currentUserId: "5b6c41d56e3ed13c734e3183",
    articles: [],
    userLoginField: "",
    userPasswordField: "",
    loginError: ""
  };
  render() {
    return (
      <div className="App">
        <Nav
          currentUser={this.state.currentUser}
          handleLogout={this.handleLogout}
          handleLogin={this.handleLogin}
          handleChangeUser={this.handleChangeUser}
          handleChangePword={this.handleChangePword}
          userLoginField={this.state.userLoginField}
          userPasswordField={this.userPasswordField}
          loginError={this.state.loginError}
        />
        <Switch>
          <Route path="/users/:username" component={User} />
          <Route
            path="/articles/:articleid"
            render={props => (
              <Article
                currentUser={this.state.currentUser}
                currentUserId={this.state.currentUserId}
                updateArticleListVotes={this.updateArticleListVotes}
                formatDate={this.formatDate}
                {...props}
              />
            )}
          />
          <Route path="/articles/*" component={Error404} />
          <Route
            path="/topics/:topicid/articles"
            render={props => <Topics formatDate={this.formatDate} {...props} />}
          />
          <Route path="/topics/*" component={Error404} />
          <Route
            path="/topics"
            render={props => <Topics formatDate={this.formatDate} {...props} />}
          />
          <Route
            exact
            path="/"
            render={props => <Home articles={this.state.articles} {...props} />}
          />
          <Route component={Error404} />
        </Switch>
      </div>
    );
  }
  componentDidMount() {
    axios
      .get("https://tnaish-ncnews.herokuapp.com/api/articles")
      .then(({ data }) => {
        const formatDate = this.formatDate;
        data.articles.sort(function(a, b) {
          let aDate = formatDate(a.created_at);
          let bDate = formatDate(b.created_at);
          return bDate - aDate;
        });
        this.setState({ articles: data.articles }, () => {});
      });
  }
  handleLogin = () => {
    axios
      .get(
        `https://tnaish-ncnews.herokuapp.com/api/users/${
          this.state.userLoginField
        }`
      )
      .then(({ data }) => {
        this.state.userLoginField === this.state.userPasswordField
          ? this.setState({
              currentUser: data.foundUser.username,
              currentUserId: data.foundUser._id,
              loginError: "",
              userLoginField: "",
              userPasswordField: ""
            })
          : this.setState({ loginError: 401 });
      })
      .catch(error => {
        this.setState({ loginError: error.response.status });
      });
  };
  handleLogout = () => {
    this.setState({ currentUser: "" });
  };
  handleChangeUser = event => {
    this.setState({
      userLoginField: event.target.value
    });
  };
  handleChangePword = event => {
    this.setState({
      userPasswordField: event.target.value
    });
  };
  updateArticleListVotes = (articleID, n) => {
    let articles = this.state.articles.concat();
    articles.map(article => {
      if (article._id === articleID) article.votes += n;
      this.setState({ articles });
      return null;
    });
  };
  formatDate = str => {
    let arr = [];
    arr.push(str.slice(0, 4));
    arr.push(str.slice(5, 7));
    arr.push(str.slice(8, 10));
    arr.push(str.slice(11, 13));
    arr.push(str.slice(14, 16));
    let date = Date.UTC(arr[0], arr[1], arr[2], arr[3], arr[4]);
    return date;
  };
}

export default App;
