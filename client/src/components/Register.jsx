import { Button, Input } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Link, useHistory } from "react-router-dom";
import actionTypes from "../actions/actionsType";

const Register = () => {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleRegistery = async () => {
    const res = await fetch("https://caesaru-server.herokuapp.com/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, username, password }),
    });

    const data = await res.json();
    dispatch({
      type: actionTypes.REGISTER_USER,
      payload: data,
    });
  };

  useEffect(() => {
    dispatch({
      type: actionTypes.DELETE_REGISTER_USER_MESSAGE,
      payload: null,
    });
    if (token) history.push("/vacations");
  }, []);

  const registerMessage = useSelector((state) => state.register);
  return (
    <div className="register">
      <h2>Registery Page</h2>
      <Input
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        inputProps={{ "aria-label": "description", placeholder: "First Name" }}
      />
      <Input
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        inputProps={{ "aria-label": "description", placeholder: "Last Name" }}
      />
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
      <Button variant="contained" color="primary" onClick={handleRegistery}>
        Register
      </Button>
      <Link to="/login">Click here to login</Link>
      {registerMessage?.message?.length && (
        <Alert severity={registerMessage?.error ? "error" : "success"}>
          <AlertTitle>
            {registerMessage?.error ? "Error" : "Success"}
          </AlertTitle>
          {registerMessage?.message}
        </Alert>
      )}
    </div>
  );
};

export default Register;
