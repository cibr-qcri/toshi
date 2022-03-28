// React
import React, { useEffect } from "react";

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
import { titleShortener } from "../../../utils/common";
import TableBodySkeleton from "../../TableBodySkeleton";

export const WalletTransactions = (props) => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [columns, setTableColumns] = React.useState([]);
  const walletId = useSelector((state) => state.wallet.id);
  const rows = useSelector((state) => state.wallet.transactions.result);
  const totalCount = useSelector((state) => state.wallet.transactions.count);
  const isBusy = useSelector((state) => state.wallet.transactions.isBusy);
  const currencyType = useSelector((state) => state.wallet.currency);

  // Hooks
  useEffect(() => {
    if (currencyType) {
      let columnMap = [
        { id: "txHash", label: "Transaction", align: "left" },
        { id: "blockNumber", label: "Block Number", align: "left" },
        { id: "isCoinbase", label: "Coinbase", align: "left" },
      ];
      if (currencyType === "btc") {
        columnMap.push(
          { id: "inputBTCValue", label: "Total Received (BTC)", align: "left" },
          { id: "outputBTCValue", label: "Total Spent (BTC)", align: "left" }
        );
      } else {
        columnMap.push(
          { id: "inputUSDValue", label: "Total Received ($)", align: "left" },
          { id: "outputUSDValue", label: "Total Spent ($)", align: "left" }
        );
      }
      columnMap.push({ id: "type", label: "Money Flow", align: "left" });
      setTableColumns(columnMap);
    }
  }, [currencyType]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(getWalletTx(walletId, newPage, rowsPerPage));
  };

  const handleChangeRowsPerPage = (event) => {
    const pageCount = event.target.value;
    setRowsPerPage(event.target.value);
    setPage(0);
    dispatch(getWalletTx(walletId, page, pageCount));
  };

  // JSX
  let body = null;
  if (rows.length > 0) {
    body = rows.map((row) => {
      return (
        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
          {columns.map((column) => {
            return (
              <TableCell key={column.id} align={column.align}>
                {column.id === "txHash" ? (
                  <Link
                    href={"/search?query=" + row[column.id]}
                    target="_blank"
                    rel="noopener"
                  >
                    {titleShortener("transaction", row[column.id])}
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
          <TableBody>
            {!isBusy ? (
              body
            ) : (
              <TableBodySkeleton
                numColumns={columns.length}
                numRows={rowsPerPage}
              />
            )}
          </TableBody>
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
  );

  return view;
};

export default WalletTransactions;
