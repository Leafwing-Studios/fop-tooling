import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import { CssBaseline } from '@material-ui/core';

// import './App.css';
import Frame from './containers/frame';

export default function App () {
  return (
    <div>
      <CssBaseline/>
      <Router>
        <Frame/>
      </Router>
    </div>
  );
}
