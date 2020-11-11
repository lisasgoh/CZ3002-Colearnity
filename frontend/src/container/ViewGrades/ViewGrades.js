import React, { Component } from "react";
import QuizButton from "../../components/ForumButtons/QuizButton";
import QuestionStats from "../../components/QuestionStats/QuestionStats";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import { withStyles } from "@material-ui/core/styles";
import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import "./ViewGrades.css";

import quizService from "./../../services/quiz";

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
      quizID: this.props.match.params.id,
      avgResults: null,
      quizQns: null,
      quizTitle: null,
      totalPossibleMarks: null,
    };
  }

  componentDidMount() {
    quizService.getQuiz(this.state.quizID).then((quizData) => {
      console.log(quizData);
      // setID(quizData._id);
      this.setState({
        ...this.state,
        ...{
          avgResults:
            quizData.results.reduce((a, b) => a + b, 0) /
            quizData.results.length,
          quizQns: quizData.questions,
          quizTitle: quizData.title,
          totalPossibleMarks: quizData.total_points,
        },
      });
    });
  }

  render() {
    const { avgResults, quizQns, quizTitle, totalPossibleMarks } = this.state;

    const { classes } = this.props;

    return (
      <div className="subforumpage">
        <div className="leftsection">
          <h2>{quizTitle}</h2>
        </div>

        <div className="rightsection">
          <div className="vg">
            <h2>View Grades</h2>
          </div>
          <p>
            Average Grade: {avgResults} / {totalPossibleMarks}
          </p>
          <br />
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Question Number</TableCell>
                  <TableCell align="center">No. of Correct Answers</TableCell>
                  <TableCell align="center">No. of Wrong Answers</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {quizQns &&
                  quizQns.map((qn, index) => (
                    <TableRow key={index}>
                      <TableCell align="center" component="th" scope="row">
                        {qn.questionNumber}
                      </TableCell>
                      <TableCell align="center">{qn.stats.correct}</TableCell>
                      <TableCell align="center">{qn.stats.wrong}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div>
            {quizQns &&
              quizQns.map((qn, index) => (
                <QuestionStats
                  question={qn.title}
                  options={qn.options}
                  stats={qn.stats}
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ViewGrades);
