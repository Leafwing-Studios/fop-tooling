import React, { Component } from 'react';
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import DocumentTitle from 'react-document-title';

export default function Affixes(){
  let match = useRouteMatch();

  return (
    <DocumentTitle title='Affixes'>
      <div>
        <h2>This is the affix page! It also has random links!</h2>
        <ul>
          <li>
            <Link to={`${match.url}/affix1`}>Affix 1</Link>
          </li>
          <li>
            <Link to={`${match.url}/affix2`}>Affix 2</Link>
          </li>
        </ul>

        {/* The Topics page has its own <Switch> with more routes
            that build on the /topics URL path. You can think of the
            2nd <Route> here as an "index" page for all topics, or
            the page that is shown when no topic is selected */}
        <Switch>
          <Route path={`${match.path}/:topicId`}>
            <Topic />
          </Route>
          <Route path={match.path}>
            <h3>Please select an affix.</h3>
          </Route>
        </Switch>
      </div>
    </DocumentTitle>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested affix ID: {topicId}</h3>;
}
