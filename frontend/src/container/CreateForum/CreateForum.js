import React, { useState, useEffect } from "react";
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
    if (props.location.state.forum_id != null) {
      setID(props.location.state.forum_id);
      setIsSub(true);
    }
  }, []);

  function validateForm() {
    return name.length > 0 && desc.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    try {
      const forum = {
        name: name,
        description: desc,
        is_sub: is_sub,
      };
      if (is_sub === true) {
        forumService.createSubForum(forum, forumID).then((forumData) => {
          history.push(`/subforumpage/${forumData._id}`);
        });
      } else {
        forumService.createMainForum(forum).then((forumData) => {
          history.push(`/forumpage/${forumData._id}`);
        });
      }
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div className="createforum">
      <div className="leftsection"></div>

      <div className="rightsection_createforum">
        <div className="NewForum">
          <h1>Create {is_sub === true ? "Sub" : "Main"} Forum</h1>
          <form onSubmit={handleSubmit}>
            <FormGroup controlId="name" bsSize="large">
              <FormLabel>Forum Name</FormLabel>
              <FormControl
                autoFocus
                type="text"
                placeholder="Enter forum name"
                value={name}
                style={{ minWidth: "400px" }}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="desc" bsSize="large">
              <FormLabel>Description</FormLabel>
              <FormControl
                as="textarea"
                rows={8}
                autoFocus
                type="text"
                placeholder="Enter description"
                value={desc}
                style={{ minWidth: "400px" }}
                onChange={(e) => setDesc(e.target.value)}
              />
            </FormGroup>
            <Button disabled={!validateForm()} type="submit">
              Create
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
