import React, { Component } from "react";
import Post from "../../components/Post/Post";
import "./PostDetailPage.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import SubforumButton from "../../components/ForumButtons/SubforumButton";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import FilterListRoundedIcon from "@material-ui/icons/FilterListRounded";
import { Link } from "react-router-dom";
import Comments from "./../../components/Comments/Comments";
import AltComments from "./../../components/AltComments/AltComments";
import postService from "./../../services/post";
import commentService from "./../../services/comment";
import { useHistory } from "react-router-dom";
import forumService from "./../../services/forum";

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
    // console.log(props.location.state);

    this.state = {
      id: this.props.match.params.id,
      postTitle: null,
      postDesc: null,
      postComments: null,
      postVotes: null,
      poster: null,
      postTime: null,
      tags: null,
      userVote: null,
      newreply: "",
      isAdmin: this.props.location.isAdmin,
      isPoster: null,
      forumIDs: null,
      linkforums: this.props.location.state.isSub
        ? `/subforumpage/${this.props.location.state.forumID}`
        : `/forumpage/${this.props.location.state.forumID}`,
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
    console.log(
      "Did it pass data: " +
        this.props.location.state.isSub +
        this.props.location.state.forumID
    );
    postService
      .getIndivPost(`${this.state.id}`)
      .then((post) => {
        // console.log(forumData);
        console.log(post);
        this.setState({
          ...this.state,
          ...{
            postVotes: post.votes,
            postTitle: post.title,
            postDesc: post.description,
            postComments: post._comments,
            poster: post._poster.username,
            postTime: post.createdAt,
            isPoster: post._poster._id == localStorage.getItem("userID"),
            forumIDs: post._forum,
            userVote: post.userVote,
          },
        });
        return forumService.getForum(post._forum);
      })
      .then((forum) => {
        console.log("Is post from subforum? " + forum.is_sub);
        this.setState({
          linkforums: forum.is_sub
            ? `/subforumpage/${this.props.location.state.forumID}`
            : `/forumpage/${this.props.location.state.forumID}`,
        });
      });
  }

  render() {
    console.log(this.state);
    console.log(
      this.props.location.state.isSub + this.props.location.state.forumID
    );
    console.log(this.state.newreply);
    const { classes } = this.props;
    return (
      <div className="postdetailpage">
        <div className="leftsection">
          <Link to={{ pathname: this.state.linkforums }}>
            <h2>CZ3002 ASE</h2>
          </Link>

          <Button variant="contained" color="secondary" size="small">
            Join Forum
          </Button>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            pretium orci eget lobortis porttitor. Praesent consectetur lacus eu
            egestas blandit. Mauris ultrices consequat diam sit amet ornare.
            Etiam elementum felis in nisl condimentum scelerisque. Integer
            scelerisque turpis at ipsum aliquam elementum. Praesent non posuere
            sem, eget varius purus.
          </p>

          {/* <h3>Subforums</h3>
          <div className="subforums">
            <SubforumButton subforumTitle="CZ3002 ASE" />
            <SubforumButton subforumTitle="CZ3001 ACOA" />
            <SubforumButton subforumTitle="CZ1007 Data Structures" />
          </div> */}
        </div>

        <div className="rightsection">
          <Post
            id={this.state.id}
            postID={this.state.id}
            username={this.state.poster}
            title={this.state.postTitle}
            content={this.state.postDesc}
            numLikes={this.state.postVotes}
            isPoster={this.state.isPoster}
            tags={this.state.tags}
            userVote={this.state.userVote}

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
          {/* <Grid container justify="flex-end"> */}
          {/* <Button
            type="submit"
            value="Submit"
            variant="contained"
            className={classes.submitBtn}
          >
            Submit
          </Button> */}
          {/* </Grid> */}

          <div className="topbar">
            <h2>Replies</h2>
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
