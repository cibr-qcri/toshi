// React
import React from 'react';

// Material
import { Divider, Grid, Typography } from '@material-ui/core';

// Styles
import { useStyles } from './WalletBody-styles';

const WalletBody = (props) => {
  // Variables
  const classes = useStyles();
  const { items } = props;

  //JSX
  const infoItems = Object.values(items).map((info, index) => {
    return (
      <Grid className={classes.item} key={index} item xs={12} sm={6}>
        <Typography variant="body2">{info.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {info.value}
        </Typography>
        <Divider className={classes.divider} />
      </Grid>
    );
  });

  const view = (
    <div className={classes.root}>
      <Grid className={classes.content} container>
        {infoItems}
      </Grid>
    </div>
  );

  return view;
};

export default WalletBody;
