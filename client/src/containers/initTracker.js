import React, { Component } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Button,
  Fab,
  IconButton,
  Divider,
} from '@material-ui/core';
import {
  Add as AddIcon
} from '@material-ui/icons';
import Spacer from '../components/spacer';
import InitSide from '../components/initSide';
import Center from '../components/center';
import {
  removeElement
} from '../utils';

class Entity { // helper class for managing entities (players, monsters, etc.)
  constructor(id) {
    this.id = id;
    this.hasTakenTurn = false;
  }
}

class Side { // helper class for managing sides
  constructor(name) {
    this.entities = [];
    this.defaultName = name; // this is basically just the startin name for this side. the actual name is stored in a TextField a few layers down
  }

  getNext() {
    return this.entities.findIndex(a => !a.hasTakenTurn); // finds the first index where hasTakenTurn is false
  }
}

export default class InitTracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      combatStarted: false,
      resolveActive: false,
      totalSides: 1, // total number of sides created. initialized at 1 because users will see this sometimes
      sides: [],
    }
  }

  addSide() {
    const sides = this.state.sides;
    sides.push(new Side(`Side ${this.state.totalSides}`)); // set the starting name. these are also used as keys for the side components, so they must be unique (hence the global side count)

    this.setState({
      sides,
      totalSides: this.state.totalSides + 1
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

  renderControlButtons() { // conditionally renders the control buttons along the top
    // we do this in a function here mostly because it is cleaner- you can use if/else in an intuitive way
    if (!this.state.combatStarted) return ( // this button starts combat
      <Grid item xs={2}>
        <Button variant='contained' color='primary' onClick={() => this.setState({combatStarted: true})}>
          Start Combat
        </Button>
      </Grid>
    );
    else return (
      <>
        <Grid item xs='auto'>
          <Button variant='outlined' color='primary'>
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
      </>
    );
  }

  render() {
    return (
      <>
        <Grid container direction='row' alignItems='flex-end' spacing={2}>
          { this.renderControlButtons() }
        </Grid>
        <Spacer height={20} />
        <Grid container direction='row' alignContents='center' spacing={2}>
          {
            this.state.sides.map((side, index) => (
              <Grid
                item
                xl={2}
                key={side.defaultName /* the key here makes sure that react can keep track of which list item is which. this is important when deleting elements */}
              >
                <InitSide
                  side={side}
                  isInCombat={this.state.combatStarted}
                  removeSide={() => this.removeSide(index)}
                  addEntity={() => this.addEntity(index)}
                />
              </Grid>
            ))
          }
          <Grid item xs>
            <IconButton aria-label='Add Side' onClick={() => this.addSide()}>
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
      </>
    );
  }
}
