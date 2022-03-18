// React
import React from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Material
import { Tabs, Tab } from "@material-ui/core";

// Styles
import { useStyles } from "./WalletTabs-styles";

// Store
import {getWalletTx} from "../../../store/actions";
import {getWalletAddress} from "../../../store/actions/wallet/thunks";
import {setWalletSource} from "../../../store/actions/wallet/creators";


const WalletTabs = (props) => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const source = useSelector((state) => state.wallet.source);
  const id = useSelector((state) => state.wallet.id);
  const walletTxes = useSelector((state) => state.wallet.transactions.result);
  const walletAddresses = useSelector((state) => state.wallet.addresses.result);
  const sources = ['flow', 'transactions', 'addresses'];

  // Handlers
  const handleChange = (event, index) => {
    const source = sources[index];
    if (source === 'transactions' && walletTxes.length === 0) {
      dispatch(getWalletTx(id, source));
    } else if (source === 'addresses' && walletAddresses.length === 0) {
      dispatch(getWalletAddress(id, source));
    } else {
      dispatch(getWalletTx(id, source));
    }
  };

  const view = (
      <Tabs classes={{root: classes.tabs, indicator: classes.tabIndicator}} value={sources.indexOf(source)}
            onChange={handleChange}>
        <Tab className={classes.tab} disableRipple label="Money Flow"/>
        <Tab className={classes.tab} disableRipple label="Transactions"/>
        <Tab className={classes.tab} disableRipple label="Addresses"/>
      </Tabs>
  );

  return view;
};

export default WalletTabs;
