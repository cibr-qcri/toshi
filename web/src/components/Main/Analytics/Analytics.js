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
        Wallet analytics
      </Typography>
      <Typography className={classes.subtitle}>
        Get useful insights with your search results
      </Typography>
      <div className={classes.features}>
        <Feature iconLigature="category" text="Categorization" />
        <Feature iconLigature="token" text="Labeling" />
        <Feature iconLigature="security" text="Risk scoring" />
        <Feature iconLigature="offline_bolt" text="Activity monitoring" />
      </div>
    </div>
  );

  return view;
};

export default MainAnalytics;
