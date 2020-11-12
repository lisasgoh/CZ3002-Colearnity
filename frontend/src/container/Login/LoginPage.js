import React, { useState } from "react";
// import { Button } from "../../components/Button/Button";
import Button from "@material-ui/core/Button";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Login.css";

import usersService from "../../services/users";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await usersService.login(email, password);
      history.push("/homepage");
    } catch (e) {
      alert(e.message);
    }
  }
  return (
    <div className="main">
      <div className="login-form">
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <Button
            variant="contained"
            color="secondary"
            disabled={!validateForm()}
            type="submit"
          >
            Login
          </Button>
          {/* <Button block disabled={!validateForm()} type="submit">Login</Button> */}
          {/* <p className="sright">
            Forgot <a href="#">password?</a>
          </p> */}
        </form>
      </div>
    </div>
  );
}
