import React from 'react';
import {
  Typography,
  Drawer,
} from '@material-ui/core';
import TwoPanelsResizable from './twoPanelsResizable';
import Lipsum from '../components/lipsum';

export default function Login() {
  return (
    <div>
      <TwoPanelsResizable>
        <div>
          <Typography paragraph>
            <i>Hacker voice</i> I'm in.
          </Typography>
          <Lipsum />
        </div>
        <Lipsum />
      </TwoPanelsResizable>
    </div>
  );
}
