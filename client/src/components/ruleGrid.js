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
} from '@material-ui/core';
import {
  Visibility as VisibilityIcon
} from '@material-ui/icons'

const useStyles = makeStyles({
  headerButton: {
    width: "10px",
    paddingBottom: "0px"
  },
  rowButton: {
    width: "10px", // the acual value doesn't matter here as long as it's smaller than ~50
    padding: "0px",
  }
});

export default function RuleGrid(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center" className={classes.headerButton}>
              <VisibilityIcon fontSize="small" />
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Source</TableCell>
            <TableCell>Short Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rules.map(row => (
            <TableRow key={row._id}>
              <TableCell align="center">
                <IconButton aria-label="view" onClick={props.viewOnClick(row)} className={classes.rowButton}>
                  <VisibilityIcon fontSize="small" />
                </IconButton>
              </TableCell>
              <TableCell component="th">
                {row.name || row.title}
              </TableCell>
              <TableCell>{row.source}</TableCell>
              <TableCell>{row.descShort}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
