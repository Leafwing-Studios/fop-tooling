import React, { Component } from 'react';

import ArmsIcon from './ArmsIcon';
import ArmorIcon from './ArmorIcon';
import TrinketIcon from './TrinketIcon';
import ConsumableIcon from './ConsumableIcon';

export default function SlotIcon(props) {
  if (props.slot === 'arms')
  return (
    <ArmsIcon titleText="Arms" />
  );
  if (props.slot === 'armor') return (
    <ArmorIcon titleText="Armor" />
  );
  if (props.slot === 'trinket') return (
    <TrinketIcon titleText="Trinket" />
  );
  if (props.slot === 'consumable') return (
    <ConsumableIcon titleText="Consumable" />
  );
}
