import { Input, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { HandleLogin } from "../dataFetch/fetchUser";
import { Alert, AlertTitle } from "@material-ui/lab";
import { CLEAR_LOG_IN_MESSAGES } from "../actions/actionsType";
const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const token = localStorage.getItem("token");
  const loginFailMessage = useSelector((state) => state.loginMessage);

  useEffect(() => {
    dispatch({
      type: CLEAR_LOG_IN_MESSAGES,
      payload: null,
    });
    if (token) history.push("/vacations");
  }, []);

  return (
    <div className="d-flex flex-column login-container">
      <h2>Log in</h2>
      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        inputProps={{ "aria-label": "description", placeholder: "Username" }}
      />
      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        inputProps={{
          type: "password",
          "aria-label": "description",
          placeholder: "Password",
        }}
      />
      <Button
        onClick={() => {
          HandleLogin(username, password, history, dispatch);
        }}
        variant="contained"
        color="primary"
      >
        Log in
      </Button>
      <Link to="/register">
        <p>Click here to register</p>
      </Link>
      {loginFailMessage?.error && (
        <Alert severity={loginFailMessage?.error && "error"}>
          <AlertTitle>{loginFailMessage?.error && "Error"}</AlertTitle>
          {loginFailMessage?.message}
        </Alert>
      )}
    </div>
  );
};

export default Login;
