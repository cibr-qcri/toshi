// React
import React from 'react';

// Material
import { List, ListItem } from '@material-ui/core';

// Componets
import WebResult from '../Result';

// Styles
import { useStyles } from './WebResults-styles';
import WebResultsLabel from "../ResultsLabel/WebResultsLabel";

export const WebResults = (props) => {
  // Variables
  const classes = useStyles();

  // JSX
  const final = (
    <div className={classes.root}>
      <WebResultsLabel count={props.count} type={props.type} />
      <List component="ul" aria-label="search results" className={classes.list}>
        {props.items.map((result) => {
          return (
            <ListItem key={result.wallet_id}>
              <WebResult
                id={result.wallet_id}
                url={result.wallet_id}
                title={result.wallet_id}
                info={result.info}
                type={result.type}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return final;
};

export default WebResults;
