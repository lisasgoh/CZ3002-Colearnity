import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export default function SimpleCard(props) {
  const {
    quizTitle,
    completed,
    id,
    grade,
    completionDate,
    dueDate,
    isAdmin,
    completionPercentage,
    avgGrade,
    scoredMarks,
    totalMarks,
    quizAttempt,
  } = props;

  console.log(props);

  const useStyles = makeStyles({
    root: {
      // minWidth: 200,
      width: 160,
      borderRadius: "6px",
      padding: "6px",
      margin: "10px 10px",
      transition: "0.3s",
      backgroundColor: completed ? "powderblue" : "lightpink",
      "&:hover": {
        backgroundColor: completed ? "lightblue" : "hotpink",
      },
      " & h6": {
        fontSize: "1.1em",
      },
      " & p": {
        fontSize: "0.8em",
        margin: "0",
      },
      " & .MuiCardContent-root": {
        padding: "6px",
      },
      " & .MuiCardActions-root": {
        padding: "6px",
        justifyContent: "center",
      },
      " & .MuiButton-label": {
        alignContent: "center",
        fontSize: "0.8em",
      },
    },
  });
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <h6>{quizTitle}</h6>
        {isAdmin ? (
          <>
            <p>% of Students Completed: {completionPercentage}</p>
            <p>Average Grade: {avgGrade}</p>
          </>
        ) : (
          <>
            {completed ? (
              <p>Completed: {completionDate}</p>
            ) : (
              <p>Due: {dueDate}</p>
            )}

            {completed ? (
              <p>
                Grade: {scoredMarks} / {totalMarks}
              </p>
            ) : (
              <p />
            )}
          </>
        )}
      </CardContent>
      <CardActions>
        {isAdmin ? (
          <Link
            to={{
              pathname: `../viewgrades/${id}`,
            }}
          >
            <Button size="small">Review Results</Button>
          </Link>
        ) : (
          <>
            {completed ? (
              <Link
                to={{
                  pathname: `../reviewquizpage/${id}`,
                  state: { quizID: id, attemptID: quizAttempt },
                }}
              >
                <Button size="small">Review Quiz Attempt</Button>{" "}
              </Link>
            ) : (
              <Link
                to={{
                  pathname: `../takequizpage/${id}`,
                  state: { quizID: id },
                }}
              >
                <Button size="small">Attempt Quiz</Button>{" "}
              </Link>
            )}
          </>
        )}
      </CardActions>
    </Card>
  );
}
