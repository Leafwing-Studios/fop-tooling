import React, { Component } from 'react';
import useStyles from '../styles';
import {
  Grid,
  Divider,
} from '@material-ui/core';
import Lipsum from '../components/lipsum';

export default function Rules() {
  const classes = useStyles()();

  return (
    <Grid container className={classes.gridRoot} direction='row-reverse' spacing={2}>
      <Grid key='search' item md={4}>
        <p>info panel stuffs</p>
        <Lipsum />
      </Grid>
      <Grid key='dividerVertical' item>
        <Divider orientation='vertical' />
      </Grid>
      <Grid key='info' item md>
        <p>search page stuffs</p>
        <Lipsum />
      </Grid>
    </Grid>
  );
}
