import React, { Component } from "react";
import Post from "../../components/Post/Post";
import ForumButton from "../../components/ForumButtons/ForumButton";
import Filter from "../../components/Filter/Filter";
import "./../StudentHomePage/StudentHomePage.css";
import TeacherPost from "../../components/Post/TeacherPost";

class StudentHomePage extends Component {
  render() {
    const ColoredLine = ({ color }) => (
      <hr
        style={{
          color: color,
          backgroundColor: color,
          height: 2,
          marginTop: "2em",
        }}
      />
    );
    const { classes } = this.props;
    return (
      <div className="studenthomepage">
        <div className="leftsection">
          <h2>My Forums</h2>
          <div className="forums">
            <ForumButton
              color="papayawhip"
              hovercolor="peachpuff"
              forumTitle="CZ3002 ASE"
            />
            <ForumButton
              color="lightcyan"
              hovercolor="darkcyan"
              forumTitle="CZ3001 ACOA"
            />
            <ForumButton
              color="lavender"
              hovercolor="darkslateblue"
              forumTitle="CZ1007 Data Structures"
            />
          </div>

          <ColoredLine color="grey" />
          <h2 style={{ marginTop: "2em" }}>Forums Created</h2>
          <div className="forums">
            <ForumButton
              color="papayawhip"
              hovercolor="peachpuff"
              forumTitle="CZ3002 ASE"
            />
            <ForumButton
              color="lightcyan"
              hovercolor="darkcyan"
              forumTitle="CZ3001 ACOA"
            />
            <ForumButton
              color="lavender"
              hovercolor="darkslateblue"
              forumTitle="CZ1007 Data Structures"
            />
          </div>
        </div>

        <div className="rightsection">
          <div className="topbar">
            <h2>Recent Posts</h2>

            <Filter />
          </div>
          <TeacherPost />
          <TeacherPost />
          <TeacherPost />
          <TeacherPost />
          <TeacherPost />
          <TeacherPost />
        </div>
      </div>
    );
  }
}

export default StudentHomePage;
