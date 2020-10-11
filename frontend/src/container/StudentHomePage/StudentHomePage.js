import React, { Component } from "react";
import Post from "../../components/Post/Post";
import ForumButton from "../../components/ForumButtons/ForumButton";
import Filter from "../../components/Filter/Filter";
import "./StudentHomePage.css";
import TeacherPost from "../../components/Post/TeacherPost";

import API from "../../utils/API";

class StudentHomePage extends Component {
  state = {
    forums: [],
  };

  async componentDidMount() {
    await API.get("/users/current").then((response) => {
      const userForums = response.data.forums;
      this.setState({ userForums });
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="studenthomepage">
        <div className="leftsection">
          <h2>My Forums</h2>

          <div className="forums">
            {this.state.forums.map((forum) => (
              <ForumButton forumTitle={forum.name} />
            ))}
            {/* <ForumButton
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
            /> */}
          </div>
        </div>

        <div className="rightsection">
          <div className="topbar">
            <h2>Recent Posts</h2>

            <Filter />
          </div>
          {/* THIS IS WRONG TO CHANGE IMPT CHANGE THIS */}
          {/* {this.state.posts.map((post) => (
            <Post
              username={post.username}
              content={post.description}
              numLikes={post.votes}
              tags={post.tags}
            />
          ))} */}
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
