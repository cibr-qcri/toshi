// React
import React from 'react';

// GraphVis
import Graph from 'react-graph-vis';
import 'vis-network/styles/vis-network.css';

// Redux
import { useSelector } from 'react-redux';

// Material
import { useTheme } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';

// Styles
import { useStyles, LazyProgress } from './WalletTopContentLinks-styles';

// Constants
import graphVizOptions from '../../../../constants/wallet/graphVizOptions';

export const WalletTopContentLinks = (props) => {
  // Variables
  const classes = useStyles();
  const theme = useTheme();
  const walletId = useSelector((state) => state.wallet.id);
  const topLinks = useSelector((state) => state.wallet.topLinks.result);
  const isBusy = useSelector((state) => state.wallet.topLinks.isBusy);

  const options = { ...graphVizOptions };
  options.edges.color = theme.palette.text.primary;
  options.nodes.font.color = theme.palette.primary.contrastText;

  // Handlers
  const selectedHandler = ({ nodes, edges }) => {
    let selectedId = nodes[0];
    if (selectedId && selectedId !== walletId) {
      window.open('/wallet/' + selectedId, '_blank');
    }
  };

  // JSX
  let content = (
    <Typography
      className={classes.empty}
      align="center"
      variant="subtitle1"
      color="textSecondary"
    >
      No wallets found
    </Typography>
  );
  if (Object.keys(topLinks).length > 0 && topLinks.edges.length > 0) {
    content = (
      <Graph
        graph={topLinks}
        options={options}
        events={{ select: selectedHandler }}
      />
    );
  }

  const view = (
    <Card className={classes.root} variant="outlined">
      <Typography className={classes.header}>Top-5 Linked Wallets</Typography>
      <CardContent className={classes.content}>
        {isBusy ? <LazyProgress /> : content}
      </CardContent>
    </Card>
  );

  return view;
};

export default WalletTopContentLinks;
