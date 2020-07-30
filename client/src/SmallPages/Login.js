import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { getUser } from '../redux/selectors';
import {
  ComingSoon,
  Spacer,
} from '../Common';
import {
  Button,
  Typography,
  Divider,
} from '@material-ui/core';

import googleButton from '../Icons/btn_google_signin_dark_normal_web.png';
import googleButtonFocus from '../Icons/btn_google_signin_dark_focus_web.png';
import googleButtonPressed from '../Icons/btn_google_signin_dark_pressed_web.png';

export default class Login extends Component {
  constructor(props) {
    super(props); 
  }
  
  render () {
    return (
      <>
				<Helmet>
					<title>Login - Fonts of Power Tooling</title>
					<meta property="og:title" content="Login - Fonts of Power Tooling" />
				</Helmet>
				<a href="/api/user/google" style={{textDecoration: 'none'}}>
					<img 
						alt="Logo" 
						src={googleButton} 
						onMouseOver={e => (e.currentTarget.src = googleButtonFocus)}
						onMouseOut={e => (e.currentTarget.src = googleButton)}
						onMouseDown={e => (e.currentTarget.src = googleButtonPressed)}
						onMouseUp={e => (e.currentTarget.src = googleButton)}
					/>
				</a>
      </>
    );
  }
}
