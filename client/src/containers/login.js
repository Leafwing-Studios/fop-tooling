import React from 'react';
import {
  Typography,
  Drawer,
} from '@material-ui/core';
import ResizableDrawer from './resizableDrawer';
import ResponsiveDrawer from './responsiveDrawer';
import Lipsum from '../components/lipsum';

export default function Login() {
  return (
    <div>
      <ResponsiveDrawer>
        <Typography paragraph>
          <i>Hacker voice</i> I'm in.
        </Typography>
        <Lipsum />
      </ResponsiveDrawer>
    </div>
  );
}
