import React, { Component } from "react";
import "./HomePage.css";
import Post from "../../components/Post/Post";
import ForumButton from "../../components/ForumButtons/ForumButton";
import Filter from "../../components/Filter/Filter";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";

import usersService from "../../services/users";

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forums: [],
      createdForums: [],
      posts: [],
      isStudent: null,
      filteredPosts: null,
    };
  }

  getFilteredPosts = (value) => {
    this.setState({
      filteredPosts: value,
    });
  };

  componentDidMount() {
    usersService.getUserHomePage().then((userData) => {
      this.setState({
        ...this.state,
        ...{
          forums: userData._forums,
          createdForums: userData._created_forums,
          posts: userData.homePagePosts,
          isStudent: userData.is_student,
        },
      });
    });
  }

  render() {
    const {
      forums,
      createdForums,
      posts,
      isStudent,
      filteredPosts,
    } = this.state;

    return (
      <div className="homepage">
        <div className="leftsection">
          <h2>My Forums</h2>
          <div className="forums">
            {forums &&
              forums.map((forum) => (
                <Link
                  to={{
                    pathname: `/forumpage/${forum._id}`,
                  }}
                >
                  <ForumButton forumTitle={forum.name} />
                </Link>
              ))}
          </div>
          {isStudent ? (
            ""
          ) : (
            <>
              <Divider variant="middle" />
              <h2 className="createdHeading">Forums Created</h2>
              <div className="createdforums">
                {createdForums &&
                  createdForums.map((forum) => (
                    <Link
                      to={{
                        pathname: `/forumpage/${forum._id}`,
                      }}
                    >
                      <ForumButton forumTitle={forum.name} />
                    </Link>
                  ))}
              </div>
              <Link
                to={{ pathname: "/createforum", state: { forum_id: null } }}
              >
                <AddCircleOutlineRoundedIcon
                  style={{ color: "#fa923f", fontSize: 100, margin: "0.3em" }}
                />
              </Link>
            </>
          )}
        </div>

        <div className="rightsection">
          <div className="topbar">
            <h2>Recent Posts</h2>

            <Filter posts={posts} parentCallback={this.getFilteredPosts} />
          </div>
          {filteredPosts === null
            ? posts &&
              posts.map((post) => (
                <Post
                  id={post._id}
                  username={post._poster.username}
                  content={post.description}
                  numLikes={post.votes}
                  tags={post._forum} //{post.tags}
                  title={post.title}
                  userVote={post.userVote}
                  isPoster={post._poster._id == localStorage.getItem("userID")}
                  numComments={post._comments.length}
                />
              ))
            : filteredPosts &&
              filteredPosts.map((post) => (
                <Post
                  id={post._id}
                  username={post._poster.username}
                  content={post.description}
                  numLikes={post.votes}
                  tags={post._forum} //{post.tags}
                  title={post.title}
                  userVote={post.userVote}
                  isPoster={post._poster._id == localStorage.getItem("userID")}
                  numComments={post._comments.length}
                />
              ))}
        </div>
      </div>
    );
  }
}

export default HomePage;
