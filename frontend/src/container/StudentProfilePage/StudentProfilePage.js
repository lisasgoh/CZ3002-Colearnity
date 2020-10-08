import React, { Component } from 'react';
import  Post  from "../../components/Post/Post";
import "./StudentProfilePage.css";
import ProfilePic from "../../assets/profile_placeholder.png";
import ProfileCard from "./ProfileCard";

class StudentProfilePage extends Component {
    render(){
        const ColoredLine = ({ color }) => (
            <hr
                style={{
                    color: color,
                    backgroundColor: color,
                    height: 1,
                    width: "100%"
                }}
            />
        );
        return(
            <div className="container">
               <img className="profilepic"
                    src={ProfilePic} 
                    alt="Logo"/>
                <h1>Student Name</h1>
                <ColoredLine color="grey" />

                <div className="row_container">
                    <div className="profile_post">
                    <p1 className="profile_post_header"><b>My Posts</b></p1>
                        <Post/>
                        <Post/>
                    </div>
                    <div className="profile_grades">
                    <p1 className="profile_post_header"><b>Grades</b></p1>
                        <ProfileCard marks="7/10" title="Advanced Software Engineering"/>
                        <ProfileCard marks="8/10" title="Advanced Computer Architecture"/>
                        <ProfileCard marks="10/10" title="Software Engineering"/>
                        <ProfileCard marks="2/10" title="Data Structures"/>
                    </div>
                </div>
                
                   
                
            </div>
            
        );
    }
}

export default StudentProfilePage;