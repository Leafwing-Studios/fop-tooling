import React, { Component } from 'react';
import {
  Typography,
  Divider,
  Grid,
  Tooltip,
  SvgIcon,
} from '@material-ui/core';
import ArmsIcon from './icons/armsIcon';
import ArmorIcon from './icons/armorIcon';
import TrinketIcon from './icons/trinketIcon';
import ConsumableIcon from './icons/consumableIcon';
  
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
  
  getSlotIcon() {
    if (this.props.affix.slot === 'Arms') 
    return (
      <ArmsIcon titleText="Arms" />
    );
    if (this.props.affix.slot === 'Armor') return (
      <ArmorIcon titleText="Armor" />
    );
    if (this.props.affix.slot === 'Trinket') return (
      <TrinketIcon titleText="Trinket" />
    );
    if (this.props.affix.slot === 'Consumable') return (
      <ConsumableIcon titleText="Consumable" />
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
            {
              this.getSlotIcon()
            }
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
            {`Categories: ${this.buildList(this.props.affix.categories)}`}
          </Typography >
          <Typography paragraph>
            {this.props.affix.descLong}
          </Typography>
        </div>
      </div>
    );
  }
}
