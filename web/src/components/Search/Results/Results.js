// React
import React from 'react';

// Material
import { List, ListItem } from '@material-ui/core';

// Componets
import Label from './Label';

// Styles
import { useStyles, WalletInfo } from './Results-styles';

export const Results = (props) => {
  // Variables
  const classes = useStyles();

  // JSX
  const final = (
    <div className={classes.root}>
      <Label count={props.count} type={props.type} />
      <List component="ul" aria-label="search results" className={classes.list}>
        {props.items.map((result) => {
          return (
            <ListItem key={result._id}>
              <WalletInfo
                id={result._id}
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

export default Results;
