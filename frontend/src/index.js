import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './App';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import * as serviceWorker from './serviceWorker';


const rootElement = document.getElementById("root");
ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/LoginForm" component={LoginForm} />
            <Route path="/SignupForm" component={SignupForm} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);

serviceWorker.unregister();


  //<React.StrictMode>
  //  <App />
  //</React.StrictMode>,
  //document.getElementById('root')
//);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

//import Navigation from './components/Navbar';
//import Routes from './Routes';
