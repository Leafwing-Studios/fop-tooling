import React from 'react';
import {
  ComingSoon
} from '../Common';
import {
  Button
} from '@material-ui/core';

const handleClick = () => {
  const requestOptions = {
  //   headers: {'Access-Control-Allow-Origin': '*'}
  };
  
  fetch('/api/user/google', requestOptions);
}

export default function Login() {
  return (
    <>
      <Button onClick={handleClick}>
        Login with Google
      </Button>
      
      <a href="/api/user/google"><button>Log in with Google</button></a>
    </>
  );
}
