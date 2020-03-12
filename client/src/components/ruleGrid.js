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
import { titleCase } from '../utils';

const styles = {
  typography: {
    fontSize: 14,
  }
};

export default function RuleGrid(props) {

  return (
    <MaterialTable
      title="Rules"
      columns={[
        { title: 'Name', field: 'name' },
        {
          title: 'Tags',
          render: (rowData) => (
            <Typography style={styles.typography}>
              {rowData.categories.map(tag => titleCase(tag)).join(', ')}
            </Typography>
          )
        },
        { title: 'Short Description', field: 'descShort' },
      ]}
      data={props.rules}
      onRowClick={props.viewOnClick}
      isLoading={props.isLoading}
      options={{
        sorting: true,
        padding: 'dense',
        toolbar: false,
        draggable: false,
        headerStyle: {
          fontWeight: 'bold'
        }
      }}
    />
  );
}
