import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import TwoColumns from './twoColumns';
import Lipsum from '../components/lipsum';
import RuleGrid from '../components/ruleGrid';
import RuleInfo from '../components/ruleInfo';
import InfoPanel from '../components/infoPanel';
import {
  Typography,
} from '@material-ui/core';

export default class Rules extends Component {
  constructor() {
    super();
    this.state = { rules: [], currentRule: null };
  }

  componentDidMount() {
    fetch('/api/rule/')
      .then(res => res.json())
      .then(rules => this.setState({rules}));
  }

  selectRule(rule) {
    this.setState({currentRule: rule});
  }

  render() {
    return (
      <DocumentTitle title='Rules'>
        <TwoColumns>
          <div>
            <RuleGrid rules={this.state.rules} viewOnClick={(ev, rule) => (this.selectRule(rule))}/>
          </div>
          <InfoPanel variant={this.state.currentRule} variantName="a rule">
            <RuleInfo rule={this.state.currentRule} />
          </InfoPanel>
        </TwoColumns>
      </DocumentTitle>
    );
  }
}
