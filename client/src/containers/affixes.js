import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import TwoPanelsResizable from '../components/twoPanelsResizable';
import Lipsum from '../components/lipsum';
import Spacer from '../components/spacer';
import AffixFilters from '../components/affixFilters';
import AffixGrid from '../components/affixGrid';
import AffixInfo from '../components/affixInfo';
import InfoPanel from '../components/infoPanel';
import {
  Typography,
} from '@material-ui/core';
import {
  onlyUnique,
  stringContains,
} from '../utils';

export default class Rules extends Component {
  constructor() {
    super();
    this.state = {
      allAffixes: [], 
      filters: {
        nameDesc: "",
        slot: "",
        cost: null,
        type: "",
        elements: [],
        categories: [],
      },
      filteredAffixes: [],
      uniqueCategories: [],
      uniqueElements: [],
      currentAffix: null 
    };
  }

  componentDidMount() {
    fetch('/api/affix/')
      .then(res => res.json())
      .then(affixes => affixes.map(affix => ( // adding an additional column here so we don't have to try to format things inside the grid/info panel 
        {
          ...affix, // see, it's things like this that make me both love and hate javascript at the same time
          formattedCategories: affix.categories.join(', '),
          formattedElements: affix.elements.join(', '),
        } 
      )))
      .then(affixes => this.setState({
        allAffixes: affixes,
        filteredAffixes: affixes,
        uniqueElements: affixes.map(affix => affix.elements).flat().filter(onlyUnique).sort(),
        uniqueCategories: affixes.map(affix => affix.categories).flat().filter(onlyUnique).sort(),
      }));
  }

  updateFilters(newFilters) {
    const oldFilters = this.state.filters;
    const filters = {...oldFilters, ...newFilters}; // yknow, i'm starting to like this es7 mixing stuff
    
    const filteredAffixes = this.state.allAffixes.filter((affix) => (
      (stringContains(affix.name, filters.nameDesc) || stringContains(affix.descShort, filters.nameDesc)) &&
      (filters.categories.length === 0 ? true : affix.categories.some(category => filters.categories.includes(category)))
    ))
    
    this.setState({
      filters,
      filteredAffixes,
    });
  }

  selectAffix(affix) {
    this.setState({currentAffix: affix});
  }

  render() {
    return (
      <DocumentTitle title='Affixes'>
        <TwoPanelsResizable startingWidth={550}>
          <div>
            <AffixFilters onChange={(filters) => this.updateFilters(filters)} uniqueCategories={this.state.uniqueCategories} />
            <Spacer height={25} />
            
            <AffixGrid affixes={this.state.filteredAffixes} viewOnClick={(ev, affix) => (this.selectAffix(affix))} isLoading={this.state.allAffixes.length === 0}/>
          </div>
          <InfoPanel variant={this.state.currentAffix} variantName="an affix">
            <AffixInfo affix={this.state.currentAffix} />
          </InfoPanel>
        </TwoPanelsResizable>
      </DocumentTitle>
    );
  }
}
