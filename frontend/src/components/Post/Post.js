import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import QuestionAnswerRoundedIcon from "@material-ui/icons/QuestionAnswerRounded";
import FaceRoundedIcon from "@material-ui/icons/FaceRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpAltRoundedIcon from "@material-ui/icons/ThumbUpAltRounded";
import ThumbDownAltOutlinedIcon from "@material-ui/icons/ThumbDownAltOutlined";
import ThumbDownAltRoundedIcon from "@material-ui/icons/ThumbDownAltRounded";
import "./Post.css";
import { Link } from "react-router-dom";
import Update from "./../../services/post";
import { useHistory } from "react-router-dom";
import DeletePostPopup from "./../../components/Popup/Popup";

import voteService from "./../../services/vote";
import postService from "./../../services/post";

export default function Post(props) {
  let {
    id,
    title,
    username,
    content,
    numLikes,
    tags,
    isAdmin,
    isPoster,
    userVote,
    numComments,
  } = props;

  //FOR LIKES
  const [liked, setLiked] = useState(userVote > 0); //props.liked
  const [disliked, setDisliked] = useState(userVote < 0);
  const [likesDisplay, setLikesDisplay] = useState(numLikes);

  useEffect(() => {
    setLiked(userVote > 0);
    setDisliked(userVote < 0);
    setLikesDisplay(numLikes);
  }, [userVote, numLikes]);

  const setLikeHandler = () => {
    voteService.votePost(+1, id);
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
    voteService.votePost(-1, id);
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
    //   voteService.votePost(+1, id);
    // } else {
    //   voteService.votePost(-1, id);
    // }
  };

  //FOR TAGS
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
  };

  const editContent = (desc) => {
    Update.update(id, { description: desc }).then((newPostDesc) => {
      history.go(0);
    });
    history.go(0);
  };

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  function handleDelete(event) {
    event.preventDefault();
    try {
      postService.deleteObj(id).then((deletePost) => {
        console.log(deletePost);
        history.go(0);
      });
    } catch (e) {
      alert(e.message);
    }
    return true;
  }

  return (
    <div className="post">
      <Link
        to={{
          pathname: `/postdetailpage/${id}`,
          state: {
            forumID: props.forumID,
            isSub: props.isSub,
            numLikes: likesDisplay,
            liked: liked,
            disliked: disliked,
          },
        }}
        style={{ color: "black", textDecoration: "none" }}
      >
        <div className="postheader">
          <div className="posterdetails">
            <FaceRoundedIcon />
            <h6>{username}</h6>
          </div>
        </div>

        <div className="posttitle">{title}</div>

        <p>{content}</p>
      </Link>

      <div className="actionbar">
        <div className="actionbarrow">
          <Link
            to={{
              pathname: `/postdetailpage/${id}`,
              state: { forumID: props.forumID, isSub: props.isSub },
            }}
          >
            <Button
              color="primary"
              size="small"
              startIcon={<QuestionAnswerRoundedIcon />}
            >
              Comment
            </Button>
          </Link>

          <span class="numText"> {numComments} Comments</span>

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
              color="secondary"
              size="small"
              startIcon={<DeleteRoundedIcon />}
              onClick={handleClickOpen}
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
          />
          {isPoster ? (
            <Button
              color="secondary"
              size="small"
              startIcon={<EditRoundedIcon />}
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
            prevContent={content}
          />

          <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={true}
            maxWidth={"sm"}
          >
            <DialogTitle>{"Delete Post"}</DialogTitle>
            <DialogContent>
              <DialogContentText>Confirm Delete Post?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDelete} color="primary">
                Yes
              </Button>
              <Button onClick={handleClose} color="primary">
                No
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>

      <div className="tags">
        <StyledChip
          size="small"
          label={tags.name}
          clickable
          component="a"
          href={
            tags.is_sub ? `/subforumpage/${tags._id}` : `/forumpage/${tags._id}`
          }
        />
        {/* {tags &&
          tags.map((tag) => (
            <StyledChip
              size="small"
              label={tag.name}
              //   onClick={handleClick}
              clickable
              component="a"
              href="https://www.google.com"
            />
          ))} */}
      </div>
    </div>
  );
}
