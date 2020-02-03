import React, { Component } from 'react';
import {
  Typography,
  Divider
} from '@material-ui/core';

export default class RuleInfo extends Component {
  constructor(props) {
      super(props);
  }
  
  buildList(list) {
    if (list.length === 0) return "None";
    return list.join(', ')
  }

  render() {
    return (
      <div>
        <Typography variant="h4">
          {this.props.rule.name}
        </Typography>
        <Divider />
        <div style={{paddingTop: "10px"}}>
          <Typography>
            {`Source: ${this.props.rule.source}`}
          </Typography>
          <Typography gutterBottom>
            {`Categories: ${this.props.rule.formattedCategories}`}
          </Typography >
          <Typography paragraph>
            {this.props.rule.descLong}
          </Typography>
        </div>
      </div>
    );
  }
}
