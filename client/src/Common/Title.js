import React from 'react';
import {
  Typography,
  Divider,
} from '@material-ui/core';

import Spacer from './Spacer';

export default function Title(props) {
  return (
    <>
      <Typography variant='h4'>
        {props.text}
      </Typography>
      <Divider />
      <Spacer height={props.marginBelow || 0} />
    </>
  )
}
