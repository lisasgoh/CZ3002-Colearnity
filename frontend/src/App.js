import React from "react";
import Navbar from "./components/Navbar/Navbar";

import "./App.css";
import StudentHomePage from "./container/StudentHomePage/StudentHomePage";
import LandingPage from "./container/LandingPage/LandingPage"
import {BrowserRouter, Route} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>  
      <div className="App">
        <Navbar />
        <Route path="/" exact component = {LandingPage}/>
        <Route path="/login" exact component = {StudentHomePage}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
