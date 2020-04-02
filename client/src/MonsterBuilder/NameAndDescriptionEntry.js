import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField
} from '@material-ui/core';
import {
  Spacer
} from '../Common';

const useStyles = makeStyles((theme) => ({
  TextField: {
    // we can mess with this more later once we care about making it pretty
    width: '100%',
    // marginLeft: theme.spacing(15),
  }
}));

export default function NameAndDescriptionEntry(props) {
  const classes = useStyles();

  return (
    <>
      <TextField
        label='Name'
        fullwidth
        defaultValue={props.name}
        autoFocus
        onChange={(ev) => props.updateMonster({name: ev.target.value})}
        className={classes.TextField}
      />
      <Spacer height={10} />
      <TextField
        label='Description'
        fullwidth
        defaultValue={props.description}
        onChange={(ev) => props.updateMonster({description: ev.target.value})}
        className={classes.TextField}
        multiline
        rows={6}
      />
    </>
  );
}
