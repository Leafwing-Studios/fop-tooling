import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import { CssBaseline } from '@material-ui/core';
import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';

import Frame from './containers/frame';

export default function App () {
  const theme = createMuiTheme({});

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Router>
        <Frame/>
      </Router>
    </ThemeProvider>
  );
}
