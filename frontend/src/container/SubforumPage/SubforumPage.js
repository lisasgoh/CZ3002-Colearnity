import React, { Component } from "react";
import Post from "../../components/Post/Post";
import QuizButton from "../../components/ForumButtons/QuizButton";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import FilterListRoundedIcon from "@material-ui/icons/FilterListRounded";
import Divider from "@material-ui/core/Divider";
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
    };
  }

  componentDidMount() {
    forumService.getForum(`${this.state.id}`).then((forumData) => {
      console.log(forumData);
      this.setState({
        ...this.state,
        ...{
          subforumTitle: forumData.name,
          subforumDesc: forumData.description,
          quizzes: forumData._quizzes,
          posts: forumData._posts,
        },
      });
    });
  }

  render() {
    const { subforumTitle, subforumDesc, quizzes, posts } = this.state;

    return (
      <div className="subforumpage">
        <div className="leftsection">
          <h2>{subforumTitle}</h2>
          <Divider variant="middle" />

          <h3>Quizzes</h3>
          <div className="quizzes">
            {quizzes &&
              quizzes.map((quiz) => (
                <Link
                  to={{
                    pathname: quiz.taken
                      ? `/forum/reviewquizpage/${quiz._id}`
                      : `/forum/takequizpage/${quiz._id}`,
                    quizID: quiz._id,
                  }}
                >
                  <QuizButton quizTitle={quiz.title} _id={quiz._id} />
                </Link>
              ))}
            <QuizButton
              quizTitle="Quiz 1"
              completed={true}
              completionDate="11/9/2020"
              grade="10/10"
            />
            <QuizButton
              quizTitle="Quiz 2"
              completed={true}
              completionDate="25/9/2020"
              grade="6/10"
            />
            <QuizButton
              quizTitle="Quiz 3"
              completed={false}
              dueDate="25/12/2020"
            />
          </div>
        </div>

        <div className="rightsection">
          <div className="topbar">
            <AddCircleOutlineRoundedIcon />
            <h2>Recent Posts</h2>
            <FilterListRoundedIcon />
          </div>
          {posts &&
            posts.map((post) => (
              <Link
                to={{
                  pathname: `/postdetailpage/${post._id}`,
                }}
              >
                <Post
                  username={post._poster.username}
                  content={post.description}
                  numLikes={post.votes}
                  tags={post.tags}
                />
              </Link>
            ))}
        </div>
      </div>
    );
  }
}

export default SubforumPage;
