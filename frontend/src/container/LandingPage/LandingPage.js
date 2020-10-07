import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Button } from "../../components/Button";
import "./LandingPage.css";

class LandingPage extends Component {
    render(){
        return(
                <div className="landing">
                    <div className="ls-btn">
                        <Link to="/login">
                            <Button>Login</Button>
                        </Link>
                    </div>
                    <div className="ls-btn">
                        <Button>Sign Up</Button>
                    </div>
                </div>
        );
    }

}

export default LandingPage;