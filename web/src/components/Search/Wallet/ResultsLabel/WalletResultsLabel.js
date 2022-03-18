// React
import React from "react";

// Styles
import { useStyles } from "./WalletResultsLabel-styles";

import numeral from "numeral";

import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";

export const WalletResultsLabel = (props) => {
  // Variables
  const classes = useStyles();
  const pagination = useSelector((state) => state.search.data.pagination);

  let pageCount = 1;
  if (pagination.next) {
    pageCount = pagination.next.page;
  }

  const totalCount = props.count;
  const perPageMaxCount = (pageCount - 1) * 25;
  const loadedCount =
    pageCount > 1 && totalCount > perPageMaxCount
      ? perPageMaxCount
      : totalCount;

  // JSX
  const final = (
    <div className={classes.root}>
      <Typography className={classes.label}>
        Showing {numeral(loadedCount).format("0,0")} out of{" "}
        {numeral(totalCount).format("0,0")} results for the given{" "}
        <b>{props.type}</b>
      </Typography>
    </div>
  );

  return final;
};

export default WalletResultsLabel;
