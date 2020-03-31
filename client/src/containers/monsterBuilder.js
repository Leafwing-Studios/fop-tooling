import React, { Component } from 'react';
import ControlledStepper from '../components/controlledStepper';
import {
  Typography
} from '@material-ui/core';

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

  render() {
    return (
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
        <Typography>This is the section for the Name and Description</Typography>
        <Typography>This is the section for the Statistics</Typography>
        <Typography>This is the section for the Arms</Typography>
        <Typography>This is the section for the Armor</Typography>
        <Typography>This is the section for the Trinkets</Typography>
        <Typography>This is the section for the Powers</Typography>
      </ControlledStepper>
    );
  }
}
