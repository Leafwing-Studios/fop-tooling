import React, { Component } from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";

import Home from '../SmallPages/Home';
import Affixes from '../Affixes/View/Affixes';
import AffixEditor from '../Affixes/Edit/AffixEditor';
import AffixPage from '../Affixes/View/AffixPage';
import Rules from '../Rules/Rules';
import Login from '../SmallPages/Login';
import Profile from '../SmallPages/Profile';
import Settings from '../SmallPages/Settings';
import InitTracker from '../InitTracker/InitTracker';
import MonsterBuilder from '../MonsterBuilder/MonsterBuilder';

export default function RouterBase() {
  return (
    <div>
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/affixes/edit/:affixId" render={(props) => <AffixEditor mode="edit" {...props} /> } />
				<Route path="/affixes/new" render={(props) => <AffixEditor mode="new" {...props} /> } />
				<Route path="/affixes/copy/:affixId" render={(props) => <AffixEditor mode="copy" {...props} /> } />
				<Route path="/affixes/:affixId" render={(props) => <AffixPage {...props} /> } />
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
        <Route path="/profile">
          <Profile />
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
