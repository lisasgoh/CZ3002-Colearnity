import React, { Component } from "react";
import Post from "../../components/Post/Post";
import ForumButton from "../../components/ForumButtons/ForumButton";
import Filter from "../../components/Filter/Filter";
import "./StudentHomePage.css";

class StudentHomePage extends Component {
  render() {
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
        </div>

        <div className="rightsection">
          <div className="topbar">
            <h2>Recent Posts</h2>

            <Filter />
          </div>
          <Post editingaccess={true} />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
    );
  }
}

export default StudentHomePage;
