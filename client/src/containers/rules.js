import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import TwoPanelsResizable from '../components/twoPanelsResizable';
import Lipsum from '../components/lipsum';
import Spacer from '../components/spacer';
import RuleGrid from '../components/ruleGrid';
import RuleFilters from '../components/ruleFilters';
import RuleInfo from '../components/ruleInfo';
import InfoPanel from '../components/infoPanel';
import {
  Typography,
  Divider,
} from '@material-ui/core';
import onlyUnique from '../utils/onlyUnique';

export default class Rules extends Component {
  constructor() {
    super();
    this.state = {
      allRules: [],
      filters: {
        name: "",
        description: "",
        categories: [],
      },
      filteredRules: [],
      uniqueCategories: [],
      selectedRule: null, // selected rule to show in the info panel on the right
    };
  }

  componentDidMount() {
    // get rules from API
    fetch('/api/rule/')
      .then(res => res.json())
      .then(rules => rules.map(rule => ( // adding an additional column here so we don't have to try to format things inside the grid/info panel 
        {...rule, formattedCategories: rule.categories.join(', ')} // see, it's things like this that make me both love and hate javascript at the same time
      )))
      .then(rules => this.setState({
        allRules: rules, 
        filteredRules: rules,
        uniqueCategories: rules.map(rule => rule.categories).flat().filter(onlyUnique).sort(),
      }));
  }
  
  updateFilters(newFilters) {
    const oldFilters = this.state.filters;
    const filters = {...oldFilters, ...newFilters}; // yknow, i'm starting to like this es7 mixing stuff
    
    const filteredRules = this.state.allRules.filter((rule) => (
      rule.name.toLowerCase().includes(filters.name.toLowerCase()) && 
      rule.descShort.toLowerCase().includes(filters.description.toLowerCase()) &&
      (filters.categories.length === 0 ? true : rule.categories.some(category => filters.categories.includes(category)))
    ))
    
    // update uniqueCategories to reflect the changed data
    
    this.setState({
      filters: filters,
      filteredRules: filteredRules,
    });
  }

  selectRule(rule) {
    this.setState({selectedRule: rule});
  }

  render() {
    return (
      <DocumentTitle title='Rules'>
        <TwoPanelsResizable>
          <div>
            <RuleFilters onChange={(filters) => this.updateFilters(filters)} uniqueCategories={this.state.uniqueCategories} />
            <Spacer height={25}/> 
            {/* debug
            <Typography>
              {JSON.stringify(this.state.filters)}
            </Typography>
            <Typography>
              {JSON.stringify(this.state.filteredRules)}
            </Typography>
            */}
            <RuleGrid rules={this.state.filteredRules} viewOnClick={(ev, rule) => (this.selectRule(rule))} isLoading={this.state.allRules.length === 0}/>
          </div>
          <InfoPanel variant={this.state.selectedRule} variantName="a rule">
            <RuleInfo rule={this.state.selectedRule} />
          </InfoPanel>
        </TwoPanelsResizable>
      </DocumentTitle>
    );
  }
}
