import React from 'react';
import useStyles from '../styles';
import {
  Grid,
  Divider,
} from '@material-ui/core';

export default function TwoColumns (props) {
  const classes = useStyles()();

  return (
    <Grid container className={classes.gridRoot} wrap='wrap-reverse' spacing={2}>
      <Grid key='search' item md>
        {props.children[0]}
      </Grid>
      <Grid key='dividerVertical' item>
        <Divider orientation='vertical' />
      </Grid>
      <Grid key='info' item md={4}>
        {props.children[1]}
      </Grid>
    </Grid>
  );
}
