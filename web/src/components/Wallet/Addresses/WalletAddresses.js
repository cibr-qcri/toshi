// React
import React from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Material
import {
  TablePagination,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
} from '@material-ui/core';

// Styles
import { useStyles } from './WalletAddresses-styles';
import { getWalletAddress } from '../../../store/actions/wallet/thunks';
import { Skeleton } from '@material-ui/lab';

export const WalletAddresses = (props) => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const walletId = useSelector((state) => state.wallet.id);
  const rows = useSelector((state) => state.wallet.addresses.result);
  const totalCount = useSelector((state) => state.wallet.addresses.count);
  const isBusy = useSelector((state) => state.wallet.addresses.isBusy);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(getWalletAddress(walletId, 'addresses', newPage, rowsPerPage));
  };

  const handleChangeRowsPerPage = (event) => {
    const pageCount = event.target.value;
    setRowsPerPage(pageCount);
    setPage(0);
    dispatch(getWalletAddress(walletId, 'addresses', page, pageCount));
  };

  const columns = [{ id: 'address', label: 'Address', align: 'center' }];

  // JSX
  let body = null;
  if (rows.length > 0) {
    body = rows.map((row) => {
      return (
        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
          {columns.map((column) => {
            return (
              <TableCell key={column.id} align={column.align}>
                {column.id === 'address' ? (
                  <Link
                    href={'/search?query=' + row[column.id]}
                    target="_blank"
                    rel="noopener"
                  >
                    {row[column.id]}
                  </Link>
                ) : (
                  row[column.id]
                )}
              </TableCell>
            );
          })}
        </TableRow>
      );
    });
  }

  const view = (
    <div className={classes.root}>
      <TableContainer className={classes.container}>
        {isBusy ? (
          <div>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
          </div>
        ) : (
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{body}</TableBody>
          </Table>
        )}
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
  );

  return view;
};

export default WalletAddresses;
