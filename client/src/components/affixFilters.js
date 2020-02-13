import React, { Component } from 'react';
import {
  TextField,
  Grid,
} from '@material-ui/core';
import Spacer from './spacer';
import MultipleSelect from './multipleSelect';

export default function AffixFilters(props) {
  return (
    <div>
      <Grid container direction="row" alignItems="center">
        <Grid item xs={7}>
          <TextField 
            autoFocus 
            fullWidth
            label="Search"
            type="search"
            placeholder="Search Names and Descriptions"
            onChange={(event) => (props.onChange({nameDesc: event.target.value}))}
          /> 
        </Grid>
        <Grid item>
          <Spacer width={20} />
        </Grid>
        <Grid item xs justify="flex-end">
          <TextField 
            fullWidth
            label="Cost Thing"
            type="search"
            placeholder="Search Descriptions"
            onChange={(event) => (props.onChange({cost: event.target.value}))}
          /> 
        </Grid>
      </Grid>
      <Spacer height={10} />
      <div style={{display: 'flex'}}>
        <MultipleSelect 
          label="Categories"
          items={props.uniqueCategories}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}
