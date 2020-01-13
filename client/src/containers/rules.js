import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import TwoColumns from './twoColumns';
import Lipsum from '../components/lipsum';
import InfoPanel from './infoPanel';
import RuleInfo from '../components/ruleInfo';

export default function Rules() {
  return (
    <DocumentTitle title='Rules'>
      <TwoColumns>
        <div>
          <p>first arg</p>
          <Lipsum />
        </div>
        <InfoPanel type='rule'>
          <RuleInfo />
        </InfoPanel>
      </TwoColumns>
    </DocumentTitle>
  );
}
