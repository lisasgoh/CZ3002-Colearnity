import React, { Component } from "react";
import QuizButton from "../../components/ForumButtons/QuizButton";
import NewQuizQn from "../../components/NewQuizQn/NewQuizQn";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import "./TeacherCreateQuiz.css";

import API from "../../utils/API";

class TeacherCreateQuiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subforumTitle: null,
      subforumDesc: null,
      quizzes: null,
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
        },
      });
    });
  }

  render() {
    const { subforumTitle, subforumDesc, quizzes } = this.state;
    let combined = ["icon", "fa fa-plus-circle"].join(" ");
    return (
      <div className="teachercreatequiz">
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
            <h2>Create Quiz</h2>
          </div>

          <p>Quiz Title</p>
          <TextField label="Enter Quiz Title" variant="outlined" />

          <NewQuizQn qnNum="1" />
          <NewQuizQn qnNum="2" />
          <Button color="primary">Add New Question</Button>
          <Button color="primary">Submit New Quiz</Button>
        </div>
      </div>
    );
  }
}

export default TeacherCreateQuiz;
