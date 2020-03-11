import React, { Component } from 'react';
import {
  TextField,
  Grid,
} from '@material-ui/core';
import Spacer from './spacer';
import MultipleSelect from './multipleSelect';

export default function RuleFilters(props) {
  return (
    <div>
      <Grid container direction="row" alignItems="center">
        <Grid item xs={3}>
          <TextField 
            autoFocus 
            fullWidth
            label="Name Search"
            type="search"
            placeholder="Search Rule Names"
            onChange={(event) => (props.onChange({name: event.target.value}))}
          /> 
        </Grid>
        <Grid item>
          <Spacer width={20} />
        </Grid>
        <Grid item xs justify="flex-end">
          <TextField 
            fullWidth
            label="Description Search"
            type="search"
            placeholder="Search Descriptions"
            onChange={(event) => (props.onChange({description: event.target.value}))}
          /> 
        </Grid>
      </Grid>
      <Spacer height={10} />
      <div style={{display: 'flex'}}>
        <MultipleSelect 
          label="Tags"
          items={props.uniqueTags}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}
