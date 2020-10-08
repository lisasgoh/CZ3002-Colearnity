import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ReplyRoundedIcon from "@material-ui/icons/ReplyRounded";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import FaceRoundedIcon from "@material-ui/icons/FaceRounded";
import Chip from "@material-ui/core/Chip";
// import Typography from "@material-ui/core/Typography";

// const useStyles = makeStyles({
//   root: {
//     maxWidth: 345,
//   },
// });

export default function ForumBtn(props) {
  const ForumBtn = withStyles({
    root: {
      backgroundColor: props.color, //props.colour
      marginRight: "0.9em",
      borderRadius: "6px",
      border: "1px solid black",
      padding: "30px 15px",
      fontWeight: "bolder",
      width: "150px",
      height: "100px",
      margin: "10px",
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
      <ForumBtn
        variant="contained"
        size="small"
        clickable
        // className={classes.button}
      >
        {props.forumTitle}
      </ForumBtn>
    </div>
  );
}
