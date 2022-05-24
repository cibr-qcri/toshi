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

  let topWalletLabel = null;
  if (isTopWalletSearch) {
    if (sortBy === 'riskScore') {
      topWalletLabel = 'wallets with riskiest addresses';
    } else if (sortBy === 'size') {
      topWalletLabel = 'wallets with most addresses';
    } else {
      topWalletLabel = 'wallets with most transactions';
    }
  }
  // JSX
  const final = (
    <div className={classes.root}>
      {isTopWalletSearch ? (
        <Typography className={classes.label}>
          Showing top {numeral(loadedCount).format('0,0')} {topWalletLabel}
        </Typography>
      ) : (
        <Typography>
          Showing {numeral(loadedCount).format('0,0')} out of{' '}
          {numeral(totalCount).format('0,0')} results for the given{' '}
          <b>{props.type}</b>
        </Typography>
      )}
    </div>
  );

  return final;
};

export default ResultsLabel;
