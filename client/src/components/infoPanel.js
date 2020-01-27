import React, { Component } from 'react';
import {
  Container,
} from '@material-ui/core';

export default class InfoPanel extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    if (this.props.variant) {
      return (
        <div>
          {this.props.children}
        </div>
      );
    } else {
      return (
        <Container>
          <h3><i>Click {this.props.variantName} to see details about it.</i></h3>
        </Container>
      );
    }

  }
}
