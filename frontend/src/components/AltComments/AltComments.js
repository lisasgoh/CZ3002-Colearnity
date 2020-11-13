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
import EditIcon from "@material-ui/icons/Edit";
import "./AltComments.css";

import voteService from "./../../services/vote";
import commentService from "./../../services/comment";

import { useHistory } from "react-router-dom";

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

  //console.log(props);
  //FOR LIKES
  const [liked, setLiked] = useState(userVote > 0); //props.liked
  const [disliked, setDisliked] = useState(userVote < 0);
  const [likesDisplay, setLikesDisplay] = useState(numLikes);
  const setLikeHandler = () => {
    voteService.voteComment(+1, id);
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
    // if (difference > 0) {
    //   voteService.votePost(+1, id);
    // } else {
    //   voteService.votePost(-1, id);
    // }
  };
  const setDislikeHandler = () => {
    voteService.voteComment(-1, id);
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
    // if (difference > 0) {
    //   voteService.voteComment(+1, id);
    // } else {
    //   voteService.votePost(-1, id);
    // }
  };

  //FOR DELETES
  const [modalShowDelete, setModalDelete] = useState(false);
  const [modalShowEdit, setModalEdit] = useState(false);
  const [postDescription, setPostDescription] = useState("");
  const history = useHistory();

  const modalHandlerDeleteFalse = () => {
    setModalDelete(false);
  };

  const modalHandlerDeleteTrue = () => {
    setModalDelete(true);
  };

  const modalHandlerEditFalse = () => {
    setModalEdit(false);
  };

  const modalHandlerEditTrue = () => {
    setModalEdit(true);
  };

  const setContent = (content) => {
    setPostDescription(content.target.value);
    console.log(content.target.value);
  };

  const editContent = (desc) => {
    console.log("TEST!" + desc + props.id);
    commentService.update(props.id, { text: desc }).then((newPostDesc) => {
      console.log(newPostDesc);
      history.go(0);
    });
    //history.go(0);
  };

  function handleDeleteComment() {
    try {
      commentService.deleteObj(id).then((deleteComment) => {
        console.log(deleteComment);
        history.go(0);
      });
    } catch (e) {
      alert(e.message);
    }
    return true;
  }

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
        subheader={formatDate(createdAt)}
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
        <div className="altcommentactionbar">
          <div className="actionbarrow">
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
            <span class="numText"> {likesDisplay} Votes</span>
          </div>
          <div className="actionbarrow">
            {isAdmin || isPoster ? (
              <Button
                color="primary"
                size="small"
                startIcon={<DeleteRoundedIcon />}
                onClick={modalHandlerDeleteTrue}
              >
                Delete
              </Button>
            ) : (
              ""
            )}
            <DeletePostPopup
              show={modalShowDelete}
              onHide={modalHandlerDeleteFalse}
              isDelete={true}
              deleteComment={handleDeleteComment}
            />

            {isPoster ? (
              <Button
                color="primary"
                size="small"
                startIcon={<EditIcon />}
                onClick={modalHandlerEditTrue}
              >
                Edit
              </Button>
            ) : (
              ""
            )}
            <DeletePostPopup
              show={modalShowEdit}
              onHide={modalHandlerEditFalse}
              isDelete={false}
              setContent={setContent}
              editPost={editContent}
              prevContent={props.text}
            />
          </div>
        </div>
      </CardActions>
    </Card>
  );
}
