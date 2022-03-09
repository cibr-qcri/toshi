// React
import React from "react";

// Redux
import { useDispatch } from "react-redux";

// Material
import {
  Label as TagIcon,
  ArrowForward as WalletInIcon,
  ArrowBack as WalletOutIcon,
  SyncAlt as WalletInOutIcon,
  } from "@material-ui/icons";

import { CardActions, IconButton, Tooltip } from "@material-ui/core";

// Store
import { showTagDialog } from "../../../../../store/actions";

// Styles
import { useStyles } from "./ResultActions-styles";

const ResultActions = (props) => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id, type } = props;

  // Handlers
  const tagHandler = () => {
    dispatch(showTagDialog(id));
  };

  let walletFlow;
  if (type.in_wallet && type.out_wallet) {
    walletFlow = (<Tooltip title="Transaction involved for both inputs and outputs of this wallet" ><WalletInOutIcon className={classes.walletIcon} /></Tooltip>)
  } else if (type.in_wallet && !type.out_wallet) {
    walletFlow = (<Tooltip title="Transaction involved for inputs of this wallet" ><WalletInIcon className={classes.walletIcon} /></Tooltip>)
  } else if (!type.in_wallet && type.out_wallet) {
    walletFlow = (<Tooltip title="Transaction involved for outputs of this wallet" ><WalletOutIcon className={classes.walletIcon} /></Tooltip>)
  }

  //JSX
  const view = (
    <div className={classes.root}>
      <CardActions className={classes.CardAction} disableSpacing>
        <IconButton onClick={tagHandler}>
          <TagIcon />
        </IconButton>
        {walletFlow}
      </CardActions>
    </div>
  );

  return view;
};

export default ResultActions;
