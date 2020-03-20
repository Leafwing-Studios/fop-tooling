import React, { Component } from 'react';

import {
  Grid,
} from '@material-ui/core';

export default function Center(props) {
  const direction = props.direction === 'horizontal' ? 'column' : 'row'

  return (
    <Grid
      container
      direction={direction}
      alignItems='center'
    >
      <Grid item>
        {props.children}
      </Grid>
    </Grid>
  );
}
