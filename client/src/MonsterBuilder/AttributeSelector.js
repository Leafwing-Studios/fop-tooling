import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  FormControl,
  FormHelperText,
  Grid,
  Divider,
  Typography,
} from '@material-ui/core';
import {
  Spacer,
  Lipsum,
} from '../Common';

const useStyles = makeStyles((theme) => ({
  TextField: {
    width: '100%',
  },
}));

export default function AttributeSelector(props) {
  const classes = useStyles();

  // assert tier + 4 === sum of attributes
  const attributesTarget = (parseInt(props.monster.tier) || 0) + 4;
  const attributeSumOnlyInts = Object.values(props.monster.attributes) // sums up all the values if and only if all the values are numbers
    .map(str => parseInt(str)) // note: we are not replacing with zero here, so string values will result in NaN, and cause the sum to equal NaN
    .reduce((a, b) => a+b, 0);
  const error = (attributeSumOnlyInts || attributesTarget) !== attributesTarget; // add the target as a default value so that if the sum equals NaN, we don't get an error

  const attributeSumAlways = Object.values(props.monster.attributes) // sums up all the values, taking non-ints as zero. This is used for displaying things
    .map(str => parseInt(str) || 0)
    .reduce((a, b) => a+b, 0);

  return (
    <FormControl>
      <Grid container direction='row' wrap='nowrap' alignItems='flex-end' spacing={2}>
        <Grid item sm={2}>
          <TextField
            label='Prowess'
            error={error}
            defaultValue={props.monster.attributes.prowess}
            onChange={(ev) => props.updateAttributes({ prowess: ev.target.value })}
            className={classes.TextField}
          />
        </Grid>
        <Grid item>
          <Typography> + </Typography>
        </Grid>
        <Grid item sm={2}>
          <TextField
            label='Agility'
            error={error}
            defaultValue={props.monster.attributes.agility}
            onChange={(ev) => props.updateAttributes({ agility: ev.target.value })}
            className={classes.TextField}
          />
        </Grid>
        <Grid item>
          <Typography> + </Typography>
        </Grid>
        <Grid item sm={2}>
          <TextField
            label='Expertise'
            error={error}
            defaultValue={props.monster.attributes.expertise}
            onChange={(ev) => props.updateAttributes({ expertise: ev.target.value })}
            className={classes.TextField}
          />
        </Grid>
        <Grid item>
          <Typography> + </Typography>
        </Grid>
        <Grid item sm={2}>
          <TextField
            label='Focus'
            error={error}
            defaultValue={props.monster.attributes.focus}
            onChange={(ev) => props.updateAttributes({ focus: ev.target.value })}
            className={classes.TextField}
          />
        </Grid>
        <Grid item>
          <Typography> + </Typography>
        </Grid>
        <Grid item sm={2}>
          <TextField
            label='Presence'
            error={error}
            defaultValue={props.monster.attributes.presence}
            onChange={(ev) => props.updateAttributes({ presence: ev.target.value })}
            className={classes.TextField}
          />
        </Grid>
        <Grid item sm={1}>
          <Typography> {`= ${attributeSumAlways}`} </Typography>
        </Grid>
      </Grid>
      <FormHelperText
        error={error}
      >
        {`The sum of all five attributes must be equal to the monster's tier plus four, in this case that is ${attributesTarget}`}
      </FormHelperText>
    </FormControl>
  );
}
