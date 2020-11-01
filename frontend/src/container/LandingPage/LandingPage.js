import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "../../components/Button/Button";
import { ReactComponent as Image } from './image.svg';
import "./LandingPage.css";

class LandingPage extends Component {
    render(){
    return(
            <div className="landing">
                <div className="svg"><Image /></div>
                <div className="landingtext">
                    <div className="landingtitle">Colearnity</div>
                    <div className="landingdesc">An online learning platform to promote social connectedness within the 
                        educational community.
                    </div>
                    <div className="ls-btn">
                        <Link to="/signup">
                            <Button>Get Started</Button>
                        </Link>
                    </div>
                    <div className="ls-btn">
                        <Link to="/login">
                            <Button>Login</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

}

export default LandingPage;