import React, { Component } from 'react';
import {
  Typography,
} from '@material-ui/core';

export default class RuleInfo extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    return (
      <Typography paragraph>
        {
          JSON.stringify(this.props.rule)
        }
      </Typography>
    );
  }
}
