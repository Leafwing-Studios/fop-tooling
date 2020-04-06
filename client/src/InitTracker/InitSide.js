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
  Tooltip,
} from '@material-ui/core';
import {
  Add as AddIcon,
  Close as RemoveIcon,
  RotateLeft as ResetIcon,
} from '@material-ui/icons';
import {
  Spacer,
  Center
} from '../Common';
import InitEntity from './InitEntity';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  underline: {
    "&&&:before": {
      borderBottom: "none"
    },
    "&&:after": {
      borderBottom: "none"
    }
  },
  sideName: {
    fontWeight: 'bold',
    fontSize: 18,
  }
});

export default function InitSide(props) {
  const classes = useStyles();

  return (
    <Paper style={{padding: 12}}>
      <Grid container direction='row' alignItems='center' wrap='nowrap' spacing={1}>
        <Grid item lg>
          <TextField
            placeholder='Side Name'
            fullWidth
            autoFocus
            defaultValue={props.side.defaultName}
            InputProps={{
              classes: {
                underline: classes.underline,
                input: classes.sideName,
              }
            }}
          />
        </Grid>
        <Grid item>
          <Tooltip title='Reset side (remove all combatants)' aria-label='reset-side'>
            <IconButton
              size='small'
              onClick={() => props.removeAllEntities()}
              disabled={props.isInCombat}
            >
              <ResetIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title='Remove side' aria-label='remove-side'>
            <IconButton onClick={() => props.removeSide()} size='small'>
              <RemoveIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <Divider />
      <Spacer height={13} />
      { /* make entity ui elements for all the entities of this side */
        props.side.entities.map((entity, index) => (
          <InitEntity
            key={entity.id}
            removeEntity={() => props.removeEntity(index)}
            addEntity={() => props.addEntity()}
            entity={entity}
          />
        ))
      }
      <Center direction='horizontal'>
        <Tooltip title='Add combatant' aria-label='add-combatant'>
          <IconButton onClick={() => props.addEntity()}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Center>
    </Paper>
  );
}
