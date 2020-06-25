import React, { Component } from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";

import Home from '../SmallPages/Home';
import Affixes from '../Affixes/View/Affixes';
import AffixEditor from '../Affixes/Edit/AffixEditor';
import Rules from '../Rules/Rules';
import Login from '../SmallPages/Login';
import Settings from '../SmallPages/Settings';
import InitTracker from '../InitTracker/InitTracker';
import MonsterBuilder from '../MonsterBuilder/MonsterBuilder';

export default function RouterBase() {
  return (
    <div>
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/affixes/edit/:affixId" render={(props) => <AffixEditor {...props} /> } />
				<Route path="/affixes">
          <Affixes />
        </Route>
        <Route path="/rules">
          <Rules />
        </Route>
        <Route path="/init">
          <InitTracker />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/monsterBuilder">
          <MonsterBuilder />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}
