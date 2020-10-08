import React from "react";
import Navbar from "./components/Navbar/Navbar";

import "./App.css";
import StudentHomePage from "./container/StudentHomePage/StudentHomePage";
import LandingPage from "./container/LandingPage/LandingPage"
import SignupPage from "./container/Login/SignupPage";
import LoginPage from "./container/Login/LoginPage";
import StudentProfilePage from "./container/StudentProfilePage/StudentProfilePage"
import {BrowserRouter, Route} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>  
      <div className="App">
        <Navbar />
        <Route path="/" exact component = {LandingPage}/>
        <Route path="/login" exact component = {LoginPage}/>
        <Route path="/signup" exact component = {SignupPage}/>
        <Route path="/homepage" exact component = {StudentHomePage}/>
        <Route path="/profilepage" exact component = {StudentProfilePage}/>
      </div>
    </BrowserRouter>
  );
}

export default App;