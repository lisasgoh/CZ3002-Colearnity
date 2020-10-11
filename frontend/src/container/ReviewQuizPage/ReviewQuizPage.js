import React, { Component } from "react";
import Post from "../../components/Post/Post";
import QuizButton from "../../components/ForumButtons/QuizButton";
import Button from "@material-ui/core/Button";
import QuizQns from "../../components/QuizQns/QuizQns";
import Divider from "@material-ui/core/Divider";
import "./ReviewQuizPage.css";

class ReviewQuizPage extends Component {
  render() {
    return (
      <div className="reviewquizpage">
        <div className="leftsection">
          <h2>Software Quality Management</h2>
          <Divider variant="middle" />

          <h3>Quizzes</h3>
          <div className="quizzes">
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
            <h2>Quiz 2: Review</h2>
            <h6>GRADE HERE IDK</h6>
          </div>
          <QuizQns
            qnNum="1"
            qnWeightage="10"
            value="option 2"
            disabled={false}
          />
          <QuizQns qnNum="2" qnWeightage="10" disabled={true} />
          <QuizQns qnNum="3" qnWeightage="10" disabled={true} />
          <QuizQns qnNum="4" qnWeightage="10" disabled={true} />
          <QuizQns qnNum="5" qnWeightage="10" disabled={true} />
          <QuizQns qnNum="6" qnWeightage="10" disabled={true} />
          <Button>
            <h4>Review Concepts</h4>
            <p>
              retake your quiz to review your concepts! note: future attempts
              will not be graded
            </p>
          </Button>
        </div>
      </div>
    );
  }
}

export default ReviewQuizPage;
