import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from 'react-redux';
import store from './redux/store';

import { CssBaseline } from '@material-ui/core';
import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import DocumentTitle from 'react-document-title';

import NavigationFrame from './NavigationTopLevel/NavigationFrame';

export default class App extends Component {
  constructor() {
    super();
    const theme = createMuiTheme({});
  }

  render() {
    return (
      <DocumentTitle title='FoP Database'>
				<Provider store={store}>
	        <ThemeProvider theme={this.theme}>
	          <CssBaseline/>
	          <Router>
	            <NavigationFrame/>
	          </Router>
	        </ThemeProvider>
      	</Provider>
			</DocumentTitle>
    );
  }
}
