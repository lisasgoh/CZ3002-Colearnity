import React, {useState, Component} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import search_query from "../services/search";
import testQuiz from "../services/quiz";
import API from "../utils/API";

const styles = (theme) => ({
    search: {
      display: 'flex',
      'flex-direction': 'row',
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.55),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.85),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 1),
      //paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    },
  });

class Search extends Component {
  /*  
  const classes = useStyles();
    const [searchQuery, setSearchQuery] = useState("HELLO");

    const searchHandler =(input)=>{
      setSearchQuery(input);
      console.log("TYPES " + typeof searchQuery);
      console.log(searchQuery);
    }

    */
   constructor(props) {
    super(props);

    this.state = {
      querySearch:"initial state",
      posts:null,
    };
  }

  getSearchQuery=()=>{
    search_query.searchPost(`${this.state.querySearch}`).then((forum) => {
      console.log(forum);
      this.setState({
        ...this.state,
        ...{
          posts: forum._posts,
        },
      });
    });
  }

  searchHandler=(evt)=>{
    this.setState({
        querySearch: evt.target.value,
    });
  }
    render(){
      const {classes} = this.props;
    return (
        <div>
            <div className={classes.search}>
            
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={this.searchHandler}
            />
          
          <Link to={{
            pathname: "/searchresult",
            state:this.state.querySearch,
          }}>
              <Button
          color="primary"
          size="small"
          onClick={this.getSearchQuery}
          startIcon={<SearchIcon />}
        />
            </Link>
            
            </div>
        </div>
    )
}
}


export default withStyles(styles)(Search);