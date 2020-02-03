import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import TwoPanelsResizable from '../components/twoPanelsResizable';
import Lipsum from '../components/lipsum';
import AffixGrid from '../components/affixGrid';
import AffixInfo from '../components/affixInfo';
import InfoPanel from '../components/infoPanel';
import {
  Typography,
} from '@material-ui/core';

export default class Rules extends Component {
  constructor() {
    super();
    this.state = { affixes: [], currentAffix: null };
  }

  componentDidMount() {
    fetch('/api/affix/')
      .then(res => res.json())
      .then(affixes => this.setState({affixes}));
  }

  selectAffix(affix) {
    this.setState({currentAffix: affix});
  }

  render() {
    return (
      <DocumentTitle title='Affixes'>
        <TwoPanelsResizable>
          <div>
            <AffixGrid affixes={this.state.affixes} viewOnClick={(ev, affix) => (this.selectAffix(affix))}/>
          </div>
          <InfoPanel variant={this.state.currentAffix} variantName="an affix">
            <AffixInfo affix={this.state.currentAffix} />
          </InfoPanel>
        </TwoPanelsResizable>
      </DocumentTitle>
    );
  }
}
