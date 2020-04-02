import React from 'react';
import {
  Typography,
  Divider,
} from '@material-ui/core';

export default function Title(props) {
  return (
    <>
      <Typography variant='h4'>
        {props.text}
      </Typography>
      <Divider />
    </>
  )
}
