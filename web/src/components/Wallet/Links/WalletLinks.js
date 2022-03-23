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
} from '@material-ui/core';

// Styles
import { useStyles } from './WalletLinks-styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import {titleShortener} from "../../../utils/common";
import {getWalletLinks} from "../../../store/actions/wallet/thunks";

export const WalletLinks = (props) => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const walletId = useSelector((state) => state.wallet.id);
  const rows = useSelector((state) => state.wallet.links.result);
  const totalCount = useSelector((state) => state.wallet.links.count);
  const isBusy = useSelector((state) => state.wallet.links.isBusy);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(getWalletLinks(walletId, newPage, rowsPerPage));
  };

  const handleChangeRowsPerPage = (event) => {
    const pageCount = event.target.value;
    setRowsPerPage(event.target.value);
    setPage(0);
    dispatch(getWalletLinks(walletId, page, pageCount));
  };

  const columns = [
    { id: 'walletId', label: 'Wallet', align: 'left' },
    { id: 'numInTxes', label: 'Num Receiving Txes', align: 'left' },
    { id: 'inUSDAmount', label: 'Receiving Amount ($)', align: 'left' },
    { id: 'numOutTxes', label: 'Num Sending Txes', align: 'left' },
    { id: 'outUSDAmount', label: 'Sending Amount ($)', align: 'left' },
  ];

  // JSX
  let body = null;
  if (rows.length > 0) {
    body = rows.map((row) => {
      return (
        <TableRow hover role="checkbox" tabIndex={-1} key={row.walletId}>
          {columns.map((column) => {
            return (
              <TableCell
                key={column.id}
                align={column.align}
              >
                {column.id === 'walletId' ? (
                  <Link
                    href={'/wallet/' + row[column.id]}
                    target="_blank"
                    rel="noopener"
                  >
                    {titleShortener('wallet', row[column.id])}
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

export default WalletLinks;
