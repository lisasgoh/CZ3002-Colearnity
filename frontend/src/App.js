import React from 'react';
import './App.css';
import styled from 'styled-components';
import { Link } from "react-router-dom";


const Login = styled.button`
    background-color: #F8BBD0;
    color: black;
    padding: 10px 59px;
    border-radius: 5px;
    border: 1px solid white;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 0px;
    margin-bottom: 10px;
    transition: ease background-color 250ms;
    &:hover {
        border: 1px solid #F8BBD0;
        background-color: #fce4ec;
`
const Signup = styled.button`
    background-color: #B3E5FC;
    color: black;
    padding: 10px 50px;
    border-radius: 5px;
    border: 1px solid white;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 0px
    transition: ease background-color 250ms;
    &:hover {
        border: 1px solid #B3E5FC;
        background-color: #e3f2fd; 
`

function App() {
    return (
        <div className="App">
            <header className="Home">
                <Link to="/LoginForm">
                    <Login>Login</Login>
                </Link>
                <Link to="/SignupForm">
                    <Signup>Sign Up</Signup>
                </Link>
            </header>
        </div>
    );
}

export default App;
