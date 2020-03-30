import React from 'react';
import ControlledStepper from '../components/controlledStepper';
import {
  Typography
} from '@material-ui/core';

export default function MonsterBuilder() {
  return (
    <ControlledStepper
      steps={['Step 1', 'Step 2', 'Step 3']}
    >
      {
        ['This is the first step!', 'This is the second step!', 'This is the third step!', "You're done!"].map(label => (
          <Typography> {label} </Typography>
        ))
      }
    </ControlledStepper>
  );
}
