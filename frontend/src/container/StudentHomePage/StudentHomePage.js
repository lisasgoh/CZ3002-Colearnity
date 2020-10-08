import React, { Component } from 'react';
import  Post  from "../../components/Post/Post";
import "./StudentHomePage.css";

class StudentHomePage extends Component {
    render(){
        
        return(

            <div className="flexbox-container">                
                <div className="homepage_post">
                    <h1 >Recent Post</h1>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                </div>
            </div>
        );
    }
}

export default StudentHomePage;