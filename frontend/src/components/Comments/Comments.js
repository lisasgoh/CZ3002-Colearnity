import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ReplyRoundedIcon from "@material-ui/icons/ReplyRounded";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import FaceRoundedIcon from "@material-ui/icons/FaceRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import Chip from "@material-ui/core/Chip";
import "./../Post/Post.css";
// import Typography from "@material-ui/core/Typography";

// const useStyles = makeStyles({
//   root: {
//     maxWidth: 345,
//   },
// });

export default function Post(props) {
  const [liked, setLiked] = useState(false); //props.liked
  const [numLikes, setNumLikes] = useState(20);

  const StyledChip = withStyles({
    root: {
      backgroundColor: "deeppink",
      marginRight: "0.9em",
      borderRadius: "6px",
    },
    clickable: {
      "&:hover": {
        backgroundColor: "lightpink",
        color: "black",
      },
    },
  })(Chip);

  return (
    <div className="post">
      <div className="postheader">
        <div className="posterdetails">
          <FaceRoundedIcon />
          <h6>{props.username} username here</h6>
        </div>

        {props.editingaccess ? (
          <div className="posteractivity">
            <EditRoundedIcon />
            <DeleteRoundedIcon />
          </div>
        ) : (
          ""
        )}
      </div>

      <p>
        {props.content}Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nulla pretium orci eget lobortis porttitor. Praesent consectetur lacus
        eu egestas blandit. Mauris ultrices consequat diam sit amet ornare.
        Etiam elementum felis in nisl condimentum scelerisque. Integer
        scelerisque turpis at ipsum aliquam elementum. Praesent non posuere sem,
        eget varius purus.
      </p>

      <div className="actionbar">
        <Button
          // variant="contained"
          color="primary"
          size="small"
          // className={classes.button}
          startIcon={
            liked ? <FavoriteRoundedIcon /> : <FavoriteBorderRoundedIcon />
          }
          onClick={() =>{ setLiked(!liked);
                            if (liked ===true){
                                setNumLikes(numLikes-1);
                            }else{
                                setNumLikes(numLikes+1);
                            }}}
        >
          Like
        </Button>
        <span> {props.numLikes}{numLikes} likes</span>
      </div>

      
    </div>
  );
}