// React
import React from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Material
import { Tabs, Tab } from '@material-ui/core';

// Styles
import { useStyles } from './WalletTabs-styles';

// Store
import { getWalletTx } from '../../../store/actions';
import { getWalletAddress } from '../../../store/actions/wallet/thunks';
import { setWalletSource } from '../../../store/actions/wallet/creators';

const WalletTabs = (props) => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const source = useSelector((state) => state.wallet.source);
  const id = useSelector((state) => state.wallet.id);
  const walletTxes = useSelector((state) => state.wallet.transactions.result);
  const walletAddresses = useSelector((state) => state.wallet.addresses.result);
  const sources = ['addresses', 'transactions'];

  // Handlers
  const handleChange = (event, index) => {
    const source = sources[index];
    if (source === 'transactions' && walletTxes.length === 0) {
      dispatch(getWalletTx(id, source));
    } else if (source === 'addresses' && walletAddresses.length === 0) {
      dispatch(getWalletAddress(id, source));
    } else {
      dispatch(setWalletSource({ source }));
    }
  };

  const view = (
    <Tabs
      value={sources.indexOf(source)}
      onChange={handleChange}
      indicatorColor="primary"
    >
      <Tab className={classes.tab} disableRipple label="Addresses" />
      <Tab className={classes.tab} disableRipple label="Transactions" />
    </Tabs>
  );

  return view;
};

export default WalletTabs;
