import React, { Component } from "react";
import QuizButton from "../../components/ForumButtons/QuizButton";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import { withStyles } from '@material-ui/core/styles';
import {
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@material-ui/core";
import { Link } from "react-router-dom";
import "./SubforumPage.css";

// import API from "../../utils/API";
import forumService from "./../../services/forum";

const styles = (theme) => ({
    table: {
      minWidth: 650,
    },
});

class ViewGrades extends Component {
  constructor(props) {
    super(props);
    // const id = this.props.match.params.id;

    this.state = {
      id: this.props.match.params.id,
      subforumTitle: null,
      subforumDesc: null,
      quizzes: null,
      posts: null,
      isAdmin: null,
    };
  }

  componentDidMount() {
    forumService.getForum(`${this.state.id}`).then((forumData) => {
      console.log(forumData);
      this.setState({
        ...this.state,
        ...{
          subforumTitle: forumData.name,
          subforumDesc: forumData.description,
          quizzes: forumData._quizzes,
          posts: forumData._posts,
          isAdmin: true, //forumData.isAdmin,
        },
      });
    });
  }

  render() {
    const { subforumTitle, subforumDesc, quizzes, posts, isAdmin } = this.state;
    const { classes } = this.props;
    console.log(posts);
    return (
      <div className="subforumpage">
        <div className="leftsection">
          <h2>{subforumTitle}</h2>
          <p>{subforumDesc}</p>
          <Divider variant="middle" />

          <h3>Quizzes</h3>
          <div className="quizzes">
            <QuizButton
              quizTitle="Quiz 1"
              completed={true}
              completionDate="11/9/2020"
              grade="10/10"
            />
            {quizzes &&
              quizzes.map((quiz) => (
                <Link
                  to={{
                    pathname: isAdmin
                      ? "/"
                      : quiz.taken
                      ? `/forum/reviewquizpage/${quiz._id}`
                      : `/forum/takequizpage/${quiz._id}`,
                    quizID: quiz._id,
                  }}
                >
                  <QuizButton
                    quizTitle={quiz.title}
                    id={quiz._id}
                    isAdmin={isAdmin}
                  />
                </Link>
              ))}
            {isAdmin ? (
              // <Icon
              //   className={combined}
              //   style={{ color: "#fa923f", fontSize: 100, margin: "0.3em" }}
              // />
              <AddCircleOutlineRoundedIcon
                style={{ color: "#fa923f", fontSize: 100, margin: "0.3em" }}
              />
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="rightsection">
            <div className="vg">
                <h2>View Grades</h2>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Question Number</TableCell>
                            <TableCell align="right">No. of Correct Answers</TableCell>
                            <TableCell align="right">No. of Wrong Answers</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {/* {question.map((question) => (
                        <TableRow key={question.num}>
                        <TableCell component="th" scope="row">
                            {question.num}
                        </TableCell>
                        <TableCell align="right">{question.correct}</TableCell>
                        <TableCell align="right">{question.wrong}</TableCell>
                        </TableRow>
                    ))} */}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(styles) (ViewGrades);
