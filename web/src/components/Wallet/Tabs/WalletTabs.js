// React
import React, { useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Material
import { Tabs, Tab, Paper } from '@material-ui/core';

// Styles
import { useStyles } from './WalletTabs-styles';

// Store
import {
  getWalletAddresses,
  getWalletLabels,
  getWalletLinks,
  getWalletTx,
} from '../../../store/actions';

// Components
import Addresses from './Addresses';
import Transactions from './Transactions';
import Links from './Links';
import Labels from './Labels';

const WalletTabs = () => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const id = useSelector((state) => state.wallet.id);
  const walletTxes = useSelector((state) => state.wallet.transactions.result);
  const walletAddresses = useSelector((state) => state.wallet.addresses.result);
  const walletLinks = useSelector((state) => state.wallet.links.result);
  const walletLabels = useSelector((state) => state.wallet.labels.result);
  const [tabIndex, setTabIndex] = React.useState(0);

  // Hooks
  useEffect(() => {
    dispatch(getWalletAddresses(id));
  }, [dispatch, id]);

  // Handlers
  const handleChange = (event, index) => {
    setTabIndex(index);
    if (index === 0 && walletAddresses.length === 0) {
      dispatch(getWalletAddresses(id));
    } else if (index === 1 && walletTxes.length === 0) {
      dispatch(getWalletTx(id));
    } else if (index === 2 && walletLinks.length === 0) {
      dispatch(getWalletLinks(id));
    } else if (index === 3 && walletLabels.length === 0) {
      dispatch(getWalletLabels(id));
    }
  };

  // JSX
  let tabContent = <Addresses />;
  if (tabIndex === 1) {
    tabContent = <Transactions />;
  } else if (tabIndex === 2) {
    tabContent = <Labels />;
  } else if (tabIndex === 3) {
    tabContent = <Links />;
  }

  const view = (
    <Paper className={classes.root} variant="outlined">
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
      {tabContent}
    </Paper>
  );

  return view;
};

export default WalletTabs;
