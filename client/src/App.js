import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from 'react-redux';
import { setUser } from './redux/actions';

import { CssBaseline } from '@material-ui/core';
import { lightGreen } from '@material-ui/core/colors';
import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import DocumentTitle from 'react-document-title';

import NavigationFrame from './NavigationTopLevel/NavigationFrame';
import GlobalAlert from './NavigationTopLevel/GlobalAlert';

const theme = createMuiTheme({
	palette: {
		secondary: {
			main: lightGreen[500],
		},
	},
});

class App extends Component {
  constructor() {
    super();
  }
	
	componentDidMount() {
		// as soon as the app loads, check if there's a persistent login session. if so, grab the user, and store it in redux. 
		// this should only be called once on the initial page load, and not when the router moves us around. (for efficiency)
		fetch('/api/user/current')
      .then(res => res.json())
      .then(res => {
				this.props.setUser(res);
      })
      .catch(err => console.log(err.response));
	}

  render() {
    return (
      <DocumentTitle title='Fonts of Power Tooling'>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Router>
            <NavigationFrame/>
						<GlobalAlert/>
          </Router>
        </ThemeProvider>
			</DocumentTitle>
    );
  }
}

export default connect(
	null,
	{ setUser }
)(App);
