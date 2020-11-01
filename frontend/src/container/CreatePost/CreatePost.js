import React, { Component } from "react";
import "./CreatePost.css";
import Post from "../../components/Post/Post";
import { Button } from "../../components/Button/Button";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import SubforumButton from "../../components/ForumButtons/SubforumButton";
import NewPost from "./../../components/NewPost/NewPost";

// import { Link } from 'react-router-dom';

import postService from './../../services/post';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    title: "",
    content: "",
    tags: "",
    forum_id: this.props.location.state.forum_id,
  };

  validateForm() {
    console.log(this.state.title);
    console.log(this.state.content);
    return this.state.title.length > 0 && this.state.content.length > 0;
  }

  handleSubmit = (event) => {
    console.log("Submit a post");
    event.preventDefault();
    // console.log(this.props.location);
    // const { forum_id } = this.props.location;
    console.log(this.state.forum_id);

    const post = {
      title: this.state.title,
      description: this.state.content,
      // postTags: this.state.tags,
    };
    postService.create(post, this.state.forum_id)
      .then((newPost) => {
        console.log(newPost);
        this.props.history.push(`/postdetailpage/${newPost._id}`);
      })
      .catch((err => console.log(err)));
  };

  render() {
    return (
      <div className="forumpage">
        {/* <div className="leftsection_createpost">
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
        </div> */}

          <div className="rightsection_createpost">
            <div className="NewPost">
                <h1>Add a Post</h1>
                <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="text" bsSize="large">
                  <FormLabel>Title</FormLabel>
                  <FormControl
                    autoFocus
                    type="text"
                    placeholder="Enter post title"
                    value={this.state.title}
                    onChange={e => this.setState({title: e.target.value})}
                  />
                </FormGroup>
                <FormGroup controlId="text" bsSize="large">
                  <FormLabel>Content</FormLabel>
                  <FormControl
                    rows="10"
                    autoFocus
                    type="text"
                    placeholder="Enter post content"
                    value={this.state.content}
                    onChange={event => this.setState({content: event.target.value})}
                  />
                </FormGroup>
                {/* <label>Tags</label>
                <select value={this.state.tags} onChange={(event) => this.setState({tags: event.target.value})}>
                    <option value="CZ3006">CZ3006 ASE</option>
                    <option value="CZ3001">CZ3001 ACOA</option>
                </select> */}
                <Button disabled={!this.validateForm()} type="submit">Create Post</Button>
                </form>
              </div>
          </div>
        </div>
    );
  }
}

export default CreatePost;
