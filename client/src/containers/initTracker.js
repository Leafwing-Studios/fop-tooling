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
  Add as AddIcon
} from '@material-ui/icons';
import Spacer from '../components/spacer';
import InitSide from '../components/initSide';
import Center from '../components/center';
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

  startNextTurn() {
    const entityIndex = this.getCurrent();

    if (entityIndex === 0) { // no turns have been taken for this side
      this.entities[0].startTurn();

    } else if (this.entities[entityIndex].isCurrentTurn) { // we rolled to stay on the same side. end current and get next
      this.entities[entityIndex].endTurn();
      this.entities[entityIndex + 1].startTurn();

    } else { // we're coming in after switching sides. start current
      this.entities[entityIndex].startTurn();
    }

    // yes, i recognize i can save a branch statement if i compress this block, but i think this is more clear
  }

  endCurrentTurn() {
    const entityIndex = this.getCurrent();

    this.entities[entityIndex].endTurn();
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
    }

    this.addSide('playerId', 'Players'); // we need to set the ids here because our normal hack of using the timestamp doesn't work if they happen at the same time
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
      sides: sides,
    });
  }

  nextTurn() { // roll a d4 to determine if we change sides or stay on the same side
    const d4 = randRange(4); // random number between 0 and 3

    if (d4 === 0) { // same side!
      const sides = this.state.sides;
      sides[this.state.mostRecentTurn].startNextTurn();

      this.setState({sides});
    } else { // pick a different side!
      // pick a random index other than mostRecentTurn
      let sideIndex = randRange(this.state.sides.length-1); // get a random index in this array, intentionally omitting the last index
      if (sideIndex === this.state.mostRecentTurn) sideIndex = this.state.sides.length-1 // if we get the index that we should avoid, then set to the last index

      const sides = this.state.sides;

      sides[this.state.mostRecentTurn].endCurrentTurn();
      sides[sideIndex].startNextTurn();

      this.setState({
        mostRecentTurn: sideIndex,
        sides,
      });
    }
  }

  renderControlButtons() { // conditionally renders the control buttons along the top
    // we do this in a function here mostly because it is cleaner- you can use if/else in an intuitive way
    const spacerWidth = 150; // we add spacers so that the width of the column is consisitent. it's messy, but this element is really thin so I'm not worried about how responsive it it/isn't

    if (!this.state.combatStarted) return ( // this button starts combat
      <>
        <Grid item xs='auto'>
          <Button variant='contained' color='primary' onClick={() => this.startCombat()}>
            Start Combat
          </Button>
        </Grid>
        <Grid item xs='auto'>
          <Spacer width={spacerWidth} />
        </Grid>
      </>
    );
    else return (
      <>
        <Grid item xs='auto'>
          <Button variant='outlined' color='primary' onClick={() => this.nextTurn()}>
            Next Turn
          </Button>
        </Grid>
        <Grid item xs='auto'>
          <Button variant='outlined' color='primary'>
            Use Resolve
          </Button>
        </Grid>
        <Grid item xs='auto'>
          <Button variant='contained' color='primary' onClick={() => this.setState({combatStarted: false})}>
            Finish Combat
          </Button>
        </Grid>
        <Grid item xs='auto'>
          <Spacer width={spacerWidth} />
        </Grid>
      </>
    );
  }

  render() {
    return (
      <>
        <Typography variant='h4'>
          Initiative Tracker
        </Typography>
        <Divider />
        <Spacer height={20} />
        <Grid container direction='row' alignContents='center' spacing={2}>
          <Grid item md='auto'>
            <Grid container direction='column' alignItems='flex-end' spacing={2}>
              { this.renderControlButtons() }
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
