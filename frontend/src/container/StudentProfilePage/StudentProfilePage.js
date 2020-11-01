import React, { Component } from "react";
import Post from "../../components/Post/Post";
import "./StudentProfilePage.css";
import ProfilePic from "../../assets/profile_placeholder.png";
import ProfileCard from "./ProfileCard";
import Button from "@material-ui/core/Button";
import QuizButton from "../../components/ForumButtons/QuizButton";
import Grid from "@material-ui/core/Grid";
import { Redirect } from "react-router-dom";

import usersService from "../../services/users";

class StudentProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      posts: [], //posts are from all forums, not user posts - consider how to populate
      grades: [],
    };
  }

  componentDidMount() {
    usersService.getUser().then((userData) => {
      console.log(userData);
      this.setState({
        ...this.state,
        ...{
          username: userData.username,
          posts: userData._posts,
          grades: userData._attempts,
        },
      });
    });
  }

  state = {
    navigate: false,
  };

  logout = () => {
    localStorage.clear("token");
    this.setState({ navigate: true });
  };

  render() {
    const { username, posts, grades } = this.state;
    const { navigate } = this.state;
    if (navigate) {
      return <Redirect to="/" push={true} />;
    }

    const ColoredLine = ({ color }) => (
      <hr
        style={{
          color: color,
          backgroundColor: color,
          height: 1,
          width: "100%",
        }}
      />
    );

    return (
      <div className="container">
        <div className="logout">
          <Grid container justify="flex-end">
            <Button variant="contained" onClick={this.logout}>
              Logout
            </Button>
          </Grid>
        </div>
        <img className="profilepic" src={ProfilePic} alt="Logo" />
        <h1>{username}</h1>
        <ColoredLine color="grey" />

        <div className="row_container">
          <div className="profile_post">
            <p1 className="profile_post_header">
              <b>My Posts</b>
            </p1>
            {posts &&
              posts.map((post, index) => (
                <Post
                  title={post.title}
                  username={username} //all posts should be made by user on profile page
                  content={post.description}
                  numLikes={post.votes}
                  tags={post.tags}
                  isPoster={post._poster._id == localStorage.getItem("userID")}
                  postID = {post._id}
                />
              ))}
          </div>
          <div className="profile_grades">
            <p1 className="profile_post_header">
              <b>Grades</b>
            </p1>
            {grades &&
              grades.map((grade) => (
                <QuizButton
                  quizTitle={grade._quiz.title}
                  id={grade._quiz._id}
                  scoredMarks={grade.marks}
                  totalMarks={grade.total}
                  quizAttempt={grade._id}
                  isAdmin={false} //grades only for students
                  completed={true}
                />
              ))}
            {/* {grades &&
              grades.map((grade, index) => (
                <ProfileCard
                  scoredMarks={grade.marks}
                  totalMarks={grade.total}
                  quizTitle={grade._quiz.title}
                  quizAttempt={grade._attempts}
                />
              ))} */}
          </div>
        </div>
      </div>
    );
  }
}

export default StudentProfilePage;
