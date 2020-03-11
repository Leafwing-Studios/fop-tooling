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
import SlotIcon from './slotIcon';
import { titleCase } from '../utils.js';

const styles = {
  typography: {
    fontSize: 14,
  }
};

const capitalTextField = (field) => ((rowData) => (
  <Typography style={styles.typography}>
    {titleCase(rowData[field])}
  </Typography>
))

const mySort = (field) => ((row1, row2) => row1[field] < row2[field] ? -1 : 1) // i have no idea why this isn't the default sort for numbers (for text it's confused because it doesn't have a field to work with, just a react element)

export default function RuleGrid(props) {

  return (
    <MaterialTable
      title="Rules"
      columns={[
        {
          title: 'Name',
          defaultSort: 'asc',
          render: capitalTextField('name'),
          customSort: mySort('name'),
          // field: 'name',
        },
        { title: 'Slot', render: capitalTextField('slot'), customSort: mySort('slot')},
        { title: 'Cost', field: 'cost', type: 'numerical', customSort: mySort('cost') },
        { title: 'Type', render: capitalTextField('affixType'), customSort: mySort('affixType') },
        { title: 'Tags', render: capitalTextField('formattedTags'), customSort: mySort('formattedTags') },
        { title: 'Short Description', field: 'descShort', customSort: mySort('descShort') },
      ]}
      data={props.affixes}
      isLoading={props.isLoading}
      onRowClick={props.viewOnClick}
      components={{
        // Cell: CustomCell
      }}
      options={{
        sorting: true,
        padding: 'dense',
        toolbar: false,
        headerStyle: {
          fontWeight: 'bold'
        },
        // paging stuff
        pageSize: 50,
        emptyRowsWhenPaging: false,
        pageSizeOptions: [50, 100, 1000],
        // end paging stuff
      }}
    />
  );
}
