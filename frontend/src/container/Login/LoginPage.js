import React, { Component } from 'react';
import { Button } from '../../components/Button/Button';
import {Link} from 'react-router-dom';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import './Login.css';

class LoginPage extends Component {
    render() {
        return (
            <div className="main">
                <div className="login-form">
                    <form>
                        <Link to="/">
                            <NavigateBeforeIcon />
                        </Link>
                        
                        <h3>Login</h3><p> </p>
                        
                        <div className="form-group">
                            <label>Username</label>
                            <input type="username" className="form-control" placeholder="Enter username" />
                        </div>
        
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" />
                        </div>
                        <Link to="/homepage">
                            <Button>Login</Button>
                        </Link>
                            
                        <p className="sright">Forgot <a href="#">password?</a></p>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginPage;