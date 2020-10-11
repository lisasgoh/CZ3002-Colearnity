import React, { Component } from "react";
import TeacherPost from "../../components/Post/TeacherPost";
import QuizButtonTeacher from "../../components/ForumButtons/QuizButtonTeacher";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import FilterListRoundedIcon from "@material-ui/icons/FilterListRounded";
import Divider from "@material-ui/core/Divider";
import "./../SubforumPage/SubforumPage.css";

class TeacherForumPage extends Component {
  render() {
    return (
      <div className="subforumpage">
        <div className="leftsection">
          <h2>Software Quality Management</h2>
          <Divider variant="middle" />

          <h3>Quizzes</h3>
          <div className="quizzes">
            <QuizButtonTeacher
              quizTitle="Quiz 1"
              completedNo = "23/35"
              grade="10/10"
            />
            <QuizButtonTeacher
              quizTitle="Quiz 2"
              completedNo="15/35"
              grade="6/10"
            />
            <QuizButtonTeacher
              quizTitle="Quiz 3"
              completedNo="35/35"
              grade="7/10"
            />
          </div>
        </div>

        <div className="rightsection">
          <div className="topbar">
            <AddCircleOutlineRoundedIcon />
            <h2>Recent Posts</h2>
            <FilterListRoundedIcon />
          </div>
          <TeacherPost />
          <TeacherPost  />
          <TeacherPost  />
          <TeacherPost  />
          <TeacherPost  />
          <TeacherPost  />
        </div>
      </div>
    );
  }
}

export default TeacherForumPage;
