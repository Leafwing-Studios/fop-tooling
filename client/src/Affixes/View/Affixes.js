import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../redux/selectors';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router-dom';
import {
  TwoPanelsResizable,
  Lipsum,
  Spacer,
  InfoPanel,
  TwoColumns,
} from '../../Common';
import AffixFilters from './AffixFilters';
import AffixGrid from './AffixGrid';
import AffixInfo from './AffixInfo';
import {
  Typography,
	Button
} from '@material-ui/core';
import {
  onlyUnique,
  stringContains,
} from '../../utils';

class Affixes extends Component {
  constructor(props) {
    super(props);
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
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // this is required so the server knows what type of body you're sending it
      body: JSON.stringify({query: this.props.defaultFilter || {}}), // give an empty object by default so the api doesn't freak out about the query field not existing
    };

    fetch('/api/affix/allWhere', requestOptions)
      .then(res => res.json())
      .then(affixes => this.setState({
        allAffixes: affixes,
        filteredAffixes: affixes,
        uniqueTags: affixes.map(affix => affix.tags).flat().filter(onlyUnique).sort(),
      }))
			.then(() => this.updateFilters(this.state.filters)); // this way if someone types something while the page is still loading, the filter still applies
  }

  updateFilters(newFilters) {
    const oldFilters = this.state.filters;
    const filters = {...oldFilters, ...newFilters}; // yknow, i'm starting to like this es7 mixing stuff

    const filteredAffixes = this.state.allAffixes.filter((affix) => (
      (stringContains(affix.name, filters.nameDesc) || stringContains(affix.descShort, filters.nameDesc) || stringContains(affix.descLong, filters.nameDesc)) &&
      (filters.tags.length === 0 ? true : affix.tags.some(category => filters.tags.includes(category))) &&
      (isNaN(parseFloat(filters.cost)) ? true: affix.cost === parseFloat(filters.cost)) &&  // parseFloat here because we store as a string
      (filters.slot ? affix.slot === filters.slot : true) &&
      (filters.type.length === 0 ? true : filters.type.includes(affix.affixType))
    ))

    this.setState({
      filters,
      filteredAffixes,
    });
  }
	
	refresh() { // refreshes the component, pulling a new affix list and reseting the info panel. used to reset the page after deleting an affix
		this.setState({
			currentAffix: null,
			allAffixes: []
		});
		this.componentDidMount();
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
        <TwoColumns>
          <div>
            <AffixFilters
              onChange={(filters) => this.updateFilters(filters)}
              resetFilters={() => this.resetFilters()}
              uniqueTags={this.state.uniqueTags}
              filters={this.state.filters}
            />
            <Spacer height={15} />
						
						{ this.props.user.isAdmin && (
							<Link to='/affixes/new' style={{textDecoration: 'none'}}>
								<Button variant='contained'>New Affix</Button>
							</Link>
						)}
						
						<Spacer height={15} />
            
            {false && JSON.stringify(this.state.filters)}
            {false && JSON.stringify(this.state.filteredAffixes) /* debug */}

            <AffixGrid 
              affixes={this.state.filteredAffixes} 
              selectedId={this.state.currentAffix && this.state.currentAffix._id}
              viewOnClick={(ev, affix) => (this.selectAffix(affix))} 
              isLoading={this.state.allAffixes.length === 0}
            />
          </div>
          <InfoPanel variant={this.state.currentAffix} variantName="an affix">
            <AffixInfo 
							affix={this.state.currentAffix}
							refresh={() => this.refresh()}
						/>
          </InfoPanel>
        </TwoColumns>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = state => ({
	user: getUser(state)
});

export default connect(
	mapStateToProps
)(Affixes);
