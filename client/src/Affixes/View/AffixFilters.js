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
	SearchSelect,
} from '../../Common';
import {
	titleCase,
} from '../../utils';

export default function AffixFilters(props) {
  return (
    <div>
      <Grid container direction="row" alignItems="flex-end" spacing={2}>
        <Grid item xs={5}>
          <Spacer height={17}/> {/* remove this after we update the multi select picker */}
          <TextField
            autoFocus
            fullWidth
						onFocus={(ev) => ev.target.select()}
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
					<SearchSelect
						label="Rarity"
						options={['Common', 'Advanced', 'Exotic', 'Prismatic']}
						multiple
						readOnly
						defaultValue={props.filters.type.map(v => titleCase(v))}
						onChange={(ev, val) => {
							let lowerVals = []
							for (var i=0; i<val.length; i++) {
								lowerVals.push(val[i].toLowerCase())
							}
							props.onChange({type: lowerVals});
						}}
					/>
        </Grid>
      </Grid>
      <Spacer height={10} />
      <Grid container direction="row" alignItems="center" spacing={2}>
        <Grid item lg>
					<SearchSelect
						label="Tags"
						options={props.uniqueTags}
						multiple
						readOnly
						placeholder="Search for tags..."
						defaultValue={props.filters.tags}
						onChange={(ev, val) => props.onChange({tags: val})}
						helperText="Matches all affixes with at least one of the selected tags"
					/>
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
