// React
import React, { useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Material
import { Tabs, Tab } from '@material-ui/core';

// Styles
import { useStyles } from './WalletTabs-styles';

// Store
import { getWalletTx } from '../../../store/actions';
import {
  getWalletAddress,
  getWalletLabels,
  getWalletLinks,
} from '../../../store/actions/wallet/thunks';
import Addresses from '../Addresses/WalletAddresses';
import Transactions from '../Transactions/WalletTransactions';
import Links from '../Links';
import Labels from '../Labels';

const WalletTabs = (props) => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = React.useState(0);
  const id = useSelector((state) => state.wallet.id);
  const walletTxes = useSelector((state) => state.wallet.transactions.result);
  const walletAddresses = useSelector((state) => state.wallet.addresses.result);
  const walletLinks = useSelector((state) => state.wallet.links.result);
  const walletLabels = useSelector((state) => state.wallet.labels.result);

  // Hooks
  useEffect(() => {
    dispatch(getWalletAddress(id));
  }, [dispatch, id]);

  // Handlers
  const handleChange = (event, index) => {
    setTabIndex(index);
    if (index === 0 && walletAddresses.length === 0) {
      dispatch(getWalletAddress(id));
    } else if (index === 1 && walletTxes.length === 0) {
      dispatch(getWalletTx(id));
    } else if (index === 2 && walletLinks.length === 0) {
      dispatch(getWalletLinks(id));
    } else if (index === 3 && walletLabels.length === 0) {
      dispatch(getWalletLabels(id));
    }
  };

  let tabView = <Addresses />;
  if (tabIndex === 1) {
    tabView = <Transactions />;
  } else if (tabIndex === 2) {
    tabView = <Labels />;
  } else if (tabIndex === 3) {
    tabView = <Links />;
  }

  const view = (
    <div className={classes.paper}>
      <Tabs
        className={classes.tabs}
        value={tabIndex}
        onChange={handleChange}
        indicatorColor="primary"
        variant="scrollable"
      >
        <Tab className={classes.tab} disableRipple label="Addresses" />
        <Tab className={classes.tab} disableRipple label="Transactions" />
        <Tab className={classes.tab} disableRipple label="Reported Labels" />
        <Tab className={classes.tab} disableRipple label="Linked Wallets" />
      </Tabs>
      {tabView}
    </div>
  );

  return view;
};

export default WalletTabs;
