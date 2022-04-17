// React
import React from 'react';
import ReactWordcloud from 'react-wordcloud';
import { useHistory } from 'react-router';

// Redux
import { useSelector } from 'react-redux';

// Material
import { Card, CardContent, Typography } from '@material-ui/core';

// Styles
import { useStyles } from './WalletTopContentLabels-styles';

// Constants
import wordCloudOptions from '../../../../constants/wallet/wordCloudOptions';

export const WalletTopContentLabels = () => {
  // Variables
  const classes = useStyles();
  const labels = useSelector((state) => state.wallet.data.labels); // Loaded in the parent container
  const history = useHistory();

  // Handlers
  const onWordClick = ({ text }) => {
    history.push('/search?query=' + text);
  };

  // JSX
  let content = (
    <Typography align="center" variant="body2" color="textSecondary">
      No labels found
    </Typography>
  );
  if (labels.length > 0) {
    content = (
      <ReactWordcloud
        maxWords={5}
        options={wordCloudOptions}
        words={labels}
        callbacks={{ onWordClick }}
      />
    );
  }

  const view = (
    <Card className={classes.root} variant="outlined">
      <Typography className={classes.header}>Top-5 Reported Labels</Typography>
      <CardContent className={classes.content}>{content}</CardContent>
    </Card>
  );

  return view;
};

export default WalletTopContentLabels;
