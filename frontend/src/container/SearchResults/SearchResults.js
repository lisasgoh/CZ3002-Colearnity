import React, { Component, useEffect, useState } from "react";
import Post from "../../components/Post/Post";
import ForumButton from "../../components/ForumButtons/ForumButton";
import Filter from "../../components/Filter/Filter";
import "./SearchResults.css";
import search_query from "../../services/search";


export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts:null,
    };
  }
  componentDidMount=()=>{
    search_query.searchPost(`${this.props.location.state}`).then((forum) => {
      this.setState({
          posts: forum,
      });
      console.log(forum);
    });
  }
  render(){
    return (
      <div className="searchresults">
        <div className="leftsection">
          <h2>Related Forums</h2>
          <div className="forums">
            <ForumButton
              color="papayawhip"
              hovercolor="peachpuff"
              forumTitle="CZ3002 ASE"
            />
            <ForumButton
              color="lightcyan"
              hovercolor="darkcyan"
              forumTitle="CZ3001 ACOA"
            />
            <ForumButton
              color="lavender"
              hovercolor="darkslateblue"
              forumTitle="CZ1007 Data Structures"
            />
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
                isPoster={post._poster._id == localStorage.getItem("userID")}
              />
            ))}
        </div>
      </div>
    );
  }
}