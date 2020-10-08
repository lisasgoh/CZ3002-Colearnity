import React, { Component } from "react";
import Post from "../../components/Post/Post";
import ForumBtn from "../../components/ForumBtns/ForumBtn";
import FilterListIcon from "@material-ui/icons/FilterList";
import "./StudentHomePage.css";

class StudentHomePage extends Component {
  render() {
    return (
      <div className="studenthomepage">
        <div className="leftsection">
          <h2>My Forums</h2>
          <div className="forums">
            <ForumBtn
              color="papayawhip"
              hovercolor="peachpuff"
              forumTitle="CZ3002 ASE"
            />
            <ForumBtn
              color="lightcyan"
              hovercolor="darkcyan"
              forumTitle="CZ3001 ACOA"
            />
            <ForumBtn
              color="lavender"
              hovercolor="darkslateblue"
              forumTitle="CZ1007 Data Structures"
            />
          </div>
        </div>

        <div className="rightsection">
          <div className="topbar">
            <h2>Recent Posts</h2>
            <FilterListIcon />
          </div>
          <Post />
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
