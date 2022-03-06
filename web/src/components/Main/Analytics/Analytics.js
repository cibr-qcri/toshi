// React
import React from 'react';

// Material
import { Typography } from '@material-ui/core';

// Styles
import { useStyles, Feature } from './Analytics-styles';

const MainAnalytics = () => {
  // Variables
  const classes = useStyles();

  // JSX
  const view = (
    <div className={classes.root}>
      <Typography className={classes.title} color="primary" variant="h5">
        Blockchain Analysis
      </Typography>
      <Typography className={classes.subtitle}>
        Get useful insights with your search results
      </Typography>
      <div className={classes.features}>
        <Feature iconLigature="offline_bolt" text="Wallet explorer" />
        <Feature iconLigature="category" text="Heuristic based Clustering" />
        <Feature iconLigature="token" text="Toshi Risk Scoring" />
        <Feature iconLigature="security" text="Overview of money flows" />
        <Feature iconLigature="lock" text="Top connected wallets with summary" />
        <Feature iconLigature="content_copy" text="Wallet statistics with reported labels"/>
        <Feature iconLigature="language" text="Wallet tagging" />
      </div>
    </div>
  );

  return view;
};

export default MainAnalytics;
