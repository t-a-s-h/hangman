import React from 'react';
import ReactDOM from 'react-dom';

import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import App from './App';
import Source from './Components/Source'

ReactDOM.render(
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route>
          <Source/>
        </Route>
      </Switch>
    </Router>,
  document.getElementById('root')
);
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
