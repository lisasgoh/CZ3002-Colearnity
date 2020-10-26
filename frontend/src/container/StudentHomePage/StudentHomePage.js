import React, { Component } from "react";
import Post from "../../components/Post/Post";
import ForumButton from "../../components/ForumButtons/ForumButton";
import Filter from "../../components/Filter/Filter";
import "./StudentHomePage.css";
import { Link } from "react-router-dom";
import TeacherPost from "../../components/Post/TeacherPost";

// import users from "../../utils/API";

import usersService from "../../services/users";

class StudentHomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forums: [],
      posts: [], //posts are from all forums, not user posts - consider how to populate
      isStudent: null,
    };
  }

  componentDidMount() {
    usersService.getUserHomePage().then((userData) => {
      console.log(userData);
      var i, j;
      for (i = 0; i < userData._forums.length; i++) {
        for (j = 0; j < userData._forums[i]._posts.length; j++) {
          this.state.posts.push(userData._forums[i]._posts[j]);
        }
      }
      console.log(this.state.posts);
      this.setState({
        ...this.state,
        ...{
          forums: userData._forums,
          // posts: userData._forums.filter((forum) => forum._posts),
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
    const { forums, posts, isStudent } = this.state;
    console.log(forums);
    console.log(posts);
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
          {posts &&
            posts.map((post) => (
              <Post
                title={post.title}
                username={post._poster.username}
                content={post.description}
                numLikes={post.votes}
                tags={post.tags}
              />
            ))}
          <Post editingaccess={true} />
        </div>
      </div>
    );
  }
}

export default StudentHomePage;
