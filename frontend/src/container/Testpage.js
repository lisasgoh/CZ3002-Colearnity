import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "./../components/Button/Button";
import '../container/LandingPage/LandingPage.css';

class Testpage extends Component {
    render(){
        return(
            <div className="test">
                <div className="ls-btn">
                    <Link to="/landingpage">
                        <Button>Landing Page</Button>
                    </Link>
                </div>
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
                    <Link to="/forumpage/:id">
                        <Button>Forum Page</Button>
                    </Link>
                </div>
                <div className="ls-btn">
                    <Link to="/subforumpage/:id">
                        <Button>Suforum Page</Button>
                    </Link>
                </div>

                <div className="ls-btn">
                    <Link to="/createpost">
                        <Button>Create Post</Button>
                    </Link>
                </div>

                <div className="ls-btn">
                    <Link to="/reviewquizpage">
                        <Button>Review Quiz Page</Button>
                    </Link>
                </div>
                <div className="ls-btn">
                    <Link to="/takequizpage/:id">
                        <Button>Take Quiz Page</Button>
                    </Link>
                </div>
                <div className="ls-btn">
                    <Link to="/teacherforumpage">
                        <Button>Teacher Forum Page</Button>
                    </Link>
                </div>
                <div className="ls-btn">
                    <Link to="/teachersubforumpage">
                        <Button>Teacher Sub Forum Page</Button>
                    </Link>
                </div>
                <div className="ls-btn">
                    <Link to="/postdetailpage/:id">
                        <Button>Post Detail Page</Button>
                    </Link>
                </div>
                <div className="ls-btn">
                    <Link to="/teachercreatequiz">
                        <Button>Teacher Create Quiz</Button>
                    </Link>
                </div>
                <div className="ls-btn">
                    <Link to="/createforum">
                        <Button>Create Forum</Button>
                    </Link>
                </div>
            </div>
        );
    }

}

export default Testpage;