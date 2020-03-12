import React, { Component } from 'react';
import {
  TextField,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import Spacer from './spacer';
import MultipleSelect from './multipleSelect';

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
            placeholder="Search Names and Descriptions"
            onChange={(event) => (props.onChange({nameDesc: event.target.value}))}
          />
        </Grid>
        <Grid item xs={1}>
          <TextField
            fullWidth
            label="Cost"
            type="search"
            onChange={(event) => (props.onChange({cost: parseInt(event.target.value)}))}
          />
        </Grid>
        <Grid item xs={2}>
          <div style={{display: 'flex'}}>
            <FormControl style={{flexGrow: 1}}> {/* this is incredibly silly */}
              <InputLabel id="slot-select-label">Slot</InputLabel>
              <Select
                onChange={(event) => props.onChange({slot: event.target.value})}
                fullWidth
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
              label="Type"
              items={[
                'Mundane',
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
      <div style={{display: 'flex'}}>
        <MultipleSelect
          label="Tags"
          items={props.uniqueTags}
          onChange={(val) => props.onChange({tags: val})}
        />
      </div>
    </div>
  );
}
