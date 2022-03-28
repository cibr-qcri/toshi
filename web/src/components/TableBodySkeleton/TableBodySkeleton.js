// React
import React from "react";

// Material
import { TableCell, TableRow } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const TableBodySkeleton = (props) => {
  // Variables
  const { numColumns, numRows } = props;

  //JSX
  return Array.from({ length: numRows }).map((_, i) => {
    return (
      <TableRow key={i}>
        {Array.from({ length: numColumns }).map((_, i) => {
          return (
            <TableCell key={i}>
              <Skeleton />
            </TableCell>
          );
        })}
      </TableRow>
    );
  });
};

export default TableBodySkeleton;
