import React, { Component } from "react";
import Post from "../../components/Post/Post";
import Button from "@material-ui/core/Button";
import SubforumButton from "../../components/ForumButtons/SubforumButton";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import FilterListRoundedIcon from "@material-ui/icons/FilterListRounded";
import Icon from '@material-ui/core/Icon';
import { Link } from "react-router-dom";
import "./ForumPage.css";

import forumService from "./../../services/forum";

class ForumPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      forumTitle: null,
      forumDesc: null,
      subforums: null,
      posts: null,
      forumMembership: null,
      isAdmin: null,
    };
  }

  componentDidMount() {
    forumService
      .getForum(`${this.state.id}`)
      .then((response) => console.log(response));

    forumService.getForum(`${this.state.id}`).then((forum) => {
      this.setState({
        ...this.state,
        ...{
          forumID: forum._id,
          forumTitle: forum.name,
          forumDesc: forum.description,
          subforums: forum._subforums,
          posts: forum._posts,
          forumMembership: forum.isSubscribed,
          isAdmin: false, //forum.isAdmin,
        },
      });
    });
  }

  handleMembershipChange = (event) => {
    this.setState({ forumMembership: !this.state.forumMembership });
    console.log(this.state.id);
    forumService.toggleSubscribe(this.state.id);

    // const forum = {
    //   isSubscribed: this.state.forumMembership,
    // };
  };

  render() {
    const {
      forumID,
      forumTitle,
      forumDesc,
      subforums,
      posts,
      forumMembership,
      isAdmin,
    } = this.state;
    console.log(forumMembership);
    let combined = ["icon", "fa fa-plus-circle"].join(" ");
    return (
      <div className="forumpage">
        <div className="leftsection">
          <h2>{forumTitle}</h2>
          {isAdmin ? (
            <Button variant="contained" color="secondary" size="small">
              owner
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={this.handleMembershipChange}
            >
              {forumMembership ? "Leave Forum" : "Join Forum"}
            </Button>
          )}
          <p>{forumDesc}</p>
          <h3>Subforums</h3>
          <div className="subforums">
            {/* <SubforumButton subforumTitle="CZ3002 ASE" />
            <SubforumButton subforumTitle="CZ3001 ACOA" />
            <SubforumButton subforumTitle="CZ1007 Data Structures" /> */}
            {subforums &&
              subforums.map((subforum) => (
                <Link to={{ pathname: `/subforumpage/${subforum._id}` }}>
                  <SubforumButton
                    subforumTitle={subforum.name}
                    _id={subforum._id}
                  />
                </Link>
              ))}
          </div>
          <Link to={{ pathname: "/createforum", state: { forum_id: forumID } }}>
            <Icon
                className={combined}
                style={{ color: "#fa923f", fontSize: 100, margin: "0.3em" }}
            />
          </Link>
        </div>

        <div className="rightsection">
          <div className="topbar">
            <Link to={{ pathname: "/createpost", state: { forum_id: forumID } }}>
              <AddCircleOutlineRoundedIcon />
            </Link>
            <h2>Recent Posts</h2>
            <FilterListRoundedIcon />
          </div>

          {posts &&
            posts.map((post) => (
              <Post
                id={post._id}
                username={post._poster.username}
                content={post.description}
                numLikes={post.votes}
                tags={post.tags}
                title={post.title}
                isAdmin={isAdmin}
                isPoster={post._poster._id == localStorage.getItem("userID")}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default ForumPage;
