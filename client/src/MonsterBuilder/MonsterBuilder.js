import React, { Component } from 'react';
import {
  Typography
} from '@material-ui/core';

import {
  ControlledStepper,
  Title,
} from '../Common';
import NameAndDescriptionEntry from './NameAndDescriptionEntry';
import MonsterStatistics from './MonsterStatistics';
import GearBuilder from '../Affixes/GearBuilder';

export default class MonsterBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      monster: {
        name: '',
        description: '',
        tier: null,
        turns: 1,
        attributes: {
          prowess: null,
          agility: null,
          expertise: null,
          focus: null,
          presence: null,
        },
        trainedDefenses: {
          prowess: false,
          agility: false,
          expertise: false,
          focus: false,
          presence: false,
        },
        trainedSkills: [],
      }
    }
  }

  updateMonster(newMonster) {
    const oldMonster = this.state.monster;
    const monster = {...oldMonster, ...newMonster}

    this.setState({monster});
  }

  render() {
    return (
      <>
        <Title text='Monster Builder' marginBelow={7}/>
        {false && JSON.stringify(this.state.monster)}
        <ControlledStepper
          steps={[
            'Name and Description',
            'Statistics',
            'Arms',
            'Armor',
            'Trinkets',
            'Powers'
          ]}
        >
          <NameAndDescriptionEntry updateMonster={(monster) => this.updateMonster(monster)} monster={this.state.monster}/>
          <MonsterStatistics updateMonster={(monster) => this.updateMonster(monster)} monster={this.state.monster}/>
          <GearBuilder
            defaultFilter={{
              slot: 'arms',
            }}
          />
          <Typography>This is the section for the Armor</Typography>
          <Typography>This is the section for the Trinkets</Typography>
          <Typography>This is the section for the Powers</Typography>
        </ControlledStepper>
      </>
    );
  }
}
