import React, { useState, useEffect, useLocation } from "react";
import Post from "../../components/Post/Post";
import QuizButton from "../../components/ForumButtons/QuizButton";
import Button from "@material-ui/core/Button";
import QuizQns from "../../components/QuizQns/QuizQns";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import "./ReviewQuizPage.css";

import quizAttemptService from "./../../services/quizattempt";

export default function ReviewQuizPage(props) {
  let { quizID, attemptID } = props.location.state;
  // const quizID = quizID; //props.location.state.quizID; //useLocation();
  // const attemptID = attemptID;

  const [quizTitle, setTitle] = useState(null);
  // const [quizDesc, setDesc] = useState(null);
  const [quizScore, setQuizScore] = useState(null);
  const [totalScore, setTotalScore] = useState(null);
  // const [quizQns, setQns] = useState([]);
  const [subforumName, setSubforumName] = useState(null);
  // const [quizAttempt, setAttempt] = useState([]);

  const [qnsAttempt, setQnsAttempt] = useState({
    quizQns: [],
    quizAttempt: [],
    quizResults: [],
  });
  console.log(quizID); //should be only quizID

  useEffect(() => {
    quizAttemptService.getAttempt(attemptID).then((attemptData) => {
      console.log(attemptData);
      setTitle(attemptData._quiz.title);
      // setDesc(quizData.description);
      setQnsAttempt({
        quizQns: attemptData._quiz.questions,
        quizAttempt: attemptData.attempt,
        quizResults: attemptData.results,
      });
      setSubforumName(attemptData._quiz._forum.name);
      setQuizScore(attemptData.marks);
      setTotalScore(attemptData.total);
    });
  }, []);

  return (
    <div className="reviewquizpage">
      <div className="leftsection">
        <h2>{subforumName}</h2>
        <Divider variant="middle" />

        <h3>Quizzes</h3>
        <div className="quizzes">
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
          <Link to="/takequizpage">
            <QuizButton
              quizTitle="Quiz 3"
              completed={false}
              dueDate="25/12/2020"
            />
          </Link> */}
        </div>
      </div>

      <div className="rightsection">
        <div className="topbar">
          <h2>{quizTitle} : Review</h2>
          <h6>
            {quizScore} / {totalScore}
          </h6>
        </div>
        {qnsAttempt.quizQns &&
          qnsAttempt.quizQns.map((qn, index) => (
            <QuizQns
              qn={qn.title}
              initialValue={qnsAttempt.quizAttempt[index].toString()}
              qnNum={qn.questionNumber}
              qnWeightage="10"
              options={qn.options}
              value="option 2"
              disabled={true}
              results={qnsAttempt.quizResults[index]}
            />
          ))}
        {/* <QuizQns qnNum="" qnWeightage="10" value="option 2" disabled={false} />
         <QuizQns qnNum="2" qnWeightage="10" disabled={true} />
         <QuizQns qnNum="3" qnWeightage="10" disabled={true} />
         <QuizQns qnNum="4" qnWeightage="10" disabled={true} />
         <QuizQns qnNum="5" qnWeightage="10" disabled={true} />
         <QuizQns qnNum="6" qnWeightage="10" disabled={true} /> */}
        <Link
          to={{
            pathname: `../takequizpage/${quizID}`,
            state: { quizID: quizID },
          }}
        >
          <Button>
            <h4>Review Concepts</h4>
            <p>
              retake your quiz to review your concepts! note: future attempts
              will not be graded
            </p>
          </Button>
        </Link>
      </div>
    </div>
  );
}

// export default ReviewQuizPage;
