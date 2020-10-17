import React, { Component } from "react";
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
import "./TakeQuizPage.css";

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

function getSteps() {
  return ["Question 1", "Question 2", "Question 3", "Question 4"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <QuizQns qnNum="1" qnWeightage="10" />;
    case 1:
      return <QuizQns qnNum="2" qnWeightage="10" />;
    case 2:
      return <QuizQns qnNum="3" qnWeightage="10" />;
    case 3:
      return <QuizQns qnNum="4" qnWeightage="10" />;
    default:
      return "Unknown step";
  }
}

export default function TakeQuizPage() {
  // constructor(props) {
  //     super();
  //     this.setActiveStep = { activeStep: '0' };
  // }

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const steps = getSteps();

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
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
        <h2>Software Quality Management</h2>
        <Divider variant="middle" />

        {/* <h3>Quiz Progress</h3> */}
      </div>

      <div className="rightsection">
        <div className="topbar">
          <h2>Quiz 3</h2>
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
                  <Typography>{getStepContent(index)}</Typography>
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
                        onClick={handleNext}
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
