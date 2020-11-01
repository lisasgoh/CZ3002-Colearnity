import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import DeletePostPopup from "./../Popup/Popup";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpAltRoundedIcon from "@material-ui/icons/ThumbUpAltRounded";
import ThumbDownAltOutlinedIcon from "@material-ui/icons/ThumbDownAltOutlined";
import ThumbDownAltRoundedIcon from "@material-ui/icons/ThumbDownAltRounded";
import Button from "@material-ui/core/Button";

import voteService from "./../../services/vote";

const useStyles = makeStyles((theme) => ({
  root: {
    //maxWidth: 345,
    marginTop: "1em",
    border: "1px solid rgba(0, 0, 0, 0.05)",
  },
  head: {
    display: "flex",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    textAlign: "left",
    alignSelf: "stretch",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function AltComments(props) {
  const classes = useStyles();

  let {
    id,
    text,
    username,
    userVote,
    numLikes,
    createdAt,
    isAdmin,
    isPoster,
  } = props;

  console.log(props);
  //FOR LIKES
  const [liked, setLiked] = useState(userVote > 0); //props.liked
  const [disliked, setDisliked] = useState(userVote < 0);
  const [likesDisplay, setLikesDisplay] = useState(numLikes);
  const setLikeHandler = () => {
    let difference = 0;
    if (!liked) {
      if (disliked) {
        setDisliked(false);
        difference += 1;
      }
      setLiked(!liked);
      difference += 1;
    } else {
      setLiked(!liked);
      difference -= 1;
    }

    setLikesDisplay(likesDisplay + difference);
    // voteService.votePost(difference, id);
    if (difference > 0) {
      voteService.votePost(+1, id);
    } else {
      voteService.votePost(-1, id);
    }
  };
  const setDislikeHandler = () => {
    let difference = 0;
    if (!disliked) {
      if (liked) {
        setLiked(false);
        difference -= 1;
      }
      setDisliked(!disliked);
      difference -= 1;
    } else {
      setDisliked(!disliked);
      difference += 1;
    }
    setLikesDisplay(likesDisplay + difference);
    // voteService.votePost(difference, id);
    if (difference > 0) {
      voteService.votePost(+1, id);
    } else {
      voteService.votePost(-1, id);
    }
  };

  //FOR DELETES
  const [modalShow, setModal] = useState(false);
  const modalHandlerFalse = () => {
    setModal(false);
  };

  const modalHandlerTrue = () => {
    setModal(true);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.head}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {username[0]}
          </Avatar>
        }
        title={username}
        subheader={createdAt}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          style={{ textAlign: "left" }}
        >
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <div className="actionbar">
          <IconButton
            aria-label="upvote"
            color="primary"
            size="small"
            onClick={setLikeHandler}
          >
            {liked ? <ThumbUpAltRoundedIcon /> : <ThumbUpAltOutlinedIcon />}
          </IconButton>
          <IconButton
            aria-label="downvote"
            color="primary"
            size="small"
            onClick={setDislikeHandler}
          >
            {disliked ? (
              <ThumbDownAltRoundedIcon />
            ) : (
              <ThumbDownAltOutlinedIcon />
            )}
          </IconButton>

          <span> {likesDisplay} Votes</span>
          {isAdmin || isPoster ? (
            <Button
              color="primary"
              size="small"
              startIcon={<DeleteRoundedIcon />}
              onClick={modalHandlerTrue}
            >
              Delete
            </Button>
          ) : (
            ""
          )}
          <DeletePostPopup show={modalShow} onHide={modalHandlerFalse} />
        </div>
      </CardActions>
    </Card>
  );
}
