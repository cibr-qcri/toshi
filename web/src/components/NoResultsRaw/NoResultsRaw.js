// React
import React from 'react';

// Components
import Message from '../Search/Message';

// Styles
import { useStyles, Switcher } from './NoResultsRaw-styles';

const NoResultsRaw = (props) => {
  // Variables
  const classes = useStyles();

  //JSX
  const view = (
    <div className={classes.root}>
      <Message query={props.query} type={props.type} />
      <Switcher
        question="Interesting search"
        action="Check this out"
        path="/search?query=mintpal"
      />
    </div>
  );

  return view;
};

// Dynamic styling
NoResultsRaw.styledAs = 'NoResultsRaw';

export default NoResultsRaw;
