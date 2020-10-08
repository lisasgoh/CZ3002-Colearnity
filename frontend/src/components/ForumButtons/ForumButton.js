import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

export default function ForumButton(props) {
  const ForumButton = withStyles({
    root: {
      backgroundColor: props.color, //props.colour
      marginRight: "0.9em",
      borderRadius: "6px",
      border: "1px solid black",
      padding: "30px 15px",
      fontWeight: "bolder",
      width: "150px",
      height: "100px",
      margin: "10px 10px",
      fontSize: "1.1em",
      textTransform: "none",
      "&:hover": {
        backgroundColor: props.hovercolor,
        color: "black",
      },
    },
  })(Button);

  return (
    <div>
      <ForumButton
        variant="contained"
        size="small"
        clickable
        // className={classes.button}
      >
        {props.forumTitle}
      </ForumButton>
    </div>
  );
}
