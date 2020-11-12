import React from "react";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./container/HomePage/HomePage";
import LandingPage from "./container/LandingPage/LandingPage";
import SignupPage from "./container/Login/SignupPage";
import LoginPage from "./container/Login/LoginPage";
import ProfilePage from "./container/ProfilePage/ProfilePage";
import CreatePost from "./container/CreatePost/CreatePost";
import ForumPage from "./container/ForumPage/ForumPage";
import SubforumPage from "./container/SubforumPage/SubforumPage";
import ReviewQuizPage from "./container/ReviewQuizPage/ReviewQuizPage";
import TakeQuizPage from "./container/TakeQuizPage/TakeQuizPage";
import PostDetailPage from "./container/PostDetailPage/PostDetailPage";
import TeacherCreateQuiz from "./container/TeacherCreateQuiz/TeacherCreateQuiz";
import CreateForum from "./container/CreateForum/CreateForum";
import Testpage from "./container/Testpage";
import SearchResult from "./container/SearchResults/SearchResults";
import ViewGrades from "./container/ViewGrades/ViewGrades";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Route path="/" exact component={LandingPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/signup" exact component={SignupPage} />
        <Route path="/homepage" exact component={HomePage} />
        <Route path="/profilepage" exact component={ProfilePage} />
        <Route path="/createpost" exact component={CreatePost} />
        <Route path="/forumpage/:id" exact component={ForumPage} />
        <Route path="/reviewquizpage/:id" exact component={ReviewQuizPage} />
        <Route path="/takequizpage/:id" exact component={TakeQuizPage} />
        <Route path="/subforumpage/:id" exact component={SubforumPage} />
        <Route path="/postdetailpage/:id" exact component={PostDetailPage} />
        <Route path="/teachercreatequiz" exact component={TeacherCreateQuiz} />
        <Route path="/createforum" exact component={CreateForum} />
        <Route path="/searchresult" exact component={SearchResult} />
        <Route path="/viewgrades/:id" exact component={ViewGrades} />
        <Route path="/testpage" exact component={Testpage} />
      </div>
    </BrowserRouter>
  );
}

export default App;
