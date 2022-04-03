// React
import React from 'react';

// Material
import {
  TablePagination,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Typography,
} from '@material-ui/core';

// Styles
import { useStyles } from './WalletLabels-styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from '@material-ui/core';
import { getWalletLabels } from '../../../../store/actions/wallet/thunks';
import { titleShortener } from '../../../..//utils/common';

export const WalletLabels = (props) => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const walletId = useSelector((state) => state.wallet.id);
  const rows = useSelector((state) => state.wallet.labels.result);
  const totalCount = useSelector((state) => state.wallet.labels.count);
  const isBusy = useSelector((state) => state.wallet.labels.isBusy);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(getWalletLabels(walletId, newPage, rowsPerPage));
  };

  const handleChangeRowsPerPage = (event) => {
    const pageCount = event.target.value;
    setRowsPerPage(event.target.value);
    setPage(0);
    dispatch(getWalletLabels(walletId, page, pageCount));
  };

  const columns = [
    { id: 'label', label: 'Label', align: 'left' },
    { id: 'category', label: 'Category', align: 'left' },
    { id: 'source', label: 'Source', align: 'left' },
    { id: 'address', label: 'Address', align: 'left' },
  ];

  // Renderers
  const renderCell = (column, row) => {
    let cell = row[column.id];
    if (column.id === 'label') {
      cell = (
        <Link
          href={'/search?query=' + row[column.id]}
          target="_blank"
          rel="noopener"
        >
          {row[column.id]}
        </Link>
      );
    }
    if (column.id === 'address') {
      cell = (
        <Link
          href={'/search?query=' + row[column.id]}
          target="_blank"
          rel="noopener"
        >
          {titleShortener('address', row[column.id])}
        </Link>
      );
    }
    return cell;
  };

  // JSX
  let body = null;
  if (rows.length > 0) {
    body = rows.map((row) => {
      return (
        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
          {columns.map((column) => {
            return (
              <TableCell
                key={column.id}
                align={column.align}
                className={classes.tableBodyText}
              >
                {renderCell(column, row)}
              </TableCell>
            );
          })}
        </TableRow>
      );
    });
  }

  const view = (
    <div className={classes.root}>
      {isBusy ? (
        <div className={classes.progress}>
          <CircularProgress size={30} />
        </div>
      ) : rows.length > 0 ? (
        <div className={classes.container}>
          <TableContainer className={classes.container}>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      variant="body"
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>{body}</TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      ) : (
        <Typography align="center" variant="body2" color="textSecondary">
          No labels found
        </Typography>
      )}
    </div>
  );

  return view;
};

export default WalletLabels;
