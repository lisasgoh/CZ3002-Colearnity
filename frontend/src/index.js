import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

// const rootElement = document.getElementById("root");
// ReactDOM.render(
//     <BrowserRouter>
//         <Switch>
//             <Route exact path="/" component={App} />
//             <Route path="/LoginForm" component={LoginForm} />
//             <Route path="/SignupForm" component={SignupForm} />
//         </Switch>
//     </BrowserRouter>,
//     document.getElementById('root')
// );