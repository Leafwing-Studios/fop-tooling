import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from '@material-ui/core';
import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import DocumentTitle from 'react-document-title';

import Frame from './containers/frame';

export default class App extends Component {
  constructor() {
    super();
    const theme = createMuiTheme({});
  }

  render() {
    return (
      <DocumentTitle title='FoP Database'>
        <ThemeProvider theme={this.theme}>
          <CssBaseline/>
          <Router>
            <Frame/>
          </Router>
        </ThemeProvider>
      </DocumentTitle>
    );
  }
}
