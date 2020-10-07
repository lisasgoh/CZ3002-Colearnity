import React, { Component } from 'react';
import { Button } from '../components/Button';
import './Login.css';

class LoginPage extends Component {
    render() {
        return (
            <div className="main">
                <div className="login-form">
                    <form>
                        <a className="sleft" href="">
                            back
                        </a>
                        <h3>Login</h3><p> </p>
                        
                        <div className="form-group">
                            <label>Username</label>
                            <input type="username" className="form-control" placeholder="Enter username" />
                        </div>
        
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" />
                        </div>
        
                        <Button>Login</Button>
                        <p className="sright">Forgot <a href="#">password?</a></p>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginPage;