import React, { Component } from "react";
import Post from "../../components/Post/Post";
import QuizButton from "../../components/ForumButtons/QuizButton";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import FilterListRoundedIcon from "@material-ui/icons/FilterListRounded";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";
import "./TeacherSubforumPage.css";
import API from "../../utils/API";

class TeacherSubforumPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subforumTitle: null,
      subforumDesc: null,
      quizzes: null,
      posts: null,
    };
  }

  componentDidMount() {
    API.get("/forum/5f7f81aeacc7375f68ca66e5").then((response) => {
      const forumData = response.data;
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
    let combined = ["icon", "fa fa-plus-circle"].join(" ");
    return (
      <div className="teachersubforumpage">
        <div className="leftsection">
          <h2>{subforumTitle}</h2>
          <Divider variant="middle" />

          <h3>Quizzes</h3>
          <div className="quizzes">
            {quizzes &&
              quizzes.map((quiz) => <QuizButton quizTitle={quiz.title} />)}
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
          <Icon
            className={combined}
            style={{ color: "#fa923f", fontSize: 100, margin: "0.3em" }}
          />
        </div>

        <div className="rightsection">
          <div className="topbar">
            <AddCircleOutlineRoundedIcon />
            <h2>Recent Posts</h2>
            <FilterListRoundedIcon />
          </div>
          {posts &&
            posts.map((post) => (
              <Post
                username={post._poster.username}
                content={post.description}
                numLikes={post.votes}
                tags={post.tags}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default TeacherSubforumPage;
