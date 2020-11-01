import React, { useState, useEffect } from "react";
import "./CreatePost.css";
import { Button } from "../../components/Button/Button";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import postService from "./../../services/post";

export default function CreateForum(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [forumID, setID] = useState("");
  const history = useHistory();

  useEffect(() => {
    setID(props.location.state.forum_id);
  }, [])

  function validateForm() {
    console.log(title);
    console.log(content);
    return title.length > 0 && content.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
<<<<<<< HEAD
    console.log(this.state.forum_id);

    const post = {
      title: this.state.title,
      description: this.state.content,
      // postTags: this.state.tags,
    };
    postService.create(post, this.state.forum_id).then((newPost) => {
      console.log(newPost);
      this.props.history.push(`/postdetailpage/${newPost._id}`);
    });
  };
=======
    try {
      const post = {
        title: title,
        description: content,
        // postTags: this.state.tags,
      };
      postService.create(post, forumID).then((newPost) => {
        console.log(newPost);
        history.push(`/postdetailpage/${newPost._id}`);
      });
    } catch (e) {
      alert(e.message);
    }
  }
>>>>>>> fe88b1237be83db9b90fb99ca0c53056ea427997

  console.log(title);
  console.log(content);
  console.log(forumID);

  // let combined = ["icon", "fa fa-plus-circle"].join(" ");
  return (
    <div className="forumpage">
      <div className="leftsection_createpost"></div>

<<<<<<< HEAD
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
                  onChange={(e) => this.setState({ title: e.target.value })}
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
                  onChange={(event) =>
                    this.setState({ content: event.target.value })
                  }
                />
              </FormGroup>
              {/* <label>Tags</label>
              <select value={this.state.tags} onChange={(event) => this.setState({tags: event.target.value})}>
                  <option value="CZ3006">CZ3006 ASE</option>
                  <option value="CZ3001">CZ3001 ACOA</option>
              </select> */}
              <Button disabled={!this.validateForm()} type="submit">
                Create Post
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePost;
=======
      <div className="rightsection_createpost">
        <div className="NewPost">
          <h1>Add a Post</h1>
          <form onSubmit={handleSubmit}>
            <FormGroup controlId="text" bsSize="large">
              <FormLabel>Title</FormLabel>
              <FormControl
                  autoFocus
                  type="text"
                  placeholder="Enter post title"
                  value={title}
                  style={{minWidth: "400px"}}
                  onChange={e => setTitle(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="text" bsSize="large">
              <FormLabel>Content</FormLabel>
              <FormControl as="textarea" rows={8}
                autoFocus
                type="text"
                placeholder="Enter post content"
                value={content}
                style={{minWidth: "400px"}}
                onChange={e => setContent(e.target.value)}
              />
            </FormGroup>
            {/* <label>Tags</label>
            <select value={this.state.tags} onChange={(event) => this.setState({tags: event.target.value})}>
                <option value="CZ3006">CZ3006 ASE</option>
                <option value="CZ3001">CZ3001 ACOA</option>
            </select> */}
            <Button disabled={!validateForm()} type="submit">Add Post</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
>>>>>>> fe88b1237be83db9b90fb99ca0c53056ea427997
