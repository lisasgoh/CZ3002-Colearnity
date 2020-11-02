import React, { Component } from "react";
import QuizButton from "../../components/ForumButtons/QuizButton";
import NewQuizQn from "../../components/NewQuizQn/NewQuizQn";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import "./TeacherCreateQuiz.css";
import API from "../../utils/API";
import createQuizService from "../../services/quiz";
import { Link } from "react-router-dom";
import forumService from "./../../services/forum";

class TeacherCreateQuiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subforum_id: props.location.state.subforum_id,
      subforumTitle: null,
      subforumDesc: null,
      quizzes: null,
      quizTitle: null,
      questions: [],
      index: 2,
      quizIndex: [{ id: 1 }, { id: 2 }],
      qnTitle: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      optionChosen: "",
      quizMarks: 1,
    };
  }

  inputHandler = (event) => {
    this.setState({
      ...this.state,
      ...{
        [event.target.name]: event.target.value,
      },
    });
  };

  componentDidMount() {
    forumService.getForum(`${this.state.subforum_id}`).then((forumData) => {
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

  addQuestion = () => {
    this.setState({
      quizIndex: [...this.state.quizIndex, { id: ++this.state.index }],
    });
  };

  addQnList = () => {
    this.setState({
      questions: [
        ...this.state.questions,
        {
          title: this.state.qnTitle,
          points: this.state.quizMarks,
          options: [
            {
              optionNumber: 1,
              answerBody: this.state.option1,
              isCorrectAnswer:
                "Option 1".localeCompare(this.state.optionChosen) === 0,
            },
            {
              optionNumber: 2,
              answerBody: this.state.option2,
              isCorrectAnswer:
                "Option 2".localeCompare(this.state.optionChosen) === 0,
            },
            {
              optionNumber: 3,
              answerBody: this.state.option3,
              isCorrectAnswer:
                "Option 3".localeCompare(this.state.optionChosen) === 0,
            },
            {
              optionNumber: 4,
              answerBody: this.state.option4,
              isCorrectAnswer:
                "Option 4".localeCompare(this.state.optionChosen) === 0,
            },
          ],
        },
      ],
    });
  };

  logQn = () => {
    console.log(this.state.questions);
  };

  menuOpt = (evt) => {
    this.setState({
      optionChosen: evt.target.value,
    });
  };

  setQuizTitle = (evnt) => {
    this.setState({
      quizTitle: evnt.target.value,
    });
  };

  handleSubmit = async (event) => {
    const {history} = this.props;
    const { quizTitle, questions } = this.state;
    console.log("WE DONE IT" + quizTitle);
    event.preventDefault();
    try {
      //await createQuizService.postQuiz(quizTitle,questions,"5f8521b48e9dffee9f62e06a");
      await createQuizService.postQuiz(
        quizTitle,
        questions,
        this.state.subforum_id.toString()
      );
     //history.go("http://localhost:3001/teachercreatequiz");
     window.location.href = "/teacherhomepage";
    } catch (e) {
      alert("IS IT THIS?" + e.message);
    }
  };

  render() {
    const { subforumTitle, subforumDesc, quizzes } = this.state;

    return (
      <div className="teachercreatequiz">
        <div className="leftsection">
          <h2>{subforumTitle}</h2>
          <p>{subforumDesc}</p>
          <Divider variant="middle" />

          <h3>Quizzes</h3>
          <div className="quizzes">
            {quizzes &&
              quizzes.map((quiz) => <QuizButton quizTitle={quiz.title} />)}
            {/* <QuizButton
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
            /> */}
          </div>
          {/* <Icon
            className={combined}
            style={{ color: "#fa923f", fontSize: 100, margin: "0.3em" }}
          /> */}
        </div>

        <div className="rightsection">
          <div className="topbar">
            <h2>Create Quiz</h2>
          </div>

          <p>Quiz Title</p>
          <TextField
            label="Enter Quiz Title"
            variant="outlined"
            onChange={this.setQuizTitle}
          />
          {this.state.quizIndex.map((quizQn, index) => {
            return (
              <NewQuizQn
                qnNum={quizQn.id}
                click={this.inputHandler}
                addToQnList={this.addQnList}
                logMenuOpt={this.menuOpt}
              />
            );
          })}
          <Button color="primary" onClick={this.addQuestion}>
            Add New Question
          </Button>
          <Link to="/teacherhomepage" onClick={this.handleSubmit}>
          <Button color="primary" >
            Submit New Quiz
          </Button>
          </Link>
          
        </div>
      </div>
    );
  }
}

export default TeacherCreateQuiz;
