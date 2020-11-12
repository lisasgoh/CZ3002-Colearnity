import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

//subforum buttons have default colours
export default function SubforumButton(props) {
  const SubforumButton = withStyles({
    root: {
      backgroundColor: "orange", //props.colour
      marginRight: "0.9em",
      borderRadius: "6px",
      // padding: "30px 15px",
      fontWeight: "bolder",
      width: "150px",
      height: "100px",
      margin: "10px 10px",
      fontSize: "1.1em",
      textTransform: "none",
      "&:hover": {
        backgroundColor: "darkorange",
        color: "black",
      },
    },
  })(Button);

  return (
    <div>
      <SubforumButton
        variant="contained"
        size="small"
        clickable
        // className={classes.button}
      >
        {props.subforumTitle}
      </SubforumButton>
    </div>
  );
}
