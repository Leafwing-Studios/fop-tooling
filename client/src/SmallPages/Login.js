import React, { Component } from 'react';
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

export default class Login extends Component {
  constructor(props) {
    super(props); 
  }
  
  render () {
    return (
      <>
        { false && JSON.stringify(this.state.profile) }
				{ false && JSON.stringify(this.props.user)}
				
        <a href="/api/user/google" style={{textDecoration: 'none'}}>
					<Button variant='contained'>Log in with Google</Button>
				</a>
      </>
    );
  }
}
