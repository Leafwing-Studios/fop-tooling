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
  NameValuePair,
} from '../Common';

const useStyles = makeStyles((theme) => ({
  TextField: {
    width: '100%',
  },
}));

export default function MonsterStatisticsComputedElements(props) {
  const classes = useStyles();

  const aptitudeBonus = props.monster.tier - 1; // calculate this once since it's used all over
  const specialDefense = (attribute) => (10 + props.monster.attributes[attribute] + (props.monster.trainedDefenses[attribute] ? aptitudeBonus : Math.floor((aptitudeBonus)/2)));

  return (
    <>
      <NameValuePair name='Aptitude Bonus' value={aptitudeBonus}/>
      <NameValuePair name='Max Life' value={15 * (props.monster.tier + 1) * props.monster.turns}/>
      <NameValuePair name='Max Essence' value={(5 + props.monster.attributes.focus) * props.monster.turns}/>
      <NameValuePair name='Basic Attack Bonus' value={aptitudeBonus + props.monster.attributes.expertise}/>
      <NameValuePair name='Special Attack Bonus' value={aptitudeBonus + props.monster.attributes.agility}/>
      <NameValuePair name='Basic Defense' value={9 + props.monster.attributes.prowess + props.monster.attributes.agility}/>
      <NameValuePair name='Prowess Defense' value={specialDefense('prowess')}/>
      <NameValuePair name='Agility Defense' value={specialDefense('agility')}/>
      <NameValuePair name='Expertise Defense' value={specialDefense('expertise')}/>
      <NameValuePair name='Focus Defense' value={specialDefense('focus')}/>
      <NameValuePair name='Presence Defense' value={specialDefense('presence')}/>
    </>
  );
}
