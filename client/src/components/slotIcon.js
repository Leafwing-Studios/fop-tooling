import React, { Component } from 'react';

import ArmsIcon from './icons/armsIcon';
import ArmorIcon from './icons/armorIcon';
import TrinketIcon from './icons/trinketIcon';
import ConsumableIcon from './icons/consumableIcon';

export default function SlotIcon(props) {
  if (props.slot === 'Arms') 
  return (
    <ArmsIcon titleText="Arms" />
  );
  if (props.slot === 'Armor') return (
    <ArmorIcon titleText="Armor" />
  );
  if (props.slot === 'Trinket') return (
    <TrinketIcon titleText="Trinket" />
  );
  if (props.slot === 'Consumable') return (
    <ConsumableIcon titleText="Consumable" />
  );
}
