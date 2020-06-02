import React from 'react';
import {
  ComingSoon
} from '../Common';
import {
  Button
} from '@material-ui/core';

const handleClick = () => {
  fetch('/api/user/google')
}

export default function Login() {
  return (
    <>
      <Button onClick={handleClick}>
        Login with Google
      </Button>
      
      <a href="/api/user/google">Log in with Google</a>
    </>
  );
}
