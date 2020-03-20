import React, { Component } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Button,
  Fab,
  IconButton,
  Divider,
  Tooltip,
} from '@material-ui/core';
import {
  Add as AddIcon
} from '@material-ui/icons';
import Spacer from '../components/spacer';

export default function InitButtons(props) {
  const spacerWidth = 150; // we add spacers so that the width of the column is consisitent. it's messy, but this element is really thin so I'm not worried about how responsive it it/isn't
  const cannotPlay = props.sides.some(side => (side.entities.length === 0)) || /* all sides have at least 1 entity */
    props.sides.lentgh === 0; /* there are no sides */

  if (!props.combatStarted) return ( // this button starts combat
    <>
      <Grid item xs='auto'>
        <Spacer width={spacerWidth} />
      </Grid>
      <Grid item xs='auto'>
        <Button
          variant='contained'
          color='primary'
          onClick={() => props.startCombat()}
          disabled={cannotPlay}
        >
          Start Combat
        </Button>
      </Grid>
    </>
  );
  else return (
    <>
      <Grid item xs='auto'>
        <Spacer width={spacerWidth} />
      </Grid>
      <Grid item xs='auto'>
        <Button
          variant='outlined'
          color='primary'
          onClick={() => props.nextTurn()}
          disabled={cannotPlay}
        >
          Next Turn
        </Button>
      </Grid>
      <Grid item xs='auto'>
        <Button
          variant='outlined'
          color='primary'
          disabled={cannotPlay}
        >
          Use Resolve
        </Button>
      </Grid>
      <Grid item xs='auto'>
        <Button
          variant='contained'
          color='primary'
          onClick={() => props.endCombat()}
        >
          Finish Combat
        </Button>
      </Grid>
    </>
  );
}
