// React
import React, { useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Router
import { useHistory, useLocation } from 'react-router-dom';

// Querystring
import qs from 'qs';

// Material
import { Paper } from '@material-ui/core';

// Components
import Addresses from './Addresses';
import Tabs from './Tabs';
import Transactions from './Transactions';

import NoResults from '../Search/NoResults/NoResults'; // create a new NoResultsRaw and use it here and in search component

// Store
import { getWalletInfo } from '../../store/actions';

// Styles
import { useStyles, LazyProgress, WalletInfo } from './Wallet-styles';

export const Wallet = (props) => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const info = useSelector((state) => state.wallet.data.info);
  const source = useSelector((state) => state.wallet.source);
  const noResults = useSelector((state) => state.wallet.data.noResults);
  const isBusy = useSelector((state) => state.wallet.data.isBusy);
  const id = useSelector((state) => state.wallet.id);

  // Hooks
  useEffect(() => {
    const id = qs.parse(location.search, { ignoreQueryPrefix: true }).id;
    if (!id || id.length === 0) {
      history.push('/main');
    }
    dispatch(getWalletInfo(id));
  }, [dispatch, location, history]);

  let tabView = <Addresses />;
  if (source === 'transactions') {
    tabView = <Transactions />;
  }

  let content = (
    <div className={classes.root}>
      <WalletInfo id={id} info={info} />
      <Paper className={classes.paper} variant="outlined">
        <Tabs />
        {tabView}
      </Paper>
    </div>
  );

  if (noResults) {
    content = <NoResults query={id} type={'wallet'} />;
  }

  const view = (
    <div className={classes.root}>{isBusy ? <LazyProgress /> : content}</div>
  );

  return view;
};

export default Wallet;
