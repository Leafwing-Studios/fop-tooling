import React, { Component } from 'react';
import {
  Typography,
  Divider,
  Grid,
  Tooltip,
  SvgIcon,
} from '@material-ui/core';
import SlotIcon from './slotIcon';

export default class AffixInfo extends Component {
  constructor(props) {
      super(props);
  }

  buildList(list) {
    if (list.length === 0) return "None";
    return list.join(', ')
  }

  getElementsString() {
    if (this.props.affix.affixType === 'Elemental') return (
      <Typography>
        {`Elements: ${this.buildList(this.props.affix.elements)}`}
      </Typography>
    );
  }

  render() {
    return (
      <div>
        <Grid container direction="row" alignItems="center">
          <Grid item xs>
            <Typography variant="h4">
              {this.props.affix.name}
            </Typography>
          </Grid>
          <Grid item justify="flex-end">
            <SlotIcon slot={this.props.affix.slot}/>
          </Grid>
        </Grid>
        <Divider />
        <div style={{paddingTop: "10px"}}>
          <Typography>
            {`Source: ${this.props.affix.source}`}
          </Typography>
          <Typography>
            {`${this.props.affix.affixType === 'Mundane' ? 'Equipment' : 'Enchantment'} Point Cost: ${this.props.affix.cost}`}
          </Typography>
          <Typography>
            {`Max Replicates: ${this.props.affix.maxReplicates}`}
          </Typography>
          <Typography>
            {`Affix Type: ${this.props.affix.affixType}`}
          </Typography>
          <Typography>
            {`Prerequisites: ${this.props.affix.prerequisites}`}
          </Typography>
          {
            this.getElementsString()
          }
          <Typography gutterBottom>
            {`Categories: ${this.buildList(this.props.affix.categories || [])}`}
          </Typography >
          <Typography paragraph>
            {this.props.affix.descLong}
          </Typography>
        </div>
      </div>
    );
  }
}
