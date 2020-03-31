import React, { Component } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Button,
  Fab,
  IconButton,
  Divider,
  Tooltip,
} from '@material-ui/core';
import {
  Alert
} from '@material-ui/lab';
import {
  Add as AddIcon
} from '@material-ui/icons';
import {
  Spacer
} from '../Common';
import InitSide from './InitSide';
import InitButtons from './InitButtons';
import {
  removeElement,
  randRange,
} from '../utils';

class Entity { // helper class for managing entities (players, monsters, etc.)
  constructor(id) {
    this.id = id;
    this.hasFinishedTurn = false;
    this.isCurrentTurn = false; // whether it is currently this entity's turn. yeah, the double boolean is messy, i know
  }

  startTurn() {
    this.hasFinishedTurn = false;
    this.isCurrentTurn = true;
  }

  endTurn() {
    this.isCurrentTurn = false;
    this.hasFinishedTurn = true;
  }

  reset() {
    this.hasFinishedTurn = false;
    this.isCurrentTurn = false;
  }
}

class Side { // helper class for managing sides
  constructor(id, name) {
    this.entities = [];
    this.id = id;
    this.defaultName = name;
  }

  getCurrent() {
    return this.entities.findIndex(a => !a.hasFinishedTurn); // finds the entity which has not finished its turn (is current turn)
  }

  hasTurnsLeft() {
    const currentTurnIndex = this.getCurrent();

    return (
      (currentTurnIndex !== -1) && // taking advantage of the fact that findIndex returns -1 if nothing is found
      !(this.entities[currentTurnIndex].isCurrentTurn && currentTurnIndex === this.entities.length -1) // if the final turn is the current turn, we also want to return false
    )
  }

  startNextTurn() {
    const entityIndex = this.getCurrent();

    if (this.entities[entityIndex].isCurrentTurn) { // we rolled to stay on the same side. end current and get next
      this.entities[entityIndex].endTurn();
      this.entities[entityIndex + 1].startTurn();

    } else if (entityIndex === 0) { // no turns have been taken for this side
      this.entities[0].startTurn();

    } else { // we're coming in after switching sides. start current
      this.entities[entityIndex].startTurn();
    }

    // yes, i recognize i can save a branch statement if i compress this block, but i think this is more clear
  }

  endCurrentTurn() {
    const entityIndex = this.getCurrent();

    if (this.entities[entityIndex].isCurrentTurn) { // we should only end things that are actually taking their turns (the bad case can happen when the round resets)
      this.entities[entityIndex].endTurn();
    }
  }

  reset() { // resets to initial state - no combatants have taken turns yet
    this.entities.forEach(entity => entity.reset());
  }
}

export default class InitTracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      combatStarted: false,
      resolveActive: false,
      sides: [],
      mostRecentTurn: null, // the index of the side that most recently had a turn.
      statusText: 'Combat has yet to begin!', // text that shows in the alert at the top
    }

    this.addSide('playerId', 'Players'); // we need to manually set the ids here because our normal hack of using the timestamp doesn't work if they happen at the same time
    this.addSide('side2Id');
  }

  addSide(id, name) {
    const sides = this.state.sides;
    sides.push( // set the ID. these are used as keys for the side components, so they must be unique
      new Side(
        id || new Date().getTime(), // we don't really care what the id is as long as it's unique, so the current timestamp will do
        name || ''
      )
    );

    this.setState({
      sides,
    });
  }

  removeSide(index) { // cut out the side at the index given
    const sides = removeElement(this.state.sides, index);
    this.setState({sides});
  }

  addEntity(index) { // adds another entity (player, monster, etc.) to the side at the provided index
    const sides = this.state.sides;

    sides[index].entities.push( // add a new entity to the list
      new Entity(new Date().getTime()) // we dont really care what the id is as long as it's unique, so the current timestamp will do
    );

    this.setState({sides});
  }

  removeEntity(sideIndex, entityIndex) { // remove an entity
    let sides = this.state.sides;
    const newEntities = removeElement(sides[sideIndex].entities, entityIndex);
    sides[sideIndex].entities = newEntities; // ew, variable reassignment!

    this.setState({sides});
  }

  removeAllEntities(sideIndex) { // removes all entities on a side
    let sides = this.state.sides;
    sides[sideIndex].entities = [];

    this.setState({sides});
  }

  startCombat() {
    const sideIndex = randRange(this.state.sides.length); // get a random index in this array
    const sides = this.state.sides;
    sides[sideIndex].entities[0].startTurn();

    this.setState({
      mostRecentTurn: sideIndex,
      combatStarted: true,
      sides,
      statusText: 'Combat has started! A random side has been rolled to start first.',
    });
  }

  endCombat() { // resets everything, except which sides are active and what's in them
    const sides = this.state.sides;
    sides.forEach((side) => side.reset());

    this.setState({
      sides,
      combatStarted: false,
      resolveActive: false,
      mostRecentTurn: null,
      statusText: 'Combat has yet to begin!'
    });
  }

  nextTurn() {
    // there's a lot of array scanning in this function, but there's expected to be very few sides, so it should be fine

    const sides = this.state.sides;
    // if nothing has any turns left, completely reset sides
    if (this.state.sides.every(side => !side.hasTurnsLeft())) {
      sides.forEach((side) => side.reset());
    }

    // roll a d4 to determine if we change sides or stay on the same side
    const d4 = randRange(4); // random number between 0 and 3

    if (
      d4 === 0 && // we got lucky on the roll and...
      sides[this.state.mostRecentTurn].hasTurnsLeft() // ...we actually can keep playing this side
    ) { // same side!

      const isOnlySideLeft = sides.filter(side => side.hasTurnsLeft()).length <= 1;
      sides[this.state.mostRecentTurn].startNextTurn();

      this.setState({
        sides,
        statusText: isOnlySideLeft ? 'Only one side left! They get all their remaining turns before the round resets.' : 'Rolling to see which side goes next... 4! The same side gets another turn!'
      });

    } else { // pick a different side!

      const sidesWithTurns = sides.filter(side => side.hasTurnsLeft());
      // since we're filtering out some sides, we need to use our unique keys instead of indicies
      const idOfMostRecentTurn = sides[this.state.mostRecentTurn].id;
      const badIndex = sidesWithTurns.findIndex(side => side.id === idOfMostRecentTurn); // this will return undefined if the most recent turn is now out of turns

      let filteredSideIndex; // index of the chosen side in the filtered array

      if (badIndex !== undefined) { // if the most recent side still has turns left
        // pick a random index (in the filtered array) that doesn't correspond to the most recent turn
        filteredSideIndex = randRange(sidesWithTurns.length-1); // get a random index in this array, intentionally omitting the last index
        if (filteredSideIndex === badIndex) filteredSideIndex = sidesWithTurns.length-1; // if we get the index that we should avoid, then set to the last index.
      } else { // the most recent side is out of turns, just pick a side at random
        filteredSideIndex = randRange(sidesWithTurns.length);
      }

      const originalIndex = sides.findIndex(side => side.id === sidesWithTurns[filteredSideIndex].id)// the index in the original sides array of the side we just picked

      sides[this.state.mostRecentTurn].endCurrentTurn();
      sides[originalIndex].startNextTurn();

      // figure out the status text
      let statusText;
      if (sidesWithTurns.length === 1) {
        statusText = 'Only one side left! They get all their remaining turns before the round resets.'
      } else {
        statusText = `Rolling to see which side goes next... ${d4}! ${sides.length === 2 ? 'Switching current turn to the opposite side.' : 'A random new side has been rolled.'}`;
      }

      this.setState({
        mostRecentTurn: originalIndex,
        sides,
        statusText,
      });
    }
  }

  render() {
    return (
      <>
        <Typography variant='h4'>
          Initiative Tracker
        </Typography>
        <Divider />
        <Spacer height={10} />
        <Alert severity='info' style={{maxWidth: 620}}>
          {this.state.statusText}
        </Alert>
        <Spacer height={10} />
        <Grid container direction='row' alignContents='center' spacing={2}>
          <Grid item md='auto'>
            <Grid container direction='column' alignItems='flex-end' spacing={2}>
              <InitButtons
                sides={this.state.sides}
                combatStarted={this.state.combatStarted}
                startCombat={() => this.startCombat()}
                endCombat={() => this.endCombat()}
                nextTurn={() => this.nextTurn()}
              />
            </Grid>
          </Grid>
          <Grid item xs='auto'>
            <Divider orientation='vertical' fullWidth/>
          </Grid>
          {
            this.state.sides.map((side, index) => (
              <Grid
                item
                xl={2}
                key={side.id /* the key here makes sure that react can keep track of which list item is which. this is important when deleting elements */}
              >
                <InitSide
                  side={side}
                  isInCombat={this.state.combatStarted}
                  removeSide={() => this.removeSide(index)}
                  addEntity={() => this.addEntity(index)}
                  removeEntity={(entityIndex) => this.removeEntity(index, entityIndex)}
                  removeAllEntities={() => this.removeAllEntities(index)}
                />
              </Grid>
            ))
          }
          <Grid item xs>
            <Tooltip title="Add side" aria-label='add-side'>
              <IconButton onClick={() => this.addSide()}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </>
    );
  }
}
