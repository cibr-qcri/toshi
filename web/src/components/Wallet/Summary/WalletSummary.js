// React
import React from 'react';

// Material
import {
  CardActions,
  Chip,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import { Card, CardContent } from '@material-ui/core';

// Styles
import { useStyles } from './WalletSummary-styles';

export const WalletSummary = (props) => {
  // Variables
  const classes = useStyles();
  let { id, summary, labels } = props;

  //JSX
  const summaryItems = Object.values(summary).map((info, index) => {
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
    <Card variant="outlined">
      <Typography className={classes.title} color="primary">
        Wallet [{id.split('-')[0]}]
      </Typography>
      <CardContent className={classes.content}>
        <Grid container>{summaryItems}</Grid>
      </CardContent>
    </Card>
  );

  return view;
};

export default WalletSummary;
