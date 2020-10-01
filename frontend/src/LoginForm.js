import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import { Link } from "react-router-dom";


const Login = styled.button`
    background-color: #F8BBD0;
    color: black;
    padding: 6px 33px;
    width: 220px;
    border-radius: 5px;
    border: 1px solid #f5f5f5;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 0px;
    transition: ease background-color 250ms;
    &:hover {
        border: 1px solid #F8BBD0;
        background-color: #fce4ec;
`

class LoginForm extends Component {
    render() {
        return (
            <div className="App">
                <header className="Login-form">
                    <form>
                        <p className="back-button">
                            <Link to="/">back</Link>
                        </p>
                        <h3>Login</h3><p> </p>
                        
                        <div className="form-group">
                            <label>Username</label>
                            <input type="username" className="form-control" placeholder="Enter username" />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" />
                        </div>

                        <Login>Login</Login>
                        <p className="forgot-password">
                            Forgot <a href="#">password?</a>
                        </p>
                    </form>
                </header>
            </div>
        );
    }
}

export default LoginForm;


//<div className="form-group">
//    <div className="custom-control custom-checkbox">
//        <input type="checkbox" className="custom-control-input" id="customCheck1" />
//        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
//    </div>
//</div>