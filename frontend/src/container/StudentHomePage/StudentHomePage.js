import React, { Component } from 'react';
import  Post  from "../../components/Post/Post";
import "./StudentHomePage.css";

class StudentHomePage extends Component {
    render(){
        return(
            <div className="homepage_post">
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
            </div>
        );
    }
}

export default StudentHomePage;