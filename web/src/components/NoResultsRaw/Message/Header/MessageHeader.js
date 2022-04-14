// React
import React from 'react';

// Material
import { Typography } from '@material-ui/core';

// Styles
import { useStyles } from './MessageHeader-styles';

const MessageHeader = (props) => {
  // Variables
  const { type, query } = props;
  const classes = useStyles();

  //JSX
  const view = (
    <div className={classes.root}>
      <Typography className={type !== 'wallet' ? classes.typography : ''}>
        No results found for {type}: <b>{query}</b>.
      </Typography>
    </div>
  );

  return view;
};

export default MessageHeader;
