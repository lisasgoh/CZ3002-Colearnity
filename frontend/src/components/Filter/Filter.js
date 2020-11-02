import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";
import "./Filter.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Filter(props) {
  let { posts, parentCallback } = props;
  const classes = useStyles();
  const [filter, setFilter] = React.useState("");

  const categories = [
    ...new Set(posts && posts.map((post) => post._forum.name)),
  ];
  console.log(categories);
  //checking by forum name. fix later?

  const handleChange = (event) => {
    setFilter(event.target.value); //only sets once after handled change
    console.log("filter: " + filter);
    console.log("value: " + event.target.value);

    if (event.target.value === "all") {
      parentCallback(posts);
    } else {
      parentCallback(
        posts.filter((post) => post._forum.name === event.target.value)
      );
    }
  };

  return (
    <div className="filter">
      <i class="fas fa-filter fa-2x"></i>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel>Filter Post</InputLabel>
        <Select value={filter} onChange={handleChange}>
          <MenuItem value="all">
            <em>All Courses</em>
          </MenuItem>
          {categories &&
            categories.map((category, index) => (
              <MenuItem value={category} key={index}>
                {category}
              </MenuItem>
            ))}
          {/* <MenuItem value={"CZ3002 ASE"}>CZ3002 ASE</MenuItem>
          <MenuItem value={"CZ3001 ACOA"}>CZ3001 ACOA</MenuItem>
          <MenuItem value={"AZ1007 Data Structures"}>
            CZ1007 Data Structures
          </MenuItem> */}
        </Select>
      </FormControl>
    </div>
  );
}
