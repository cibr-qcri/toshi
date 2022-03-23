// React
import React from 'react';

// Redux
import {useDispatch, useSelector} from 'react-redux';

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
} from '@material-ui/core';

// Styles
import {useStyles} from './WalletAddresses-styles';
import {getWalletAddress} from '../../../store/actions/wallet/thunks';
import {Skeleton} from '@material-ui/lab';
import {titleShortener} from "../../../utils/common";

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
    dispatch(getWalletAddress(walletId, newPage, rowsPerPage));
  };

  const handleChangeRowsPerPage = (event) => {
    const pageCount = event.target.value;
    setRowsPerPage(pageCount);
    setPage(0);
    dispatch(getWalletAddress(walletId, page, pageCount));
  };

  const columns = [
    { id: 'address', label: 'Address', align: 'left' },
    { id: 'totalReceivedUSD', label: 'Total Received ($)', align: 'left' },
    { id: 'totalSpentUSD', label: 'Total Spent ($)', align: 'left' },
    { id: 'usdBalance', label: 'Balance ($)', align: 'left' },
  ];

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
                    {titleShortener('address', row[column.id])}
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

  return (
    <div className={classes.root}>
      <TableContainer className={classes.container}>
        {isBusy ? (
          <div>
            <Skeleton animation="wave"/>
            <Skeleton animation="wave"/>
            <Skeleton animation="wave"/>
            <Skeleton animation="wave"/>
            <Skeleton animation="wave"/>
            <Skeleton animation="wave"/>
            <Skeleton animation="wave"/>
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
};

export default WalletAddresses;
