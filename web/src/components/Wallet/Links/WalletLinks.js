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
  CircularProgress,
  Typography,
} from "@material-ui/core";

// Styles
import { useStyles } from "./WalletLinks-styles";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "@material-ui/core";
import { titleShortener } from "../../../utils/common";
import { getWalletLinks } from "../../../store/actions/wallet/thunks";

export const WalletLinks = (props) => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [columns, setTableColumns] = React.useState([]);
  const walletId = useSelector((state) => state.wallet.id);
  const rows = useSelector((state) => state.wallet.links.result);
  const totalCount = useSelector((state) => state.wallet.links.count);
  const isBusy = useSelector((state) => state.wallet.links.isBusy);
  const currencyType = useSelector((state) => state.wallet.currency);

  // Hooks
  useEffect(() => {
    if (currencyType) {
      let columnMap = [
        { id: "walletId", label: "Wallet", align: "left" },
        { id: "numInTxes", label: "Num In Txes", align: "left" },
        { id: "numOutTxes", label: "Num Out Txes", align: "left" },
      ];
      if (currencyType === "btc") {
        columnMap.push(
          { id: "inBTCAmount", label: "Total In", align: "left" },
          { id: "outBTCAmount", label: "Total Out", align: "left" }
        );
      } else {
        columnMap.push(
          { id: "inUSDAmount", label: "Total In", align: "left" },
          { id: "outUSDAmount", label: "Total Out", align: "left" }
        );
      }
      setTableColumns(columnMap);
    }
  }, [currencyType]);

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
                className={classes.tableBodyText}
              >
                {column.id === "walletId" ? (
                  <Link
                    href={"/wallet/" + row[column.id]}
                    target="_blank"
                    rel="noopener"
                  >
                    {titleShortener("wallet", row[column.id])}
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
        <div className={classes.centerElement}>
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
        <Typography
          align="center"
          variant="subtitle1"
          color="textSecondary"
          className={classes.centerElement}
        >
          No wallets found
        </Typography>
      )}
    </div>
  );

  return view;
};

export default WalletLinks;
