import React, { Component } from "react";
import Post from "../../components/Post/Post";
import "./PostDetailPage.css";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import SubforumButton from "../../components/ForumButtons/SubforumButton";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import FilterListRoundedIcon from "@material-ui/icons/FilterListRounded";
import { Link } from "react-router-dom";
import Comments from "./../../components/Comments/Comments";
import AltComments from "./../../components/AltComments/AltComments";
import postService from "./../../services/post";

const useStyles = (theme) => ({
  textField: {
    top: '20px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  submitBtn: {
    top: '40px',
    textAlign: 'right',
  }
});

class PostDetailPage extends Component {
  constructor(props) {
    super(props);
    // const id = this.props.match.params.id;

    this.state = {
      id: this.props.match.params.id,
      postTitle: null,
      postDesc: null,
      postComments: null,
      postVotes: null,
      poster: null,
      postTime: null,
    };
  }
  componentDidMount() {
    postService.getIndivPost(`${this.state.id}`).then((post) => {
      // console.log(forumData);
      console.log(post);
      this.setState({
        ...this.state,
        ...{
          postTitle: post.title,
          postDesc: post.description,
          postComments: post._comments,
          postVotes: post.votes,
          poster: post._poster.username,
          postTime: post.createdAt,
        },
      });
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="postdetailpage">
        <div className="leftsection">
          <h2>CZ3002 ASE</h2>
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
            username={this.state.poster}
            title={this.state.postTitle}
            content={this.state.postDesc}
          />

          <TextField
            variant="outlined"
            className = { classes.textField }
            label=" New Comment"
            value={this.props.reply}
          />
          <Grid container justify="flex-end">
            <Button variant="contained" className = { classes.submitBtn }>Submit</Button>
          </Grid>

          <div className="topbar">
            <h2>Replies</h2>
          </div>
          {this.state.postComments &&
            this.state.postComments.map((comment) => (
              <AltComments
                text={comment.text}
                username={comment._commenter.username}
                numLikes={comment.votes}
                createdAt={comment.createdAt}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles) (PostDetailPage);
