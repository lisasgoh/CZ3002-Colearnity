import React, { Component } from "react";
import Post from "../../components/Post/Post";
import "./PostDetailPage.css";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { FormGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import AltComments from "./../../components/AltComments/AltComments";
import postService from "./../../services/post";
import commentService from "./../../services/comment";

const useStyles = (theme) => ({
  textField: {
    top: "20px",
    display: "flex",
    flexWrap: "wrap",
  },
  submitBtn: {
    top: "40px",
    textAlign: "right",
  },
});

class PostDetailPage extends Component {
  constructor(props) {
    super(props);
    // const id = this.props.match.params.id;

    this.state = {
      id: this.props.match.params.id,
      postTitle: null,
      postDesc: null,
      postComments: [],
      postVotes: null,
      poster: null,
      postTime: null,
      tags: "",
      userVote: null,
      newreply: "",
      isAdmin: this.props.location.isAdmin,
      isPoster: null,
      forumID: null,
      forumName: null,
      forumDesc: null,
      linkforums: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      ...this.state,
      ...{
        [event.target.name]: event.target.value,
      },
    });
  }

  handleSubmit(event) {
    console.log("Form was submitted");
    event.preventDefault();
    console.log(this.state);
    const comment = {
      text: this.state.newreply,
    };
    try {
      commentService.create(comment, this.state.id).then((comment) => {
        console.log(comment);
        this.props.history.go(0);
      });
    } catch (e) {
      alert(e.message);
    }
  }

  componentDidMount() {
    postService.getIndivPost(`${this.state.id}`).then((post) => {
      console.log(post);
      this.setState({
        ...this.state,
        ...{
          postVotes: post.votes,
          postTitle: post.title,
          postDesc: post.description,
          postComments: post._comments,
          tags: post._forum,
          poster: post._poster.username,
          postTime: post.createdAt,
          isPoster: post._poster._id == localStorage.getItem("userID"),
          forumID: post._forum._id,
          forumName: post._forum.name,
          forumDesc: post._forum.description,
          userVote: post.userVote,
          linkforums: post._forum.is_sub
            ? `/subforumpage/${post._forum._id}`
            : `/forumpage/${post._forum._id}`,
        },
      });
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="postdetailpage">
        <div className="leftsection">
          <Link
            to={{ pathname: this.state.linkforums }}
            style={{ color: "black" }}
          >
            <h2>{this.state.forumName}</h2>
          </Link>
          <p>{this.state.forumDesc}</p>
        </div>

        <div className="rightsection">
          <Post
            id={this.state.id}
            username={this.state.poster}
            title={this.state.postTitle}
            content={this.state.postDesc}
            numLikes={this.state.postVotes}
            isPoster={this.state.isPoster}
            tags={this.state.tags}
            userVote={this.state.userVote}
            numComments={this.state.postComments.length}
          />

          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="comment">
              <FormControl
                className={classes.textField}
                label=" New Comment"
                placeholder="Comment..."
                name="newreply"
                value={this.state.newreply}
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <Button variant="contained" type="submit" value="Submit">
              Submit
            </Button>
          </form>

          <div className="topbar">
            <h2>Comments</h2>
          </div>
          {this.state.postComments &&
            this.state.postComments.map((comment) => (
              <AltComments
                id={comment._id}
                text={comment.text}
                username={comment._commenter.username}
                userVote={comment.userVote}
                numLikes={comment.votes}
                createdAt={comment.createdAt}
                isPoster={
                  comment._commenter._id == localStorage.getItem("userID")
                }
              />
            ))}
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(PostDetailPage);
