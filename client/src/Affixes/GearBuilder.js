import React, { Component } from 'react';
import {
  Typography
} from '@material-ui/core';

import Affixes from './Affixes';
import {
  ControlledStepper,
  Title,
} from '../Common';

export default class GearBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <>
        <Affixes {...this.props}/>
      </>
    );
  }
}
