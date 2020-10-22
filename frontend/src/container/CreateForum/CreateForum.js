import React, { Component } from 'react';
import ForumButton from "../../components/ForumButtons/ForumButton";
import Icon from "@material-ui/core/Icon";
import NewForum from "../../components/NewForum/NewForum";
import "./CreateForum.css";

class CreateForum extends Component {
    render() {
        let combined = ["icon", "fa fa-plus-circle"].join(" ");
        return (
          <div className="createforum">
            <div className="leftsection">
              <h2 style={{ marginTop: "2em" }}>Forums Created</h2>
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
              <Icon
                className={combined}
                style={{ color: "#fa923f", fontSize: 100, margin: "0.3em" }}
              />
            </div>
    
            <div className="rightsection_createforum">
                <NewForum />
            </div>
          </div>
        );
      }
}

export default CreateForum;
