import React, { Component } from "react";
import Post from "../../components/Post/Post";
import Button from "@material-ui/core/Button";
import SubforumButton from "../../components/ForumButtons/SubforumButton";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import FilterListRoundedIcon from "@material-ui/icons/FilterListRounded";
import "./ForumPage.css";

class ForumPage extends Component {
  render() {
    return (
      <div className="forumpage">
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

          <h3>Subforums</h3>
          <div className="subforums">
            <SubforumButton subforumTitle="CZ3002 ASE" />
            <SubforumButton subforumTitle="CZ3001 ACOA" />
            <SubforumButton subforumTitle="CZ1007 Data Structures" />
          </div>
        </div>

        <div className="rightsection">
          <div className="topbar">
            <AddCircleOutlineRoundedIcon />
            <h2>Recent Posts</h2>
            <FilterListRoundedIcon />
          </div>
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
