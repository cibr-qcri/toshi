// React
import React from 'react';

// Material
import { Link, Typography } from '@material-ui/core';

// Styles
import { useStyles } from './WalletInfoTitle-styles';
import { titleShortener } from '../../../utils/common';
import CurrencyToggle from '../../CurrencyToggle';

const WalletInfoTitle = (props) => {
  // Variables
  const classes = useStyles();
  const { id, isClickable = false } = props;

  //JSX
  let title = titleShortener('wallet', id);
  if (isClickable) {
    title = (
      <Link
        className={classes.link}
        href={'/wallet/' + id}
        target="_blank"
        rel="noopener"
      >
        {title}
      </Link>
    );
  }

  const view = (
    <div className={classes.root}>
      <Typography className={classes.typography}>{title}</Typography>
      <CurrencyToggle />
    </div>
  );

  return view;
};

export default WalletInfoTitle;
