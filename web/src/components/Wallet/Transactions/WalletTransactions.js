// React
import React from "react";

// Material
import {
  TablePagination,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

// Styles
import { useStyles } from "./WalletTransactions-styles";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "@material-ui/core";
import { getWalletTx } from "../../../store/actions/wallet/thunks";
import { Skeleton } from "@material-ui/lab";

export const WalletTransactions = (props) => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const walletId = useSelector((state) => state.wallet.id);
  const rows = useSelector((state) => state.wallet.transactions.result);
  const totalCount = useSelector((state) => state.wallet.transactions.count);
  const isBusy = useSelector((state) => state.wallet.transactions.isBusy);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(getWalletTx(walletId, "transactions", newPage, rowsPerPage));
  };

  const handleChangeRowsPerPage = (event) => {
    const pageCount = event.target.value;
    setRowsPerPage(event.target.value);
    setPage(0);
    dispatch(getWalletTx(walletId, "transactions", page, pageCount));
  };

  const columns = [
    { id: "id", label: "Tx Hash", align: "center" },
    { id: "block_number", label: "Block Number", align: "left" },
    { id: "input_value", label: "Input Value", align: "left" },
    { id: "output_value", label: "Output Value", align: "left" },
    { id: "is_coinbase", label: "Coinbase", align: "left" },
    { id: "type", label: "Source", align: "left" },
  ];

  // JSX
  let body = null;
  if (rows.length > 0) {
    body = rows.map((row) => {
      return (
        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
          {columns.map((column) => {
            return (
              <TableCell
                className={classes.cell}
                key={column.id}
                align={column.align}
              >
                {column.id === "id" ? (
                  <Link
                    href={"/search/wallet?query=" + row[column.id]}
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

export default WalletTransactions;
