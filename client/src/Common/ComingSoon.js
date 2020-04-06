import React, { Component } from 'react';
import {
  Grid,
  Typography,
  Container,
} from '@material-ui/core';
import {
  Warning as WarningIcon
} from '@material-ui/icons';
import { yellow } from '@material-ui/core/colors';

export default function ComingSoon(props) {
  return (
    <div>
      <Grid container direction='row' alignItems='center'spacing={1}>
        <Grid item>
          <WarningIcon style={{
            color: yellow[700],
            fontSize: 50,
          }}/>
        </Grid>
        <Grid item>
          <Typography variant='h4'>
            THIS AREA IS UNDER CONSTRUCTION
          </Typography>
        </Grid>
        <Grid item>
          <WarningIcon style={{
            color: yellow[700],
            fontSize: 50,
          }}/>
        </Grid>
      </Grid>
      <Typography>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This feature is coming soon! please bear with us while we continue to work on it. Thanks!
      </Typography>
    </div>
  );
}
