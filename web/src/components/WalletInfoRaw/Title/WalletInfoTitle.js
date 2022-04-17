// React
import React from 'react';

// Material
import { Link, Typography } from '@material-ui/core';

// Utils
import { titleShortener } from '../../../utils/common';

// Components
import CurrencyToggle from '../../CurrencyToggle';

// Styles
import { useStyles } from './WalletInfoTitle-styles';

const WalletInfoTitle = (props) => {
  // Variables
  const classes = useStyles();
  const { id, isClickable = false } = props;

  //JSX
  let title = titleShortener('wallet', id);
  if (isClickable) {
    title = (
      <Link className={classes.link} href={'/wallet/' + id}>
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
