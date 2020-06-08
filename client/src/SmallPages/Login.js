import React, { Component } from 'react';
import {
  ComingSoon
} from '../Common';
import {
  Button,
  Typography,
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
        <a href="/api/user/google" style={{textDecoration: 'none'}}><Button variant='contained'>Log in with Google</Button></a>
        { false && JSON.stringify(this.state.profile) }
        {
          this.state.profile.email && (
            <>
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
            </>
          )
        }
      </>
    );
  }
}
