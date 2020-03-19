import React, { Component } from 'react';
import {
  Grid,
  Typography,
  Button,
  TextField,
  Divider,
  Paper,
  Container,
  IconButton,
} from '@material-ui/core';
import {
  Add as AddIcon,
  Close as RemoveIcon,
  RotateLeft as ResetIcon,
} from '@material-ui/icons';
import Spacer from '../components/spacer';
import InitEntity from './initEntity';
import Center from './center';

export default function InitSide(props) {

  return (
    <Paper style={{padding: 12}}>
      <Grid container direction='row' alignItems='center' wrap='nowrap'>
        <Grid item lg>
          <TextField
            variant='outlined'
            placeholder='Side Name'
            size='small'
            fullWidth
            autoFocus
          />
        </Grid>
        <Spacer width={3} />
        <Grid item>
          <IconButton>
            <ResetIcon />
          </IconButton>
        </Grid>
        <Spacer width={3} />
        <Grid item>
          <IconButton
            onClick={() => props.removeSide()}
          >
            <RemoveIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Spacer height={10} />
      <Divider />
      <Spacer height={10} />
      { /* make entity ui elements for all the entities of this side */
        props.side.entities.map(entity => (
          <InitEntity
            key={entity.id}
            {...props}
          />
        ))
      }
      <Center direction='horizontal'>
        <IconButton
          onClick={() => props.addEntity()}
        >
          <AddIcon />
        </IconButton>
      </Center>
    </Paper>
  );
}
