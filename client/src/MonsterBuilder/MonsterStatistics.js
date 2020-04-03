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
  MultipleSelectBoxes,
} from '../Common';
import AttributeSelector from './AttributeSelector';
import MonsterStatisticsComputedElements from './MonsterStatisticsComputedElements'
import {
  getAllIndicies
} from '../utils';

const useStyles = makeStyles((theme) => ({
  TextField: {
    width: '100%',
  },
}));

const spacerHeight = 20;
const skills = [
  'Animism',
  'Arcana',
  'Artifice',
  'Athletics',
  'Charisma',
  'Craftmanship',
  'Endurance',
  'Geomatics',
  'Guidance',
  'Humanities',
  'Insight',
  'Medicine',
  'Perception',
  'Stealth',
  'Tinkering',
  'Trickery',
];

export default function MonsterStatistics(props) {
  const classes = useStyles();
  const tierError = isNaN(props.monster.tier) || (props.monster.tier < 0); // whether or not to display an error on the tier box
  const turnError = isNaN(props.monster.turns) || (props.monster.turns < 1); // whether or not to display an error on the turns box

  return (
    <Grid container style={{flexGrow: 1}} direction='row' spacing={2}>
      <Grid item xl>
        <Typography variant='h6'>
          Pick these...
        </Typography>
        <Spacer height={spacerHeight} />
        <Grid container direction='row' spacing={5}>
          <Grid item md>
            <TextField
              label='Tier'
              fullwidth
              autoFocus
              defaultValue={isNaN(props.monster.tier) ? '' : props.monster.tier}
              onChange={(ev) => props.updateMonster({tier: parseInt(ev.target.value)})}
              error={tierError}
              helperText={tierError ? 'Must be a number greater than or equal to zero' : ''}
              className={classes.TextField}
            />
            <Spacer height={spacerHeight} />
            <TextField
              label='Monster Turns'
              fullwidth
              defaultValue={props.monster.turns || ''}
              onChange={(ev) => props.updateMonster({turns: parseInt(ev.target.value)})}
              error={turnError}
              helperText={turnError ? 'Must be a number greater than or equal to one' : 'The number of turns that this monster takes in a round'}
              className={classes.TextField}
            />
            <Spacer height={spacerHeight} />
            <AttributeSelector
              {...props}
              updateAttributes={(newAttributes) => props.updateMonster({attributes: {...props.monster.attributes, ...newAttributes}}) /* evil mid level callback mixing so the attributes save properly */}
            />
            <Spacer height={spacerHeight} />
            <MultipleSelectBoxes
              {...props}
              updateParent={(trained) => props.updateMonster({
                trainedDefenses: {
                  prowess: trained[0],
                  agility: trained[1],
                  expertise: trained[2],
                  focus: trained[3],
                  presence: trained[4],
                }
              })}
              title='Pick 2 Trained Defenses'
              numSelections={2}
              labels={['Prowess', 'Agility', 'Expertise', 'Focus', 'Presence']}
            />
          </Grid>
          <Grid item md={3}>
            <MultipleSelectBoxes
              {...props}
              title='Pick 3 Trained Skills'
              numSelections={3}
              updateParent={(trained) => {
                const inds = getAllIndicies(trained, n=>n); // use the identity here since the array is already full of bools
                props.updateMonster({
                  trainedSkills: inds.map(i => skills[i])
                });
              }}
              labels={skills}
            />
            <Spacer height={spacerHeight} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Divider orientation='vertical' />
      </Grid>
      <Grid item xl>
        <Typography variant='h6'>
          ...to compute these
        </Typography>
        <Spacer height={spacerHeight} />
        <MonsterStatisticsComputedElements {...props} />
      </Grid>
    </Grid>
  );
}
