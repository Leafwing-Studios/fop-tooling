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

class Login extends Component {
  constructor(props) {
    super(props); 
  }
  
  render () {
    return (
      <>
        { false && JSON.stringify(this.state.profile) }
				{ false && JSON.stringify(this.props.user)}
        {
          !this.props.user.id && (
            <a href="/api/user/google" style={{textDecoration: 'none'}}><Button variant='contained'>Log in with Google</Button></a>
          )
        }
        {
          this.props.user.id && (
            <>
              <Typography variant='h4'>User Data</Typography>
              <Divider />
              <Spacer height={10} />
              <Typography>
                <b>Email: </b>
                {this.props.user.email}
              </Typography>
              <Typography>
                <b>Permissions: </b>
								{this.props.user.isAdmin ? 'Admin' : 'Normal'}
              </Typography>
              <Typography>
                <b>Internal ID: </b>
                {this.props.user.id}
              </Typography>
              <Spacer height={20} />
              <a href='/api/user/logout' style={{textDecoration: 'none'}}>
								<Button variant='contained'>
									Log Out
								</Button>
							</a>
            </>
          )
        }
      </>
    );
  }
}

const mapStateToProps = state => ({
	user: getUser(state)
});

export default connect(
	mapStateToProps
)(Login);
