import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Grid,
  Divider,
  Typography,
} from '@material-ui/core';
import {
  Spacer,
  Lipsum,
} from '../Common';
import AttributeSelector from './AttributeSelector';

const useStyles = makeStyles((theme) => ({
  TextField: {
    width: '100%',
  },
}));

export default function MonsterStatistics(props) {
  const classes = useStyles();
  const tierError = isNaN(parseInt(props.monster.tier || -1)) || (parseInt(props.monster.tier) < 0); // whether or not to display an error on the tier box
  const turnError = isNaN(parseInt(props.monster.turns || -1)) || (parseInt(props.monster.turns) < 1); // whether or not to display an error on the turns box

  return (
    <Grid container style={{flexGrow: 1}} spacing={2}>
      <Grid item xl>
        <Typography variant='h6'>
          Pick these...
        </Typography>
        <Spacer height={10} />
        <TextField
          label='Tier'
          fullwidth
          autoFocus
          defaultValue={props.monster.tier}
          onChange={(ev) => props.updateMonster({tier: ev.target.value})}
          error={tierError}
          helperText={tierError ? 'Must be a number greater than or equal to zero' : ''}
          className={classes.TextField}
        />
        <Spacer height={10} />
        <TextField
          label='Monster Turns'
          fullwidth
          defaultValue={props.monster.turns}
          onChange={(ev) => props.updateMonster({turns: ev.target.value})}
          error={turnError}
          helperText={turnError ? 'Must be a number greater than or equal to one' : 'The number of turns that this monster takes in a round'}
          className={classes.TextField}
        />
        <Spacer height={10} />
        <AttributeSelector
          {...props}
          updateAttributes={(newAttributes) => props.updateMonster({attributes: {...props.monster.attributes, ...newAttributes}}) /* evil mid level callback mixing so the attributes save properly */}
        />
      </Grid>
      <Grid item>
        <Divider orientation='vertical' />
      </Grid>
      <Grid item xl>
        <Typography variant='h6'>
          ...to compute these
        </Typography>
        <Spacer height={10} />
      </Grid>
    </Grid>
  );
}
