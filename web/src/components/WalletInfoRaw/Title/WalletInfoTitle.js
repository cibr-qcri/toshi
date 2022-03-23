// React
import React from 'react';

// Material
import { Link, Typography } from '@material-ui/core';

// Styles
import { useStyles } from './WalletInfoTitle-styles';
import {titleShortener} from "../../../utils/common";

const WalletInfoTitle = (props) => {
  // Variables
  const classes = useStyles();
  const { id } = props;
  //JSX
  const view = (
    <div className={classes.root}>
      <Typography className={classes.typography}>
        <Link
          className={classes.link}
          href={'/wallet/' + id}
          target="_blank"
          rel="noopener"
        >
          {titleShortener('wallet', id)}
        </Link>
      </Typography>
    </div>
  );

  return view;
};

export default WalletInfoTitle;
