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
} from '@material-ui/core';
import {
  Visibility as VisibilityIcon
} from '@material-ui/icons'
import MaterialTable from 'material-table';
import {MTableCell} from 'material-table';
import SlotIcon from './slotIcon';

function customCell(props) {
  if (props.columnDef.type === 'slotIcon')
    // for some reason, the bottom divider is always 1 pixel too high. i have no idea why
    return (
      <div>
        <div style={{
          paddingTop: '12px',
          paddingLeft: '12px',
          paddingBottom: '5px',
        }}>
          <SlotIcon slot={props.value} fontSize='small'/>
        </div>
        <Divider/>
      </div>
    );
  return (
    <MTableCell {...props}/>
  );
}

export default function RuleGrid(props) {

  return (
    <MaterialTable
      title="Rules"
      columns={[
        { title: 'Name', field: 'name' },
        {
          title: 'Slot', 
          field: 'slot',
          type: 'slotIcon',
          align: 'center',
        },
        { title: 'Cost', field: 'cost', type: 'numerical' },
        { title: 'Type', field: 'affixType' },
        { title: 'Elements', field: 'elements' },
        { title: 'Categories', field: 'categories' },
        { title: 'Prerequisites', field: 'prerequisites' },
        { title: 'Short Description', field: 'descShort' },
      ]}
      data={props.affixes}
      isLoading={props.affixes.length === 0}
      onRowClick={props.viewOnClick}
      components={{
        // Cell: customCell
      }}
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
