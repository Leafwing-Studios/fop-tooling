import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import {
  withRouter,
} from "react-router-dom";
import {
  Typography,
} from '@material-ui/core';

class RuleInfo extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    return (
      <Typography paragraph>
        {
          this.props.rule ? JSON.stringify(this.props.rule) : "Select a rule to see more information about it"
        }
      </Typography>
    );
  }
}

export default withRouter(RuleInfo);
