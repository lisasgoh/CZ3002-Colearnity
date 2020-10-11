import React, { Component } from "react";
import Post from "../../components/Post/Post";
import Button from "@material-ui/core/Button";
import SubforumButton from "../../components/ForumButtons/SubforumButton";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import FilterListRoundedIcon from "@material-ui/icons/FilterListRounded";
import "./ForumPage.css";

import API from "../../utils/API";

class ForumPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forumTitle: null,
      forumDesc: null,
      subforums: null,
      posts: null,
    };
  }

  async componentDidMount() {
    await API.get("/forum/{uuid}").then((response) => {
      const forumData = response.data;
      this.setState({
        ...this.state,
        ...{
          forumTitle: forumData.name,
          forumDesc: forumData.description,
          subforums: forumData.subforums,
          posts: forumData.posts,
        },
      });
    });
  }

  render() {
    const { forumTitle, forumDesc, subforums, posts } = this.state;

    return (
      <div className="forumpage">
        <div className="leftsection">
          <h2>CZ3002 ASE {forumTitle}</h2>
          <Button variant="contained" color="secondary" size="small">
            Join Forum
          </Button>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            pretium orci eget lobortis porttitor. Praesent consectetur lacus eu
            egestas blandit. Mauris ultrices consequat diam sit amet ornare.
            Etiam elementum felis in nisl condimentum scelerisque. Integer
            scelerisque turpis at ipsum aliquam elementum. Praesent non posuere
            sem, eget varius purus. {forumDesc}
          </p>

          <h3>Subforums</h3>
          <div className="subforums">
            <SubforumButton subforumTitle="CZ3002 ASE" />
            <SubforumButton subforumTitle="CZ3001 ACOA" />
            <SubforumButton subforumTitle="CZ1007 Data Structures" />
            {subforums.map((subforum) => (
              <SubforumButton subforumTitle={subforum.name} />
            ))}
          </div>
        </div>

        <div className="rightsection">
          <div className="topbar">
            <AddCircleOutlineRoundedIcon />
            <h2>Recent Posts</h2>
            <FilterListRoundedIcon />
          </div>
          {posts.map((post) => (
            <Post
              username={post.username}
              content={post.description}
              numLikes={post.votes}
              tags={post.tags}
            />
          ))}
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
    );
  }
}

export default ForumPage;
