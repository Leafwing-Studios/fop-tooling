import React, { Component } from 'react';
import {
  Typography
} from '@material-ui/core';

import {
  ControlledStepper,
  Title,
} from '../Common';
import NameAndDescriptionEntry from './NameAndDescriptionEntry';

export default class MonsterBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      monster: {
        name: '',
        description: '',
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
        {JSON.stringify(this.state.monster)}
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
          <NameAndDescriptionEntry updateMonster={(monster) => this.updateMonster(monster)} name={this.state.monster.name} description={this.state.monster.description}/>
          <Typography>This is the section for the Statistics</Typography>
          <Typography>This is the section for the Arms</Typography>
          <Typography>This is the section for the Armor</Typography>
          <Typography>This is the section for the Trinkets</Typography>
          <Typography>This is the section for the Powers</Typography>
        </ControlledStepper>
      </>
    );
  }
}
