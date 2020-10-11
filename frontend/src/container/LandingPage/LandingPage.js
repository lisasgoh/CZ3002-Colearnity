import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "../../components/Button/Button";
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
                        <Link to="/signup">
                            <Button>Sign Up</Button>
                        </Link>
                    </div>
                    <div className="ls-btn">
                        <Link to="/forumpage">
                            <Button>Forum Page</Button>
                        </Link>
                    </div>
                    <div className="ls-btn">
                        <Link to="/subforumpage">
                            <Button>Suforum Page</Button>
                        </Link>
                    </div>
                    <div className="ls-btn">
                        <Link to="/reviewquizpage">
                            <Button>Review Quiz Page</Button>
                        </Link>
                    </div>
                    <div className="ls-btn">
                        <Link to="/takequizpage">
                            <Button>Take Quiz Page</Button>
                        </Link>
                    </div>

                    
                    <div className="ls-btn">
                        <Link to="/teacherforumpage">
                            <Button>Teacher Forum Page</Button>
                        </Link>
                    </div>
                </div>
        );
    }

}

export default LandingPage;