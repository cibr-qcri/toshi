// React
import React, { useState } from 'react';

// PropTypes
import PropTypes from 'prop-types';

// Redux
import { useDispatch } from 'react-redux';

// Material
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@material-ui/core';

// Utils
import { titleShortener } from '../../utils/common';

// Styles
import { LazyProgress } from './DataTableRaw-styles';

export const DataTableRaw = (props) => {
  // Variables
  const { classes, rows, columns, totalCount, action, isBusy, type } = props;
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const types = ['address', 'transaction', 'label', 'wallet'];
  const basePath = type === 'wallet' ? '/wallet/' : '/search?query=';

  // Handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(action(newPage, rowsPerPage));
  };

  const handleChangeRowsPerPage = (event) => {
    const pageCount = event.target.value;
    setRowsPerPage(pageCount);
    setPage(0);
    dispatch(action(page, pageCount));
  };

  // Renderers
  const renderCell = (column, row) => {
    return (
      <TableCell
        key={column.id}
        align={column.align}
        className={classes.tableBodyText}
      >
        {types.includes(column.id) ? (
          <Link href={basePath + row[column.id]}>
            {titleShortener(column.id, row[column.id])}
          </Link>
        ) : (
          row[column.id]
        )}
      </TableCell>
    );
  };

  // JSX
  const head = (
    <TableRow className={classes.tableHead}>
      {columns.map((column) => (
        <TableCell key={column.id} align={column.align} variant="body">
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );

  let body = null;
  if (rows.length > 0) {
    body = rows.map((row) => {
      return (
        <TableRow hover key={row.id}>
          {columns.map((column) => renderCell(column, row))}
        </TableRow>
      );
    });
  }

  let table = (
    <Typography align="center" variant="body2" color="textSecondary">
      No {type === 'address' ? `${type}es` : `${type}s`} found
    </Typography>
  );
  if (rows.length > 0) {
    table = (
      <div className={classes.table}>
        <TableContainer className={classes.tableContainer}>
          <Table>
            <TableHead>{head}</TableHead>
            <TableBody>{body}</TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className={classes.tablePagination}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    );
  }

  const view = (
    <div className={classes.root}>{isBusy ? <LazyProgress /> : table}</div>
  );

  return view;
};

// Typechecking
DataTableRaw.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }),
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  totalCount: PropTypes.number.isRequired,
  action: PropTypes.func.isRequired,
  isBusy: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};

// Dynamic styling
DataTableRaw.styledAs = 'DataTableRaw';

export default DataTableRaw;
