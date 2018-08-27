import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";

const Nav = props => {
  return (
    <main className="navbar">
      <div className="title">
        <h1>
          <Link className="titleLink" to="/">
            <span className="N">N</span>
            ORTHCODERS <span className="N">N</span>
            EWS
          </Link>
        </h1>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
      </ul>
      <br />
      {!props.currentUser && (
        <div className="loginbox">
          <Login
            handleLogin={props.handleLogin}
            handleChangeUser={props.handleChangeUser}
            handleChangePword={props.handleChangePword}
            userLoginField={props.userLoginField}
            userPasswordField={props.userPasswordField}
          />
          {!props.currentUser &&
          props.loginError &&
          props.loginError === 401 ? (
            <p>Incorrect Password</p>
          ) : props.loginError === 404 ? (
            <p>Username not found</p>
          ) : null}
        </div>
      )}
      {props.currentUser && (
        <div className="loginbox">
          <p>Logged in as: {props.currentUser}</p>
          <p className="link" onClick={props.handleLogout}>
            Logout
          </p>
        </div>
      )}
    </main>
  );
};

export default Nav;
