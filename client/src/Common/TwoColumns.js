import React from 'react';
import useStyles from '../styles';
import {
  Grid,
  Divider,
} from '@material-ui/core';

export default function TwoColumns (props) {
  const classes = useStyles()();

  return (
    <Grid container className={classes.gridRoot} direction='row' wrap='wrap-reverse' spacing={2}>
      <Grid key='search' item xl={props.leftPanelSize || 9}>
        {props.children[0]}
      </Grid>
      <Grid key='dividerVertical' item>
        <Divider orientation='vertical' />
      </Grid>
      <Grid key='info' item lg>
        {props.children[1]}
      </Grid>
    </Grid>
  );
}
