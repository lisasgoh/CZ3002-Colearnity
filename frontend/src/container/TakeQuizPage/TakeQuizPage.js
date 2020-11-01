import React, { Component, useState, useEffect } from "react";
import QuizQns from "../../components/QuizQns/QuizQns";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import StepContent from "@material-ui/core/StepContent";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./TakeQuizPage.css";

import quizService from "./../../services/quiz";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

const quizValues = [];
// function getSteps() {
//   return ["Question 1", "Question 2", "Question 3", "Question 4"];
// }

function callbackQuiz(value) {
  console.log(value);
  console.log("index: " + value[0] + " & value: " + value[1]);
  quizValues[value[0] - 1] = value[1];
  console.log("quizvalues: " + quizValues);
}

function getStepContent(question, value, index) {
  console.log(question);

  return (
    <QuizQns
      qn={question.title}
      qnNum={question.questionNumber}
      qnWeightage={question.points}
      options={question.options}
      disabled={false}
      initialValue={value}
      parentCallback={callbackQuiz}
    />
  );
}

export default function TakeQuizPage(props) {
  // constructor(props) {
  //     super();
  //     this.setActiveStep = { activeStep: '0' };
  // }
  const [quizID, setID] = useState(props.location.state.quizID);
  const [subforumID, setSubforumID] = useState(null);
  // console.log("QUIZID IMPORT: " + quizID);
  const [quizTitle, setTitle] = useState(null);
  const [quizDesc, setDesc] = useState(null);
  const [quizQns, setQns] = useState([]);
  const history = useHistory();

  useEffect(() => {
    quizService.getQuiz(quizID).then((quizData) => {
      console.log(quizData);
      // setID(quizData._id);
      setSubforumID(quizData._forum._id);
      setTitle(quizData.title);
      setDesc(quizData.description);
      setQns(quizData.questions);
    });
  }, []);

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const steps = quizQns.map(
    (qn, index) =>
      "Question " + (index + 1) + " (" + qn.points + " points" + ")"
  ); //array of qnNums CHANGE HERE

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    console.log("HANDLING BACK");
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    console.log(
      "HANDLING SUBMIT.quizValues: " + quizValues + "quizID: " + quizID
    );
    quizService.doQuiz(quizValues, quizID);
    history.push(`../subforumpage/${subforumID}`);
    // return <Redirect to={`../subforumpage/${forumID}`} />;
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  return (
    <div className="takequizpage">
      <div className="leftsection">
        <h2></h2>
        <Divider variant="middle" />

        {/* <h3>Quiz Progress</h3> */}
      </div>

      <div className="rightsection">
        <div className="topbar">
          <h2>{quizTitle}</h2>
        </div>
        <div className={classes.root}>
          <Stepper nonLinear activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepButton
                  onClick={handleStep(index)}
                  completed={completed[index]}
                >
                  {label}
                </StepButton>
                <StepContent>
                  {getStepContent(quizQns[index], quizValues[index], index)}
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={
                          activeStep === steps.length - 1
                            ? handleSubmit
                            : handleNext
                        }
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? "Submit" : "Next"}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
              {/* <Typography>All steps completed - you&apos;re finished</Typography>
                            <Button onClick={handleReset} className={classes.button}>
                                Reset
                            </Button> */}
            </Paper>
          )}
        </div>

        {/* <Button>Submit</Button> */}
      </div>
    </div>
  );
  // }
}

// export default withStyles(useStyles) (TakeQuizPage);
