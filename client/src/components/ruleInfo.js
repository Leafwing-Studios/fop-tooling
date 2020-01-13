import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import {
  withRouter,
} from "react-router-dom";

class RuleInfo extends Component {
  constructor(props) {
      super(props);
      this.id = this.props.match.params.id;
      this.state = { rule: {descShort: 'place', descLong: 'holder'} };
  }

  componentDidMount() {
    this.getRule();
  }

  getRule = () => {
    fetch(`/api/rule/${this.id}`)
      .then(res => res.json())
      .then(rule => this.setState({ rule }));
  }

  render() {
    return (
      <p>
        {JSON.stringify(this.state.rule)}
      </p>
    );
  }
}

export default withRouter(RuleInfo);
