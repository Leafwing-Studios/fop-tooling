import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
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

const useStyles = makeStyles((theme) => ({
  header: {
    fontWeight: 'bold',
  },
  descriptionHeader: {
    width: 700,
  },
  nameHeader: {
    width: 180,
  },
  tagsHeader: {
    width: 180,
  },
  slotHeader: {
    minWidth: 117
  },
  tableRow: {
    cursor: 'pointer'
  }
}));

export default function AffixGrid(props) {
  const classes = useStyles();
  
  // paging
  const pageSizeOptions = [20, 50, 100];
  const [currentPage, setCurrentPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(pageSizeOptions[0])
  
  const updateCurrentPage = (event, newPage) => {
    setCurrentPage(newPage);
  };
  
  const updateRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };
  
  // set to page zero whenever a filter changes, but not when an affix is selected
  React.useEffect(() => {
    setCurrentPage(0);
  }, [props.affixes]);

  return (
    <TableContainer component={Paper}>
      <Table 
        size="small" 
        aria-label="affixes-table"
      >
        <TableHead>
          <TableRow>
            <TableCell className={`${classes.header} ${classes.nameHeader}`}>Name</TableCell>
            <TableCell className={`${classes.header} ${classes.slotHeader}`}>Slot</TableCell>
            <TableCell className={classes.header} align="right">Cost</TableCell>
            <TableCell className={classes.header}>Rarity</TableCell>
            <TableCell className={`${classes.header} ${classes.tagsHeader}`}>Tags</TableCell>
            <TableCell className={`${classes.header} ${classes.descriptionHeader}`}>Short Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { props.affixes
            .slice(currentPage*rowsPerPage, currentPage*rowsPerPage + rowsPerPage)
            .map((affix) => (
              <TableRow 
                key={affix._id} 
                hover
                selected={props.selectedId === affix._id}
                onClick={(ev) => props.viewOnClick(ev, affix)}
                className={classes.tableRow}
              >
                <TableCell scope="row">{affix.name}</TableCell>
                <TableCell>{affix.slot}</TableCell>
                <TableCell align="right">{affix.cost}</TableCell>
                <TableCell>{affix.affixType}</TableCell>
                <TableCell>{affix.tags.join(', ')}</TableCell>
                <TableCell>{affix.descShort}</TableCell>
              </TableRow>
            ))
          }
        </TableBody> 
      </Table>
      <TablePagination
        rowsPerPageOptions={pageSizeOptions}
        component="div"
        count={props.affixes.length}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onChangePage={updateCurrentPage}
        onChangeRowsPerPage={updateRowsPerPage}
      />
    </TableContainer>
  );
}
