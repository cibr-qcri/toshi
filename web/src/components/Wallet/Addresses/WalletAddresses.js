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
  Link
} from "@material-ui/core";

// Styles
import { useStyles } from "./WalletAddresses-styles";
import {useSelector} from "react-redux";


export const WalletAddresses = (props) => {
  // Variables
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rows = useSelector((state) => state.wallet.addresses.result);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    {id: "address", label: "Address", align: "left"},
    {id: "type", label: "Type", align: "left"},
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
                <TableCell key={column.id} align={column.align}>
                  {(column.id === 'address') ?
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
    )
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
            { body }
          </TableBody>
        </Table>
      </TableContainer>
       <TablePagination
        rowsPerPageOptions={ [10, 25, 100] }
        component="div"
        count={ rows.length }
        rowsPerPage={ rowsPerPage }
        page={page}
        onPageChange={ handleChangePage }
        onRowsPerPageChange={ handleChangeRowsPerPage }
      />
      </div>
  );

  return view;
};

export default WalletAddresses;
