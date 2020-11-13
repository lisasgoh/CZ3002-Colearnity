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
      fontWeight: "bolder",
      width: "150px",
      height: "100px",
      margin: "10px 10px",
      fontSize: "1.1em",
      textTransform: "none",
      lineHeight: "1em",
      "&:hover": {
        backgroundColor: "darkorange",
        color: "black",
      },
    },
  })(Button);

  return (
    <div>
      <SubforumButton variant="contained" size="small" clickable>
        {props.subforumTitle}
      </SubforumButton>
    </div>
  );
}
