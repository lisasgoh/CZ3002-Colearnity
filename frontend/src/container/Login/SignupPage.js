import React, { Component } from 'react';
import { Button } from '../components/Button';
import './Login.css';

class SignupPage extends Component {
    render() {
        return (
            <div className="main">
                <div className="signup-form">
                    <form>
                        <a className="sleft" href="">
                            back
                        </a>
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
    
                        <Button>Sign Up</Button>
                        <p className="sright">Already registered? <a href="">Login</a></p>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignupPage;