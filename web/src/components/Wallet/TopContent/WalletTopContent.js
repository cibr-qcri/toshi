// React
import React from 'react';

// Material
import { Grid } from '@material-ui/core';

// Components
import Labels from './Labels';
import Links from './Links';

// Styles
import { useStyles } from './WalletTopContent-styles';

const WalletTopContent = () => {
  // Variables
  const classes = useStyles();

  //JSX
  const view = (
    <div className={classes.root}>
      <Grid container justifyContent="space-between">
        <Grid xs={12} sm={6} item className={classes.item}>
          <Labels />
        </Grid>
        <Grid xs={12} sm={6} item className={classes.item}>
          <Links />
        </Grid>
      </Grid>
    </div>
  );

  return view;
};

export default WalletTopContent;
