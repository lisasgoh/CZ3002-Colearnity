import React, { Component } from "react";
import Post from "../../components/Post/Post";
import QuizButton from "../../components/ForumButtons/QuizButton";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import FilterListRoundedIcon from "@material-ui/icons/FilterListRounded";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";
import { Link } from "react-router-dom";
import "./SubforumPage.css";

// import API from "../../utils/API";
import forumService from "./../../services/forum";

class SubforumPage extends Component {
  constructor(props) {
    super(props);
    // const id = this.props.match.params.id;

    this.state = {
      id: this.props.match.params.id,
      subforumTitle: null,
      subforumDesc: null,
      quizzes: null,
      posts: null,
      isAdmin: null,
      isSub: null,
      subForumID: null,
    };
  }

  componentDidMount() {
    forumService.getForum(`${this.state.id}`).then((forumData) => {
      console.log("subforum data:");
      console.log(forumData);
      this.setState({
        ...this.state,
        ...{
          subforumTitle: forumData.name,
          subforumDesc: forumData.description,
          quizzes: forumData._quizzes,
          posts: forumData._posts,
          isAdmin: forumData._teacher._id == localStorage.getItem("userID"), //forumData.isAdmin,
          isSub: forumData.is_sub,
          subForumID: forumData._id,
        },
      });
    });
  }

  render() {
    const {
      id,
      subforumTitle,
      subforumDesc,
      quizzes,
      posts,
      isAdmin,
    } = this.state;
    // let combined = ["icon", "fa fa-plus-circle"].join(" ");

    console.log(posts);
    return (
      <div className="subforumpage">
        <div className="leftsection">
          <h2>{subforumTitle}</h2>
          <p>{subforumDesc}</p>
          <Divider variant="middle" />

          <h3>Quizzes</h3>
          <div className="quizzes">
            {/* <QuizButton
              quizTitle="Quiz 1"
              completed={true}
              completionDate="11/9/2020"
              grade="10/10"
            /> */}
            {quizzes &&
              quizzes.map((quiz) => (
                <Link
                  to={{
                    pathname: isAdmin
                      ? "/"
                      : quiz.taken
                      ? `/forum/reviewquizpage/${quiz._id}`
                      : `/forum/takequizpage/${quiz._id}`,
                    quizID: quiz._id,
                  }}
                >
                  <QuizButton
                    quizTitle={quiz.title}
                    id={quiz._id}
                    isAdmin={isAdmin}
                  />
                </Link>
              ))}
            <Link
              to={{
                pathname: "/teachercreatequiz",
                state: { subforum_id: id },
              }}
            >
              {isAdmin ? (
                <AddCircleOutlineRoundedIcon
                  style={{ color: "#fa923f", fontSize: 100, margin: "0.3em" }}
                />
              ) : (
                ""
              )}
            </Link>

            {/* <QuizButton
              quizTitle="Quiz 2"
              completed={true}
              completionDate="25/9/2020"
              grade="6/10"
            />
            <QuizButton
              quizTitle="Quiz 3"
              completed={false}
              dueDate="25/12/2020"
            /> */}
          </div>
        </div>

        <div className="rightsection">
          <div className="topbar">
            <Link to={{ pathname: "/createpost", state: { forum_id: id } }}>
              <AddCircleOutlineRoundedIcon />
            </Link>
            <h2>Recent Posts</h2>
            <FilterListRoundedIcon />
          </div>
          {posts &&
            posts.map((post) => (
              <Post
                id={post._id}
                username={post._poster.username}
                content={post.description}
                numLikes={post.votes}
                userVote={post.userVote}
                tags={post.tags}
                title={post.title}
                isAdmin={isAdmin}
                isPoster={post._poster._id == localStorage.getItem("userID")}
                isSub={this.state.isSub}
                forumID={this.state.subForumID}
                numComments={post._comments.length}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default SubforumPage;
