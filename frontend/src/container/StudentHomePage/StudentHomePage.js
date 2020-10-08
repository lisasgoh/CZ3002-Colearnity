import React, { Component } from "react";
import Post from "../../components/Post/Post";
import ForumButton from "../../components/ForumButtons/ForumButton";
import FilterListRoundedIcon from "@material-ui/icons/FilterListRounded";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@material-ui/core';
import "./StudentHomePage.css";


const styles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 130,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

class StudentHomePage extends Component {
  
  constructor(props) {
    super();
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({ value: event.target.value })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="studenthomepage">
        <div className="leftsection">
          <h2>My Forums</h2>
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
            <h2>Recent Posts</h2>

            <div className="filter">
              <FilterListRoundedIcon className="svg_icons"/>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Filter Post</InputLabel>
                <Select value={this.state.value} onChange={this.handleChange}>
                  <MenuItem value="">
                    <em>All Courses</em>
                  </MenuItem>
                  <MenuItem value={'CZ3002 ASE'}>CZ3002 ASE</MenuItem>
                  <MenuItem value={'CZ3001 ACOA'}>CZ3001 ACOA</MenuItem>
                  <MenuItem value={'AZ1007 Data Structures'}>AZ1007 Data Structures</MenuItem>
                </Select>
              </FormControl>
            </div>

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

export default withStyles(styles)(StudentHomePage);