// React
import React from 'react';

// Material
import { Typography } from '@material-ui/core';

// Styles
import { useStyles } from './MessageBody-styles';

const MessageBody = (props) => {
  // Variables
  const { type } = props;
  const classes = useStyles();
  const suggestions = [
    `Make sure the ${type} is spelled correctly.`,
    `Try a different ${type}.`,
  ];

  if (type === 'address') {
    suggestions.push(
      'Make sure the address is used in a transaction.',
      'Try a related address.'
    );
  }

  if (type === 'transaction') {
    suggestions.push(
      'Make sure the transaction is confirmed.',
      'Try a related transaction in the block.'
    );
  }

  if (type === 'label') {
    suggestions.push(
      'Try a more general label.',
      'Try a simpler label or some part of it.'
    );
  }

  //JSX
  const view = (
    <div className={classes.root}>
      <Typography>Suggestions:</Typography>
      <ul className={classes.list}>
        {suggestions.map((suggestion, index) => (
          <li key={index}>
            <Typography>{suggestion}</Typography>
          </li>
        ))}
      </ul>
    </div>
  );

  return view;
};

export default MessageBody;
