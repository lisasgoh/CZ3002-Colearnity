import React, { Component } from "react";
import { Button } from "../../components/Button/Button";
import { Link } from "react-router-dom";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import "./Login.css";

class SignupPage extends Component {
  render() {
    return (
      <div className="main">
        <div className="signup-form">
          <form>
            <Link to="/">
              <NavigateBeforeIcon />
            </Link>

            <h3>Sign Up</h3>
            <p> </p>

            <div className="form-group">
              <label>Username</label>
              <input
                type="username"
                className="form-control"
                placeholder="Enter username"
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>

            <div className="form-group">
              <label>University</label>
              <input
                type="university"
                className="form-control"
                placeholder="Enter University"
              />
            </div>

            <div className="form-group">
              <label>Course of Study</label>
              <input
                type="course"
                className="form-control"
                placeholder="Enter course of study"
              />
            </div>

            <Button>Sign Up</Button>

            <p className="sright">
              Already registered?
              <Link Link to="/login">
                <a href="">Login</a>
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default SignupPage;
