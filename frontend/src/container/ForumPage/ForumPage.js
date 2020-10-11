import React, { Component } from "react";
import Post from "../../components/Post/Post";
import Button from "@material-ui/core/Button";
import SubforumButton from "../../components/ForumButtons/SubforumButton";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import FilterListRoundedIcon from "@material-ui/icons/FilterListRounded";
import { Link } from 'react-router-dom';
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
      forumMembership: null,
    };
  }

  componentDidMount() {
    API.get("/forum/5f7f81aeacc7375f68ca66e5").then((response) => {
      const forumData = response.data;
      console.log(forumData);
      this.setState({
        ...this.state,
        ...{
          forumTitle: forumData.name,
          forumDesc: forumData.description,
          subforums: forumData._subforums,
          posts: forumData._posts,
          forumMembership: forumData.isSubscribed,
        },
      });
    });
  }

  handleMembershipChange = (event) => {
    this.setState({ forumMembership: !this.state.forumMembership });

    // const forum = {
    //   isSubscribed: this.state.forumMembership,
    // };

    // API.post("/forum/5f7f81aeacc7375f68ca66e5", { forum }).then((response) => {
    //   console.log(response.data);
    // });
  };

  render() {
    const {
      forumTitle,
      forumDesc,
      subforums,
      posts,
      forumMembership,
    } = this.state;

    return (
      <div className="forumpage">
        <div className="leftsection">
          <h2>{forumTitle}</h2>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={this.handleMembershipChange}
          >
            {forumMembership ? "Leave Forum" : "Join Forum"}
          </Button>
          <p>{forumDesc}</p>

          <h3>Subforums</h3>
          <div className="subforums">
            <SubforumButton subforumTitle="CZ3002 ASE" />
            <SubforumButton subforumTitle="CZ3001 ACOA" />
            <SubforumButton subforumTitle="CZ1007 Data Structures" />
            {subforums &&
              subforums.map((subforum) => (
                <SubforumButton subforumTitle={subforum.name} />
              ))}
          </div>
        </div>

        <div className="rightsection">
          <div className="topbar">
            <Link to="/createpost"><AddCircleOutlineRoundedIcon /></Link>
            <h2>Recent Posts</h2>
            <FilterListRoundedIcon />
          </div>
          {posts &&
            posts.map((post) => (
              <Post
                username={post._poster.username}
                content={post.description}
                numLikes={post.votes}
                tags={post.tags}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default ForumPage;
