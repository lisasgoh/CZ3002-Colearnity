import React, { Component } from "react";
import "./CreatePost.css";
import Post from "../../components/Post/Post";
import Button from "@material-ui/core/Button";
import SubforumButton from "../../components/ForumButtons/SubforumButton";
import NewPost from "./../../components/NewPost/NewPost";

// import { Link } from 'react-router-dom';

import axios from "axios";
import postService from './../../services/post';
// import API from "../../utils/API";

const url = require("url");

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    title: "CZ3006 ASE",
    content: "",
    tags: "CZ3006 ASE",
  };

  // componentDidMount() {
  //   API.get("/forum/5f7f81aeacc7375f68ca66e5").then((response) => {
  //     const forumData = response.data;
  //     console.log(forumData);
  //     this.setState({
  //       ...this.state,
  //       ...{
  //         forumTitle: forumData.name,
  //         forumDesc: forumData.description,
  //         subforums: forumData._subforums,
  //         posts: forumData._posts,
  //         forumMembership: forumData.isSubscribed,
  //       },
  //     });
  //   });
  // }

  //   handleMembershipChange = (event) => {
  //   this.setState({ forumMembership: !this.state.forumMembership });

  //   // const forum = {
  //   //   isSubscribed: this.state.forumMembership,
  //   // };

  //   // API.post("/forum/5f7f81aeacc7375f68ca66e5", { forum }).then((response) => {
  //   //   console.log(response.data);
  //   // });
  // };

  handleSubmit = (forum_id, event) => {
    console.log("Submit a post");
    event.preventDefault();
    console.log("Submit a post");

    //   API.post("/posts", params.toString(), {
    //     headers: {
    //       authorization: `Token ${auth_token}`
    //     },
    //     data: { post }
    //  })
    console.log(post);
    // console.log(this.props.location);
    // const { forum_id } = this.props.location;
    console.log(this.state.forum_id);

    const post = {
      title: this.state.title,
      description: this.state.description,
      is_sub: false,
      // postTags: this.state.tags,
    };
    postService.create(post, forum_id)
      .then((newPost) => console.log(newPost))
      .catch((err => console.log(err)));
  };

  render() {
    return (
      <div className="forumpage">
        <div className="leftsection_createpost">
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

          <h3>Subforums</h3>
          <div className="subforums">
            <SubforumButton subforumTitle="CZ3002 ASE" />
            <SubforumButton subforumTitle="CZ3001 ACOA" />
            <SubforumButton subforumTitle="CZ1007 Data Structures" />
          </div>
        </div>

          <div className="rightsection_createpost">
          <NewPost/>
          </div>
        </div>
    );
  }
}

export default CreatePost;
