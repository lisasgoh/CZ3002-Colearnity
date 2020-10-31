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
                    <div className="landingdesc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                        pretium orci eget lobortis porttitor. Praesent consectetur lacus eu
                        egestas blandit. Mauris ultrices consequat diam sit amet ornare.
                        Etiam elementum felis in nisl condimentum scelerisque. Integer
                        scelerisque turpis at ipsum aliquam elementum. Praesent non posuere
                        sem, eget varius purus.
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