import React, { Component } from 'react';
import {
  TextField,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import {
  RotateLeft as ResetIcon,
} from '@material-ui/icons';
import {
  Spacer,
  MultipleSelect,
} from '../../Common';

export default function AffixFilters(props) {
  return (
    <div>
      <Grid container direction="row" alignItems="flex-end" spacing={2}>
        <Grid item xs={5}>
          <Spacer height={17}/> {/* remove this after we update the multi select picker */}
          <TextField
            autoFocus
            fullWidth
            label="Search"
            type="search"
            value={props.filters.nameDesc}
            placeholder="Search Names and Descriptions"
            onChange={(event) => (props.onChange({nameDesc: event.target.value}))}
          />
        </Grid>
        <Grid item xs={1}>
          <TextField
            fullWidth
            value={props.filters.cost ? props.filters.cost : ''}
            label="Cost"
            type="search"
            onChange={(event) => (props.onChange({cost: event.target.value}))}
          />
        </Grid>
        <Grid item xs={2}>
          <div style={{display: 'flex'}}>
            <FormControl style={{flexGrow: 1}}> {/* this is incredibly silly */}
              <InputLabel id="slot-select-label">Slot</InputLabel>
              <Select
                onChange={(event) => props.onChange({slot: event.target.value})}
                fullWidth
                value={props.filters.slot}
                labelId="slot-select-label"
                id='slot-select'
              >
                <MenuItem value={null}> <em>All</em> </MenuItem>
                <MenuItem value={'arms'}> Arms </MenuItem>
                <MenuItem value={'armor'}> Armor </MenuItem>
                <MenuItem value={'trinket'}> Trinket </MenuItem>
                <MenuItem value={'consumable'}> Consumable </MenuItem>
              </Select>
            </FormControl>
          </div>
        </Grid>
        <Grid item xs>
          <div style={{display: 'flex'}}>
            <MultipleSelect
              label="Rarity"
              value={props.filters.type}
              items={[
                'Common',
                'Advanced',
                'Exotic',
                'Prismatic'
              ]}
              onChange={(val) => props.onChange({type: val.map(v => v.toLowerCase())})}
            />
          </div>
        </Grid>
      </Grid>
      <Spacer height={10} />
      <Grid container direction="row" alignItems="center" spacing={2}>
        <Grid item lg>
          <div style={{display: 'flex'}}>
            <MultipleSelect
              label="Tags"
              value={props.filters.tags}
              items={props.uniqueTags}
              onChange={(val) => props.onChange({tags: val})}
              helperText='Matches all affixes with at least one of the selected tags'
            />
          </div>
        </Grid>
        <Grid item>
          <Tooltip title='Reset Filters'>
            <IconButton
              size='small'
              onClick={(ev) => props.resetFilters()}
            >
              <ResetIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </div>
  );
}
