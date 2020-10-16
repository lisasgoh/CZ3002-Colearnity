import React , { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    //maxWidth: 345,
    marginTop:'1em',
    border: '1px solid rgba(0, 0, 0, 0.05)',
  },
  head:{
    display:'flex',
    alignSelf:'flex-start',
    justifyContent:'flex-start',
    alignContent:'flex-start',
    textAlign: 'left', alignSelf: 'stretch'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function AltComments(props) {
  const classes = useStyles();
  const [liked, setLiked] = useState(false); //props.liked
  const [numLikes, setNumLikes] = useState(20);

  return (
    <Card className={classes.root}>
      <CardHeader className={classes.head}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            I
          </Avatar>
        }

        title="Username"
        subheader="September 14, 2020"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nulla pretium orci eget lobortis porttitor. Praesent consectetur lacus
        eu egestas blandit. Mauris ultrices consequat diam sit amet ornare.
        Etiam elementum felis in nisl condimentum scelerisque. Integer
        scelerisque turpis at ipsum aliquam elementum. Praesent non posuere sem,
        eget varius purus.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <div className="actionbar">
        <Button
          // variant="contained"
          color="primary"
          size="small"
          // className={classes.button}
          startIcon={
            liked ? <FavoriteRoundedIcon /> : <FavoriteBorderRoundedIcon />
          }
          onClick={() =>{ setLiked(!liked);
                            if (liked ===true){
                                setNumLikes(numLikes-1);
                            }else{
                                setNumLikes(numLikes+1);
                            }}}
        >
          Like
        </Button>
        <span> {props.numLikes}{numLikes} likes</span>
      </div>

      </CardActions>
    </Card>
  );
}