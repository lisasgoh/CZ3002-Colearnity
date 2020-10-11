import React, { Component } from "react";
import "./CreatePost.css";
import Post from "../../components/Post/Post";
import Button from "@material-ui/core/Button";
import SubforumButton from "../../components/ForumButtons/SubforumButton";

class CreatePost extends Component {
  state = {
    title: "CZ3006 ASE",
    content: "",
    tags: "CZ3006 ASE",
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
          <div className="NewPost">
            <h1>Add a Post</h1>
            <label>Title</label>
            <input
              type="text"
              value={this.state.title}
              onChange={(event) => this.setState({ title: event.target.value })}
            />
            <label>Content</label>
            <textarea
              rows="10"
              value={this.state.content}
              onChange={(event) =>
                this.setState({ content: event.target.value })
              }
            />
            <label>Tags</label>
            <select
              value={this.state.tags}
              onChange={(event) =>
                this.setState({ author: event.target.value })
              }
            >
              <option value="CZ3006">CZ3006 ASE</option>
              <option value="CZ3001">CZ3001 ACOA</option>
            </select>
            <button type="submit">Add Post</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePost;
