// React
import React from 'react';

// Redux
import { useDispatch } from 'react-redux';

// Material
import {
  Label as TagIcon,
  ArrowRightAlt as WalletInIcon,
  SyncAlt as WalletInOutIcon,
} from '@material-ui/icons';

import { CardActions, IconButton, Typography } from '@material-ui/core';

// Store
import { showTagDialog } from '../../../store/actions';

// Styles
import { useStyles } from './WalletInfoActions-styles';

const WalletInfoActions = (props) => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id, moneyFlow } = props;

  // Handlers
  const tagHandler = () => {
    dispatch(showTagDialog(id));
  };

  let walletFlowData;
  if (moneyFlow === 'RECEIVED/SPENT') {
    walletFlowData = (
      <div className={classes.walletFlow}>
        <WalletInOutIcon />
        <Typography
          className={classes.walletMetadataLabel}
          variant="body2"
          color="textSecondary"
        >
          Sending &amp; Receiving
        </Typography>
      </div>
    );
  } else if (moneyFlow === 'SPENT') {
    walletFlowData = (
      <div className={classes.walletFlow}>
        <WalletInIcon className={classes.walletFlowOutIcon} />
        <Typography
          className={classes.walletMetadataLabel}
          variant="body2"
          color="textSecondary"
        >
          Sending
        </Typography>
      </div>
    );
  } else if (moneyFlow === 'RECEIVED') {
    walletFlowData = (
      <div className={classes.walletFlow}>
        <WalletInIcon className={classes.walletFlowInIcon} />
        <Typography
          className={classes.walletMetadataLabel}
          variant="body2"
          color="textSecondary"
        >
          Receiving
        </Typography>
      </div>
    );
  } else {
    walletFlowData = <div />;
  }

  //JSX
  const view = (
    <div className={classes.root}>
      <CardActions className={classes.CardAction} disableSpacing>
        {walletFlowData}
        <IconButton onClick={tagHandler}>
          <TagIcon />
        </IconButton>
      </CardActions>
    </div>
  );

  return view;
};

export default WalletInfoActions;
