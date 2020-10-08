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
        {props.completed ? (
          <p>Completed: {props.completionDate}</p>
        ) : (
          <p>Due: {props.dueDate}</p>
        )}
        {props.completed ? <p>Grade: {props.grade}</p> : <p />}
      </CardContent>
      <CardActions>
        {props.completed ? (
          <Button size="small">Review Quiz Attempt</Button>
        ) : (
          <Button size="small">Attempt Quiz</Button>
        )}
      </CardActions>
    </Card>
  );
}

// import React from "react";
// import { withStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";

// //subforum buttons have default colours
// export default function QuizButton(props) {
//   const QuizButton = withStyles({
//     root: {
//       backgroundColor: "orange", //props.colour
//       marginRight: "0.9em",
//       borderRadius: "6px",
//       padding: "30px 15px",
//       fontWeight: "bolder",
//       width: "150px",
//       height: "100px",
//       margin: "10px 10px",
//       fontSize: "1.1em",
//       textTransform: "none",
//       "&:hover": {
//         backgroundColor: "darkorange",
//         color: "black",
//       },
//     },
//   })(Button);

//   return (
//     <div>
//       <QuizButton
//         variant="contained"
//         size="small"
//         clickable
//         // className={classes.button}
//       >
//         {props.subforumTitle}
//         {}
//       </QuizButton>
//     </div>
//   );
// }
