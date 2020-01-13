import React, { Component } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import {
  Container,
} from '@material-ui/core';
import Lipsum from '../components/lipsum';

export default function InfoPanel(props) {
  let match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/:id`}>
        {props.children}
      </Route>
      <Route path={match.path}>
        <Container>
          <h3><i>Select a {props.type} to see details about it.</i></h3>
        </Container>
      </Route>
    </Switch>
  );
}
