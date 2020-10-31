import React, { useState, useEffect } from 'react';
import { Button } from "../../components/Button/Button";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./CreateForum.css";

import forumService from "./../../services/forum";

export default function CreateForum(props) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [forumID, setID] = useState("");
  const [is_sub, setIsSub] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setID(props.location.state.forum_id);
    if (forumID != null) {
      setIsSub(true);
    }
  }, [])

  function validateForm() {
    console.log(name);
    console.log(desc);
    return name.length > 0 && desc.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    try {
        const forum = {
          name: name,
          description: desc,
          is_sub: is_sub,
        }
        if (is_sub === true) {
          forumService.createSubForum(forum, forumID).then((forumData) => {
            console.log(forumData._id);
            history.push(`/subforumpage/${forumData._id}`);
          });
        } else {
          forumService.createMainForum(forum).then((forumData) => {
            console.log(forumData._id);
            history.push(`/forumpage/${forumData._id}`);
          });
        }
    } catch (e) {
      alert(e.message);
    }
  }
  console.log(name);
  console.log(desc);
  console.log(forumID);
  console.log(is_sub);

  // let combined = ["icon", "fa fa-plus-circle"].join(" ");
  return (
    <div className="createforum">
      {/* <div className="leftsection">
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
      </div> */}

      <div className="rightsection_createforum">
        <h1>Create {is_sub===true? 'Sub': 'Main'} Forum</h1>
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
          <Button disabled={!validateForm()} type="submit">Create</Button>
        </form>
      </div>
    </div>
  );
}

// export default CreateForum;
