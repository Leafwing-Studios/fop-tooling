import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import TwoColumns from './twoColumns';
import Lipsum from '../components/lipsum';
import RuleInfo from '../components/ruleInfo';
import InfoPanel from '../components/infoPanel';
import {
  Typography,
  IconButton,
  Toolbar,
} from '@material-ui/core';
import {
  Visibility as VisibilityIcon
} from '@material-ui/icons'
import {
  Link,
  withRouter,
} from "react-router-dom";

class Rules extends Component {
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
            {this.state.rules.map(rule => (
              <div>
                <Toolbar>
                  <IconButton aria-label="view" onClick={() => (this.selectRule(rule))}>
                    <VisibilityIcon />
                  </IconButton>
                  <h2>{rule.title || "No Title Found"}</h2>
                </Toolbar>
                <Typography>
                  {rule._id}
                </Typography>
                <Typography>
                  {rule.descShort}
                </Typography>
              </div>
            ))}
          </div>
          <InfoPanel variant={this.state.currentRule} variantName="rule">
            <RuleInfo rule={this.state.currentRule} />
          </InfoPanel>
        </TwoColumns>
      </DocumentTitle>
    );
  }
}

export default withRouter(Rules);
