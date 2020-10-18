import React, { Component } from "react";
import { Button } from "../../components/Button/Button";
import { Link } from "react-router-dom";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import "./Login.css";

import usersService from "./../../services/users";

class SignupPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // id: this.props.match.params.id,
      username: null,
      email: null,
      is_student: true,
      password: null,
      university: null,
      course_of_study: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      ...this.state,
      ...{
        [event.target.name]: event.target.value,
      },
    });
  }

  handleSubmit(event) {
    console.log("form was submitted");
    event.preventDefault();

    console.log(this.state);

    usersService
      .create(this.state)
      .then((newUser) => console.log(newUser))
      .catch((error) => console.log(error));

    // const post = {
    //   title: this.state.title,
    //   description: this.state.description,
    //   is_sub: false,
    //   // postTags: this.state.tags,
    // };
    // postService.create(post, forum_id)
    //   .then((newPost) => console.log(newPost))
    //   .catch((err => console.log(err)));
  }

  render() {
    console.log("username: " + this.state.username);
    console.log("email: " + this.state.email);
    return (
      <div className="main">
        <div className="signup-form">
          <form onSubmit={this.handleSubmit}>
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
                name="username"
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                name="email"
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                name="password"
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>University</label>
              <input
                type="university"
                className="form-control"
                placeholder="Enter University"
                name="university"
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Course of Study</label>
              <input
                type="course"
                className="form-control"
                placeholder="Enter course of study"
                name="course_of_study"
                onChange={this.handleInputChange}
              />
            </div>

            <Button type="submit" value="Submit">
              Sign Up
            </Button>

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
