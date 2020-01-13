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
      // this.id = this.props.match.params.id;
      this.state = {
        id: this.props.match.params.id,
      };
  }

  componentDidMount() {
    this.getRule();
  }

  getRule = () => {
    fetch(`/api/rule/${this.state.id}`)
      .then(res => res.json())
      .then(rule => this.setState({ rule }));
  }

  render() {
    return (
      <Typography paragraph>
        {JSON.stringify(this.state.rule)}
      </Typography>
    );
  }
}

export default withRouter(RuleInfo);
