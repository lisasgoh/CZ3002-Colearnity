import React from "react";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

import { BrowserRouter, Route } from "react-router-dom";
import StudentHomePage from "./container/StudentHomePage/StudentHomePage";
import LandingPage from "./container/LandingPage/LandingPage";
import SignupPage from "./container/Login/SignupPage";
import LoginPage from "./container/Login/LoginPage";
import StudentProfilePage from "./container/StudentProfilePage/StudentProfilePage";
import CreatePost from "./container/CreatePost/CreatePost";
import ForumPage from "./container/ForumPage/ForumPage";
import SubforumPage from "./container/SubforumPage/SubforumPage";
import ReviewQuizPage from "./container/ReviewQuizPage/ReviewQuizPage";
import TakeQuizPage from "./container/TakeQuizPage/TakeQuizPage";
import TeacherHomePage from "./container/TeacherHomePage/TeacherHomePage";
import TeacherForumPage from "./container/TeacherForumPage/TeacherForumPage";
import TeacherSubforumPage from "./container/TeacherSubforumPage/TeacherSubforumPage";
import PostDetailPage from "./container/PostDetailPage/PostDetailPage";
import TeacherCreateQuiz from "./container/TeacherCreateQuiz/TeacherCreateQuiz";
//import ReplyPage from "./container/ReplyPage/ReplyPage";
import CreateForum from "./container/CreateForum/CreateForum";
import Testpage from "./container/Testpage";
import SearchResult from "./container/SearchResults/SearchResults";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Route path="/" exact component={Testpage} />
        <Route path="/landingpage" exact component={LandingPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/signup" exact component={SignupPage} />
        <Route path="/homepage" exact component={StudentHomePage} />
        <Route path="/profilepage" exact component={StudentProfilePage} />
        <Route path="/createpost" exact component={CreatePost} />
        <Route path="/forumpage/:id" exact component={ForumPage} />
        <Route path="/reviewquizpage:id" exact component={ReviewQuizPage} />
        <Route path="/takequizpage/:id" exact component={TakeQuizPage} />
        <Route path="/teacherhomepage" exact component={TeacherHomePage} />
        <Route path="/subforumpage/:id" exact component={SubforumPage} />
        <Route path="/teacherforumpage" exact component={TeacherForumPage} />
        <Route path="/teachersubforumpage" exact component={TeacherSubforumPage} />
        <Route path="/postdetailpage/:id" exact component={PostDetailPage} />
        <Route path="/teachercreatequiz" exact component={TeacherCreateQuiz} />
        <Route path="/createforum" exact component={CreateForum} />
        <Route path="/searchresult" exact component={SearchResult} />
      </div>
    </BrowserRouter>
  );
}

export default App;
