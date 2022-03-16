// React
import React from 'react';

// Material
import { List, ListItem } from '@material-ui/core';

// Componets
import WalletResult from '../Result';

// Styles
import { useStyles } from './WalletResults-styles';
import WalletResultsLabel from "../ResultsLabel/WalletResultsLabel";

export const WalletResults = (props) => {
  // Variables
  const classes = useStyles();

  // JSX
  const final = (
    <div className={classes.root}>
      <WalletResultsLabel count={props.count} type={props.type} />
      <List component="ul" aria-label="search results" className={classes.list}>
        {props.items.map((result) => {
          return (
            <ListItem key={result.wallet_id}>
              <WalletResult
                id={result.wallet_id}
                url={result.wallet_id}
                title={result.wallet_id}
                info={result.info}
                type={result.type}
                labels={result.labels}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return final;
};

export default WalletResults;
