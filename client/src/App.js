import React, { Component } from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";

import './App.css';
import Base from './containers/base';

class App extends Component {

  render() {
    return (
      <Router>
        <Base/>
      </Router>
    );
  }
}

export default App;
