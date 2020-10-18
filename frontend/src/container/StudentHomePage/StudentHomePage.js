import React, { Component } from "react";
import Post from "../../components/Post/Post";
import ForumButton from "../../components/ForumButtons/ForumButton";
import Filter from "../../components/Filter/Filter";
import "./StudentHomePage.css";
import TeacherPost from "../../components/Post/TeacherPost";

// import users from "../../utils/API";

import usersService from "../../services/users";

class StudentHomePage extends Component {
  state = {
    forums: [],
  };

  async componentDidMount() {
    usersService.getUser().then((response) => {
      console.log(response.data);
      // this.setState({ userForums });
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
    const { classes } = this.props;
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
          {posts && posts.map((post) => (
            <Post
              username={post.username}
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
