import React, { Component } from 'react';
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
    this.state = {
      profile: {},
    };
  }
  
  componentDidMount() {
    fetch('/api/user/current')
      .then(res => res.json())
      .then(res => {
        this.setState({
          profile: res,
        });
      })
      .catch(err => console.log(err.response));
  }
  
  render () {
    return (
      <>
        { false && JSON.stringify(this.state.profile) }
        {
          !this.state.profile.email && (
            <a href="/api/user/google" style={{textDecoration: 'none'}}><Button variant='contained'>Log in with Google</Button></a>
          )
        }
        {
          this.state.profile.email && (
            <>
              <Typography variant='h4'>User Data</Typography>
              <Divider />
              <Spacer height={10} />
              <Typography>
                <b>Email: </b>
                {this.state.profile.email}
              </Typography>
              <Typography>
                <b>Google ID: </b>
                {this.state.profile.googleId}
              </Typography>
              <Typography>
                <b>Internal ID: </b>
                {this.state.profile._id}
              </Typography>
              <Spacer height={20} />
              <a href='/api/user/logout' style={{textDecoration: 'none'}}><Button variant='contained'>Log Out</Button></a>
            </>
          )
        }
      </>
    );
  }
}
