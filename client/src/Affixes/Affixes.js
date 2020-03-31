import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import {
  TwoPanelsResizable,
  Lipsum,
  Spacer,
  InfoPanel,
} from '../Common';
import AffixFilters from './AffixFilters';
import AffixGrid from './AffixGrid';
import AffixInfo from './AffixInfo';
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
      allAffixes: [], // this remanins unchanged after page load
      filters: { // filters subcomponent gets a callback to change this bit
        nameDesc: "",
        slot: "",
        cost: "", // this is stored a string because you start with a '-' when typing in negative numbers
        type: [],
        tags: [],
      },
      filteredAffixes: [], // this changes based on filter state
      uniqueTags: [], // used to populate filter options
      currentAffix: null, // which thing is selected in the panel on the right
      filterRefreshFlag: true, // flip this to cause the filter child to refresh- useful for the reset filters button
    };
  }

  componentDidMount() {
    fetch('/api/affix/')
      .then(res => res.json())
      .then(affixes => this.setState({
        allAffixes: affixes,
        filteredAffixes: affixes,
        uniqueTags: affixes.map(affix => affix.tags).flat().filter(onlyUnique).sort(),
      }));

      this.updateFilters(this.state.filters); // this way if someone types something while the page is still loading, the filter still applies
  }

  updateFilters(newFilters) {
    const oldFilters = this.state.filters;
    const filters = {...oldFilters, ...newFilters}; // yknow, i'm starting to like this es7 mixing stuff

    const filteredAffixes = this.state.allAffixes.filter((affix) => (
      (stringContains(affix.name, filters.nameDesc) || stringContains(affix.descShort, filters.nameDesc)) &&
      (filters.tags.length === 0 ? true : affix.tags.some(category => filters.tags.includes(category))) &&
      (parseInt(filters.cost) ? affix.cost === parseInt(filters.cost) : true) &&  // parseInt here because we store as a string
      (filters.slot ? affix.slot === filters.slot : true) &&
      (filters.type.length === 0 ? true : filters.type.includes(affix.affixType))
    ))

    this.setState({
      filters,
      filteredAffixes,
    });
  }

  resetFilters() {
    this.updateFilters({ // reset to defaults
      nameDesc: '',
      slot: '',
      cost: null,
      type: [],
      tags: []
    });

    this.setState({ // force the child to rerender
      filterRefreshFlag: !this.state.filterRefreshFlag
    });
  }

  selectAffix(affix) {
    this.setState({currentAffix: affix});
  }

  render() {
    return (
      <DocumentTitle title='Affixes'>
        <TwoPanelsResizable startingWidth={400}>
          <div>
            <AffixFilters
              onChange={(filters) => this.updateFilters(filters)}
              resetFilters={() => this.resetFilters()}
              uniqueTags={this.state.uniqueTags}
              filters={this.state.filters}
            />
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
