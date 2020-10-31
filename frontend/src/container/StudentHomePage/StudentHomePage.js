import React, { Component } from "react";
import "./StudentHomePage.css";
import Post from "../../components/Post/Post";
import ForumButton from "../../components/ForumButtons/ForumButton";
import Filter from "../../components/Filter/Filter";
import Divider from "@material-ui/core/Divider";
import Icon from '@material-ui/core/Icon';
import { Link } from "react-router-dom";
import TeacherPost from "../../components/Post/TeacherPost";

import usersService from "../../services/users";

class StudentHomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forums: [],
      createdForums: [],
      posts: [],
      isStudent: null,
    };
  }

  componentDidMount() {
    usersService.getUserHomePage().then((userData) => {
      console.log(userData);
      console.log(this.state.posts);
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

  /* useEffect(() => {
    personService
      .getAll('http://localhost:3001/persons')
      .then(personData => {
        setPersons(personData)
      })
  }, []) */

  render() {
    const { forums, createdForums, posts, isStudent } = this.state;
    console.log(createdForums);
    let combined = ["icon", "fa fa-plus-circle"].join(" ");
    return (
      <div className="studenthomepage">
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
          <Link to={{ pathname: "/createforum" }}>
            <Icon
                className={combined}
                style={{ color: "#fa923f", fontSize: 100, margin: "0.3em" }}
            />
          </Link>
        </div>

        <div className="rightsection">
          <div className="topbar">
            <h2>Recent Posts</h2>

            <Filter />
          </div>
          {posts &&
            posts.map((post) => (
              <Post
                id={post._id}
                username={post._poster.username}
                content={post.description}
                numLikes={post.votes}
                tags={post.tags}
                title={post.title}
                userVote={post.userVote}
                isPoster={post._poster._id === localStorage.getItem("userID")}
              />
            ))}
          <Post editingaccess={true} />
        </div>
      </div>
    );
  }
}

export default StudentHomePage;
