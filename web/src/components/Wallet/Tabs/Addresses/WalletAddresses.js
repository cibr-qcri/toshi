// React
import React, { useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

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

// Store
import { getWalletAddresses } from '../../../../store/actions';

// Utils
import { titleShortener } from '../../../../utils/common';

// Styles
import { useStyles, LazyProgress } from './WalletAddresses-styles';

export const WalletAddresses = () => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const walletId = useSelector((state) => state.wallet.id);
  const rows = useSelector((state) => state.wallet.addresses.result);
  const totalCount = useSelector((state) => state.wallet.addresses.count);
  const isBusy = useSelector((state) => state.wallet.addresses.isBusy);
  const currencyType = useSelector((state) => state.wallet.currency);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [columns, setTableColumns] = React.useState([]);

  // Hooks
  useEffect(() => {
    if (currencyType) {
      let columnMap = [
        {
          id: 'address',
          label: 'Address',
          align: 'left',
        },
      ];
      if (currencyType === 'btc') {
        columnMap.push(
          {
            id: 'totalReceivedBTC',
            label: 'Total In',
            align: 'right',
          },
          {
            id: 'totalSpentBTC',
            label: 'Total Out',
            align: 'right',
          },
          {
            id: 'btcBalance',
            label: 'Balance',
            align: 'right',
          }
        );
      } else {
        columnMap.push(
          {
            id: 'totalReceivedUSD',
            label: 'Total In',
            align: 'right',
          },
          {
            id: 'totalSpentUSD',
            label: 'Total Out',
            align: 'right',
          },
          {
            id: 'usdBalance',
            label: 'Balance',
            align: 'right',
          }
        );
      }
      setTableColumns(columnMap);
    }
  }, [currencyType]);

  // Handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(getWalletAddresses(walletId, newPage, rowsPerPage));
  };

  const handleChangeRowsPerPage = (event) => {
    const pageCount = event.target.value;
    setRowsPerPage(pageCount);
    setPage(0);
    dispatch(getWalletAddresses(walletId, page, pageCount));
  };

  // Renderers
  const renderCell = (column, row) => {
    return (
      <TableCell
        key={column.id}
        align={column.align}
        className={classes.tableBodyText}
      >
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
        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
          {columns.map((column) => renderCell(column, row))}
        </TableRow>
      );
    });
  }

  let table = (
    <Typography align="center" variant="subtitle1" color="textSecondary">
      No addresses found
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

export default WalletAddresses;
