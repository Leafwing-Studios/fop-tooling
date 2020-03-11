import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography, 
} from '@material-ui/core';
import {
  Visibility as VisibilityIcon
} from '@material-ui/icons'
import MaterialTable from 'material-table';

export default function RuleGrid(props) {

  return (
    <MaterialTable
      title="Rules"
      columns={[
        { title: 'Name', field: 'name' },
        { title: 'Type', field: 'formattedTags', type: 'tags' },
        { title: 'Short Description', field: 'descShort' },
      ]}
      data={props.rules}
      onRowClick={props.viewOnClick}
      isLoading={props.isLoading}
      options={{
        sorting: true,
        padding: 'dense',
        paging: false,
        toolbar: false,
        headerStyle: {
          fontWeight: 'bold'
        }
      }}
    />
  );
}
