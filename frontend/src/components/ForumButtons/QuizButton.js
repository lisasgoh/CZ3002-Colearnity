import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

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
  } = props;

  const useStyles = makeStyles({
    root: {
      // minWidth: 200,
      width: 160,
      borderRadius: "6px",
      padding: "6px",
      margin: "10px 10px",
      backgroundColor: completed ? "powderblue" : "salmon",
      "&:hover": {
        backgroundColor: completed ? "lightblue" : "darksalmon",
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
            {completed ? <p>Completed: {completionDate}</p> : ""}
            <p>Due: {dueDate}</p>
            {completed ? <p>Grade: {grade}</p> : <p />}
          </>
        )}
      </CardContent>
      <CardActions>
        {isAdmin ? (
          <Button size="small">Review Results</Button>
        ) : (
          <>
            {completed ? (
              <Button size="small">Review Quiz Attempt</Button>
            ) : (
              <Button size="small">Attempt Quiz</Button>
            )}
          </>
        )}
      </CardActions>
    </Card>
  );
}
