import React from 'react';
import {
  SvgIcon,
  Tooltip,
} from '@material-ui/core';

export default function IconBase(props) {
  return (
    <Tooltip title={props.titleText}>
      <SvgIcon viewBox="0 0 512 512" fontSize={props.fontSize || "large"}>
        <path d={props.path} />
      </SvgIcon>
    </Tooltip>
  );
};
