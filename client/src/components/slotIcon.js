import React, { Component } from 'react';

import ArmsIcon from './icons/armsIcon';
import ArmorIcon from './icons/armorIcon';
import TrinketIcon from './icons/trinketIcon';
import ConsumableIcon from './icons/consumableIcon';

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
