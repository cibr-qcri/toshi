// React
import React from 'react';

// Numeral
import numeral from 'numeral';

// Redux
import { useSelector } from 'react-redux';

// Material
import { Typography } from '@material-ui/core';

// Styles
import { useStyles } from './ResultsLabel-styles';

export const ResultsLabel = (props) => {
  // Variables
  const classes = useStyles();
  const { isTopWalletSearch = false } = props;
  const pagination = useSelector((state) => state.search.data.pagination);
  const sortBy = useSelector((state) => state.search.data.sortBy);

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
  let topWalletLabel = (
    <Typography>
      Showing {numeral(loadedCount).format('0,0')} out of{' '}
      {numeral(totalCount).format('0,0')} results for the given{' '}
      <b>{props.type}</b>
    </Typography>
  );

  if (isTopWalletSearch) {
    let label = '';
    if (sortBy === 'riskScore') {
      label = 'wallets with the riskiest addresses';
    } else if (sortBy === 'size') {
      label = 'wallets with most addresses';
    } else if (sortBy === 'volume') {
      label = 'wallets with most transactions';
    } else {
      label = 'wallets with largest balance';
    }
    topWalletLabel = (
      <Typography className={classes.label}>
        Showing top {numeral(loadedCount).format('0,0')} {label}
      </Typography>
    );
  }

  const final = <div className={classes.root}>{topWalletLabel}</div>;

  return final;
};

export default ResultsLabel;
