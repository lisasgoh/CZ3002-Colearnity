import React from 'react';
import Navbar from "./components/Navbar/Navbar";
import { Button } from './components/Button';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="landing">
        <div className="ls-btn"><Button>Login</Button></div>
        <div className="ls-btn"><Button>Sign Up</Button></div>
      </div>
    </div>
  );
}

export default App;
