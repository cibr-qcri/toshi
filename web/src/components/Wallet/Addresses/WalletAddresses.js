// React
import React, { useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Material
import {
  CircularProgress,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";

// Styles
import { useStyles } from "./WalletAddresses-styles";
import { getWalletAddress } from "../../../store/actions/wallet/thunks";
import { titleShortener } from "../../../utils/common";

export const WalletAddresses = (props) => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [columns, setTableColumns] = React.useState([]);
  const walletId = useSelector((state) => state.wallet.id);
  const rows = useSelector((state) => state.wallet.addresses.result);
  const totalCount = useSelector((state) => state.wallet.addresses.count);
  const isBusy = useSelector((state) => state.wallet.addresses.isBusy);
  const currencyType = useSelector((state) => state.wallet.currency);

  // Hooks
  useEffect(() => {
    if (currencyType) {
      let columnMap = [{ id: "address", label: "Address", align: "left" }];
      if (currencyType === "btc") {
        columnMap.push(
          {
            id: "totalReceivedBTC",
            label: "Total In",
            align: "left",
          },
          { id: "totalSpentBTC", label: "Total Out", align: "left" },
          { id: "btcBalance", label: "Balance", align: "left" }
        );
      } else {
        columnMap.push(
          {
            id: "totalReceivedUSD",
            label: "Total In",
            align: "left",
          },
          { id: "totalSpentUSD", label: "Total Out", align: "left" },
          { id: "usdBalance", label: "Balance", align: "left" }
        );
      }
      setTableColumns(columnMap);
    }
  }, [currencyType]);

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
                {column.id === "address" ? (
                  <Link
                    href={"/search?query=" + row[column.id]}
                    target="_blank"
                    rel="noopener"
                  >
                    {titleShortener("address", row[column.id])}
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
                    <TableCell key={column.id} align={column.align}>
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
        <Typography align="center" variant="subtitle1" color="textSecondary">
          No addresses found
        </Typography>
      )}
    </div>
  );

  return view;
};

export default WalletAddresses;
