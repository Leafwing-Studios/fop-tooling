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
  TableSortLabel,
  Paper,
  Divider,
  LinearProgress,
} from '@material-ui/core';
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
  },
}));

// helper function for making the header data
const buildHeader = (label, field, id, align, cls) => (
  {label: label, field: field, id: id, class: cls, align: align}
);

export default function AffixGrid(props) {
  const classes = useStyles();
  
  // data for the column headers (label, field, id, alignment, class)
  const headerData = [
    buildHeader("Name", 'name', 0, 'left', classes.nameHeader),
    buildHeader("Slot", 'slot', 1, 'left', classes.slotHeader),
    buildHeader("Cost", 'cost', 2, 'right'),
    buildHeader("Rarity", 'affixType', 3, 'left'),
    buildHeader("Tags", 'tags', 4, 'left', classes.tagsHeader),
    buildHeader("Short Description", 'descShort', 5, 'left', classes.descriptionHeader),
  ]
  
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
  
  // sorting
  const [sortField, setSortField] = React.useState('name'); // field we are currently sorting on
  const [sortDirection, setSortDirection] = React.useState('desc'); // ascending or descending? 
  
  const updateSorting = (field) => { // updates the sorting parameters to fit the sort field that was clicked
    const shouldFlipFromAscToDesc = sortField === field && sortDirection === 'asc'; // if we click the same field, switch from ascending to descending
    setSortDirection(shouldFlipFromAscToDesc ? 'desc' : 'asc') // if we should flip to desc, do so. Otherwise, default to ascending sorting
    setSortField(field);
  };

  return (
    <>
      {props.isLoading && <LinearProgress />}
      <TableContainer component={Paper}>
        <Table 
          size="small" 
          aria-label="affixes-table"
        >
          <TableHead>
            <TableRow>
              {
                headerData.map(header => (
                  <TableCell
                    key={header.id}
                    align={header.align}
                    className={`${classes.header} ${header.cls}`}
                    sortDirection={sortField === header.field ? sortDirection : false}
                  >
                    {/* i have no idea why the sort direction needs to be set on both of these fields. it just does. */}
                    <TableSortLabel
                      active={sortField === header.field}
                      direction={sortField === header.field ? sortDirection : 'asc'}
                      onClick={(ev) => (updateSorting(header.field)) /* we do some slightly weird stuff here so the callback knows what field was clicked */}
                    >
                      {header.label}
                    </TableSortLabel>
                  </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            { props.affixes
              .sort((a, b) => {
                const comp = (a[sortField] > b[sortField]) ? 1 : -1
                return (sortDirection === 'asc' ? comp : comp * -1)
              })
              .slice(currentPage*rowsPerPage, currentPage*rowsPerPage + rowsPerPage)
              .map((affix) => (
                <TableRow 
                  key={affix._id} 
                  hover
                  selected={props.selectedId === affix._id}
                  onClick={(ev) => props.viewOnClick(ev, affix)}
                  className={classes.tableRow}
                >
                  <TableCell scope="row">{titleCase(affix.name)}</TableCell>
                  <TableCell>{titleCase(affix.slot)}</TableCell>
                  <TableCell align="right">{affix.cost}</TableCell>
                  <TableCell>{titleCase(affix.affixType)}</TableCell>
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
    </>
  );
}
