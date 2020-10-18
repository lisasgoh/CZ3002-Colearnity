import React, { Component } from 'react';
import { Button } from '../../components/Button/Button';
import {Link} from 'react-router-dom';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import './Login.css';

import usersService from "../../services/users";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
    Login() {
        const userData = {
          "user": {
            "email": this.state.username,
            "password": this.state.password
          }
        }
        console.log(userData);
        // usersService.login(userData).then((response => console.log(response.data)));
    }
    handleChange(evt) {
      const value = evt.target.value;
      this.setState({[evt.target.name]: value});
    }
  
    render() {
      return (
          <div className="main">
            <div className="login-form">
              <form>
                {/* <Link to="/">
                  <NavigateBeforeIcon />
                </Link> */}
                <h3>Login</h3><p> </p>        
                <div className="form-group">
                  <label>Username</label>
                  <input type="username" className="form-control" placeholder="Enter username" name="username" value={this.state.username} onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                  <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name="password" value={this.state.password} onChange={this.handleChange} />
                </div>
                <Button onClick={console.log("Button clicked")}>Login</Button>
                <p className="sright">Forgot <a href="#">password?</a></p>
              </form>
            </div>
          </div>
        );
    }
}

export default LoginPage;