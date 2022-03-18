// React
import React from "react";

// Material
import {TablePagination, TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from "@material-ui/core";

// Styles
import {useStyles} from "./WalletTransactions-styles";
import {useSelector} from "react-redux";
import { Link } from "@material-ui/core";


export const WalletTransactions = (props) => {
  // Variables
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rows = useSelector((state) => state.wallet.transactions.result);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    {id: "id", label: "Tx Hash", align: "center"},
    {id: "block_number", label: "Block Number", align: "left"},
    {id: "input_value", label: "Input Value", align: "left"},
    {id: "output_value", label: "Output Value", align: "left"},
    {id: "is_coinbase", label: "Coinbase", align: "left"},
    {id: "type", label: "Source", align: "left"},
  ];

  // JSX
  let body = null;
  if (rows.length > 0) {
    body = (
      rows.map((row) => {
        return (
          <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
            {columns.map((column) => {
              return (
                <TableCell className={classes.cell} key={column.id} align={column.align}>
                  {(column.id === 'id') ?
                    <Link
                      href={"/search/wallet?query=" + row[column.id]}
                      target="_blank"
                      rel="noopener"
                    >
                      {row[column.id]}
                    </Link>
                    :
                    row[column.id]
                  }
                </TableCell>
              );
            })}
          </TableRow>
        );
      })
    );
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
            {body}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
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
