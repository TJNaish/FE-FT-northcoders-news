import React from "react";

const Login = props => {
  return (
    <div>
      Username{" "}
      <input
        type="text"
        name="uName"
        value={props.userLoginField}
        onChange={props.handleChangeUser}
      />{" "}
      <br />
      Password{" "}
      <input
        type="text"
        name="pWord"
        value={props.userPasswordField}
        onChange={props.handleChangePword}
      />{" "}
      <br />
      <button className="submitButton" type="submit" onClick={props.handleLogin}>
        Submit
      </button>
    </div>
  );
};

export default Login;
