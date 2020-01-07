import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import { CssBaseline } from '@material-ui/core';
import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';

// import './App.css';
import Frame from './containers/frame';
import useStyles from './styles';

export default function App () {
  const theme = createMuiTheme(useStyles);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Router>
        <Frame/>
      </Router>
    </ThemeProvider>
  );
}
