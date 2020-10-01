import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import { Link } from "react-router-dom";


const Signup = styled.button`
    background-color: #B3E5FC;
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
        border: 1px solid #B3E5FC;
        background-color: #e3f2fd;
`

class SignupForm extends Component {
    render() {
        return (
            <div className="App">
                <header className="Signup-form">
                    <form>
                        <p className="back-button">
                            <Link to="/">back</Link>
                        </p>
                        <h3>Sign Up</h3><p> </p>

                        <div className="form-group">
                            <label>Username</label>
                            <input type="username" className="form-control" placeholder="Enter username" />
                        </div>

                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" className="form-control" placeholder="Enter email" />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" />
                        </div>

                        <div className="form-group">
                            <label>University</label>
                            <input type="university" className="form-control" placeholder="Enter University" />
                        </div>

                        <div className="form-group">
                            <label>Course of Study</label>
                            <input type="course" className="form-control" placeholder="Enter course of study" />
                        </div>

                        <Signup>Sign Up</Signup>
                        <p className="forgot-password">
                            Already registered? <Link to="/LoginForm">Login</Link>
                        </p>
                    </form>
                </header>
            </div>
        );
    }
}

export default SignupForm;