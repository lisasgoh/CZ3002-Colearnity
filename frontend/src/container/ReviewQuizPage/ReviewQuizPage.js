import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import QuizQns from "../../components/QuizQns/QuizQns";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import "./ReviewQuizPage.css";

import quizAttemptService from "./../../services/quizattempt";

export default function ReviewQuizPage(props) {
  let { quizID, attemptID } = props.location.state;

  const [quizTitle, setTitle] = useState(null);
  const [quizScore, setQuizScore] = useState(null);
  const [totalScore, setTotalScore] = useState(null);
  const [subforumName, setSubforumName] = useState(null);
  const [qnsAttempt, setQnsAttempt] = useState({
    quizQns: [],
    quizAttempt: [],
    quizResults: [],
  });

  useEffect(() => {
    quizAttemptService.getAttempt(attemptID).then((attemptData) => {
      console.log(attemptData);
      setTitle(attemptData._quiz.title);

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
        <div className="quizzes"></div>
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
              qnWeightage={qn.points}
              options={qn.options}
              value="option 2"
              disabled={true}
              results={qnsAttempt.quizResults[index]}
            />
          ))}

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
