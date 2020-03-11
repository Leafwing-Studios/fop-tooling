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
import { MTableCell } from 'material-table';
import SlotIcon from './slotIcon';

function CustomCell(props) {
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
        { title: 'Tags', field: 'formattedTags' },
        // { title: 'Prerequisites', field: 'prerequisites' }, // i don't think we really need this
        { title: 'Short Description', field: 'descShort' },
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
        pageSize: 50,
        pageSizeOptions: [10, 50, 500],
        headerStyle: {
          fontWeight: 'bold'
        }
      }}
    />
  );
}
