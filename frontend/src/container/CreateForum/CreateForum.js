import React, { useState } from 'react';
import ForumButton from "../../components/ForumButtons/ForumButton";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import NewForum from "../../components/NewForum/NewForum";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./CreateForum.css";

import forumService from "./../../services/forum";

export default function CreateForum() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [is_sub, setIsSub] = useState("false");
  const history = useHistory();

  function validateForm() {
    return name.length > 0 && desc.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await forumService.createMainForum(name, desc);
      history.push("/homepage");
    } catch (e) {
      alert(e.message);
    }
  }

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
        <h1>Create Forum</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="name" bsSize="large">
            <FormLabel>Forum Name</FormLabel>
            <FormControl
              autoFocus
              type="name"
              placeholder="Enter forum name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="desc" bsSize="large">
            <FormLabel>Description</FormLabel>
            <FormControl
              type="desc"
              placeholder="Enter description"
              value={desc}
              onChange={e => setDesc(e.target.value)}
            />
          </FormGroup>
          <Button block disabled={!validateForm()} type="submit">Create</Button>
        </form>
      </div>
    </div>
  );
}

// export default CreateForum;
