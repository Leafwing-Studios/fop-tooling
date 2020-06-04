import React from 'react';
import {
  ComingSoon
} from '../Common';
import {
  Button
} from '@material-ui/core';

export default function Login() {
  return (
    <>
      <a href="/api/user/google" style={{textDecoration: 'none'}}><Button variant='contained'>Log in with Google</Button></a>
    </>
  );
}
