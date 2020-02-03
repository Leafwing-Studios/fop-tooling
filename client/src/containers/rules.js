import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import TwoPanelsResizable from '../components/twoPanelsResizable';
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
    this.state = {
      rules: [],
      currentRule: null, // selected rule to show in the info panel on the right
    };
  }

  componentDidMount() {
    // get rules from API
    fetch('/api/rule/')
      .then(res => res.json())
      .then(rules => rules.map(rule => ( // adding an additional column here so we don't have to try to format things inside the grid/info panel 
        {...rule, formattedCategories: rule.categories.join(', ')} // see, it's things like this that make me both love and hate javascript at the same time
      )))
      .then(rules => this.setState({rules}));
  }

  selectRule(rule) {
    this.setState({currentRule: rule});
  }

  render() {
    return (
      <DocumentTitle title='Rules'>
        <TwoPanelsResizable>
          <div>
            <RuleGrid rules={this.state.rules} viewOnClick={(ev, rule) => (this.selectRule(rule))}/>
          </div>
          <InfoPanel variant={this.state.currentRule} variantName="a rule">
            <RuleInfo rule={this.state.currentRule} />
          </InfoPanel>
        </TwoPanelsResizable>
      </DocumentTitle>
    );
  }
}
