import React from 'react'
import Typography from '@material-ui/core/Typography';

export default function NameValuePair(props) {
  return (
    <Typography>
      <b>{`${props.name}: `}</b>
      {isNaN(props.value) ? '' : props.value}
    </Typography>
  );
}
