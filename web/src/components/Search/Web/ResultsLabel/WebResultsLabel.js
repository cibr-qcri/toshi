// React
import React from 'react';

// Styles
import { useStyles } from './WebResultsLabel-styles';

export const WebResultsLabel = (props) => {
  // Variables
  const classes = useStyles();

  // JSX
  const final = (
    <div className={classes.root}>
      <p className={classes.label}>About <b>{props.count}</b> results found for the given <b>{props.type}</b></p>
    </div>
  );

  return final;
};

export default WebResultsLabel;
