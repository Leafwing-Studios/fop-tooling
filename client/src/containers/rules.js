import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import TwoColumns from './twoColumns';
import Lipsum from '../components/lipsum';
import InfoPanel from './infoPanel';
import RuleInfo from '../components/ruleInfo';
import {Typography} from '@material-ui/core';
import {
  Link,
  withRouter,
} from "react-router-dom";

class Rules extends Component {
  constructor() {
    super();
    this.state = { rules: [] };
  }

  componentDidMount() {
    fetch('/api/rule/')
      .then(res => res.json())
      .then(rules => this.setState({rules}));
  }

  render() {
    return (
      <DocumentTitle title='Rules'>
        <TwoColumns>
          <div>
            {this.state.rules.map(rule => (
              <div>
                <Link to={`${this.props.match.url}/${rule._id}`}>
                  <h2>{rule.title || "No Title Found"}</h2>
                </Link>
                <Typography>
                  {rule._id}
                </Typography>
                <Typography>
                  {rule.descShort}
                </Typography>
              </div>
            ))}
          </div>
          <InfoPanel type='rule'>
            <RuleInfo />
          </InfoPanel>
        </TwoColumns>
      </DocumentTitle>
    );
  }
}

export default withRouter(Rules);
