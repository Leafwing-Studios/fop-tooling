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
      <Grid container direction='row' alignItems='center' wrap='nowrap' spacing={1}>
        <Grid item lg>
          <TextField
            variant='outlined'
            placeholder='Side Name'
            size='small'
            fullWidth
            autoFocus
          />
        </Grid>
        <Grid item>
          <IconButton size='small'>
            <ResetIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton onClick={() => props.removeSide()} size='small'>
            <RemoveIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Spacer height={10} />
      <Divider />
      <Spacer height={10} />
      { /* make entity ui elements for all the entities of this side */
        props.side.entities.map((entity, index) => (
          <InitEntity
            key={entity.id}
            removeEntity={() => props.removeEntity(index)}
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
