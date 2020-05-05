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
  Container,
  Divider,
  Typography,
} from '@material-ui/core';
import {
  Visibility as VisibilityIcon
} from '@material-ui/icons'
import MaterialTable from 'material-table';
import { MTableCell } from 'material-table';
import SlotIcon from '../Icons/SlotIcon';
import { titleCase } from '../utils.js';

const styles = {
  typography: {
    fontSize: 14,
  },
};


const capitalTextField = (field) => ((rowData) => (
  <Typography style={styles.typography}>
    {titleCase(rowData[field])}
  </Typography>
))

const mySort = (field) => ((row1, row2) => row1[field] < row2[field] ? -1 : 1) // i have no idea why this isn't the default sort for numbers (for text it's confused because it doesn't have a field to work with, just a react element)

export default function AffixGrid(props) {

  return (
    <MaterialTable
      title="Affixes"
      columns={[
        {
          title: 'Name',
          defaultSort: 'asc',
          render: capitalTextField('name'),
          customSort: mySort('name'),
          // field: 'name',
        },
        { title: 'Slot', render: capitalTextField('slot'), customSort: mySort('slot')},
        { title: 'Cost', field: 'cost', type: 'numerical', customSort: mySort('cost'), },
        { title: 'Type', render: capitalTextField('affixType'), customSort: mySort('affixType') },
        {
          title: 'Tags',
          customSort: mySort('tags'),
          render: (rowData) => (
            <Typography style={styles.typography}>
              {rowData.tags.join(', ')}
            </Typography>
          )
        },
        { title: 'Short Description', customSort: mySort('descShort'), field: 'descShort'},
      ]}
      data={props.affixes}
      isLoading={props.isLoading}
      onRowClick={props.viewOnClick}
      options={{
        sorting: true,
        padding: 'dense',
        toolbar: false,
        draggable: false,
        headerStyle: {
          fontWeight: 'bold'
        },
        // paging stuff
        pageSize: 20,
        emptyRowsWhenPaging: false,
        pageSizeOptions: [20, 100, 1000],
        // end paging stuff
      }}
    />
  );
}
