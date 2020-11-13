import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { fade, withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import search_query from "../services/search";
import testQuiz from "../services/quiz";
import API from "../utils/API";

const styles = (theme) => ({
  search: {
    display: "flex",
    "flex-direction": "row",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.55),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.85),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    marginLeft: "1em",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
  },
});

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      querySearch: "",
      posts: null,
    };
  }

  getSearchQuery = () => {
    API.get("/api/search?postKeyword=test").then((response) =>
      console.log(response)
    );
    testQuiz
      .getQuiz("5f9947deff08a627f4bea004")
      .then((response) => console.log(response));
    search_query.searchPost(`test`).then((response) => console.log(response));

    search_query.searchPost(`${this.state.querySearch}`).then((forum) => {
      console.log(forum[0]);
      this.setState({
        ...this.state,
        ...{
          posts: forum._posts,
        },
      });
    });
  };

  searchHandler = (evt) => {
    this.setState({
      querySearch: evt.target.value,
    });
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.search}>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            onChange={this.searchHandler}
            value={this.state.querySearch}
          />

          <Link
            to={{
              pathname: "/searchresult",
              state: this.state.querySearch,
            }}
            onClick={() => {
              this.setState({
                querySearch: "",
              });
              if (
                window.location.pathname.localeCompare("/searchresult") === 0
              ) {
                window.location.reload();
              }
            }}
          >
            <Button
              color="primary"
              size="small"
              onClick={this.getSearchQuery}
              startIcon={<SearchIcon style={{ color: "black" }} />}
            />
          </Link>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Search);
