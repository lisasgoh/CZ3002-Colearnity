import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

export default function SimpleCard(props) {
  const useStyles = makeStyles({
    root: {
      // minWidth: 200,
      width: 160,
      borderRadius: "6px",
      padding: "6px",
      margin: "10px 10px",
      backgroundColor: props.completed ? "powderblue" : "salmon",
      "&:hover": {
        backgroundColor: props.completed ? "lightblue" : "darksalmon",
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
        <h6>{props.quizTitle}</h6>
          <p>Completed: {props.completedNo}</p>
         <p>Average Grade: {props.grade}</p><p />
      </CardContent>
      <CardActions>
        
          <Button size="small">Click to Review</Button>
       
      </CardActions>
    </Card>
  );
}

