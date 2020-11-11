import React, { Component, useEffect, useState } from "react";
import Post from "../../components/Post/Post";
import ForumButton from "../../components/ForumButtons/ForumButton";
import Filter from "../../components/Filter/Filter";
import "./SearchResults.css";
import search_query from "../../services/search";
import SubforumButton from "../../components/ForumButtons/SubforumButton";
import { Link } from "react-router-dom";

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: null,
      subforums: null,
      isSubforum: null,
      pathName: "",
    };
  }

  componentDidMount = () => {
    Promise.all([
      search_query.searchPost(`${this.props.location.state}`),
      search_query.searchForum(`${this.props.location.state}`),
    ]).then((allSearchResponses) => {
      const postSearch = allSearchResponses[0];
      const forumSearch = allSearchResponses[1];
      this.setState({
        posts: postSearch,
        subforums: forumSearch,
        pathName: forumSearch.is_sub
          ? `/subforumpage/${forumSearch._id}`
          : `/forumpage/${forumSearch._id}`,
      });
      console.log(postSearch);
      console.log(forumSearch);
      console.log("ISSUB?" + forumSearch.is_sub);
    });
  };

  render() {
    return (
      <div className="searchresults">
        <div className="leftsection">
          <h2>Related Forums</h2>
          <div className="forums">
            {this.state.subforums &&
              this.state.subforums.map((subforum) => (
                <Link
                  to={{
                    pathname: subforum.is_sub
                      ? `/subforumpage/${subforum._id}`
                      : `/forumpage/${subforum._id}`,
                  }}
                >
                  <SubforumButton
                    subforumTitle={subforum.name}
                    _id={subforum._id}
                  />
                </Link>
              ))}
          </div>
        </div>
        <div className="rightsection">
          <div className="topbar">
            <h2>Recent Posts for "{this.props.location.state}"</h2>
            <Filter />
          </div>
          {this.state.posts &&
            this.state.posts.map((post) => (
              <Post
                id={post._id}
                username={post._poster.username}
                content={post.description}
                numLikes={post.votes}
                tags={post.tags}
                title={post.title}
                userVote={post.userVote}
                isPoster={post._poster._id == localStorage.getItem("userID")}
              />
            ))}
        </div>
      </div>
    );
  }
}
