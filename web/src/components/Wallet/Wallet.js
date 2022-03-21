// React
import React, { useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Router
import { useHistory, useLocation } from 'react-router-dom';

// Querystring
import qs from 'qs';

// Material
import { Grid, Paper } from '@material-ui/core';

// Components
import WalletAddresses from './Addresses';
import WalletSummary from './Summary/WalletSummary'; // stylize WalletInfoRaw in wallet-styles and export it as WalletInfo
import WalletTopLinks from './TopLinks/WalletTopLinks';
import WalletMoneyFlow from './MoneyFlow/WalletMoneyFlow';
import WalletTabs from './Tabs';
import WalletTransactions from './Transactions/WalletTransactions';

import NoResults from '../Search/NoResults/NoResults'; // create a new NoResultsRaw and use it here and in search component

// Store
import { getWalletInfo } from '../../store/actions';

// Styles
import { useStyles, LazyProgress } from './Wallet-styles';

export const Wallet = (props) => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const summary = useSelector((state) => state.wallet.data.summary);
  const labels = useSelector((state) => state.wallet.data.labels);
  const links = useSelector((state) => state.wallet.data.links);
  const moneyFlow = useSelector((state) => state.wallet.data.moneyFlow);
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

  let tabView;
  if (source === 'flow') {
    tabView = <WalletMoneyFlow data={moneyFlow} />;
  } else if (source === 'transactions') {
    tabView = <WalletTransactions />;
  } else {
    tabView = <WalletAddresses />;
  }

  let content;
  if (noResults) {
    content = <NoResults query={id} type={'wallet'} />;
  } else {
    content = (
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item className={classes.root}>
            <WalletSummary id={id} summary={summary} labels={labels} />
          </Grid>
          <Grid item className={classes.root}>
            <WalletTopLinks links={links} />
          </Grid>
        </Grid>
        <Paper className={classes.paper} variant="outlined">
          <WalletTabs />
          {tabView}
        </Paper>
      </div>
    );
  }

  const view = (
    <div className={classes.root}>{isBusy ? <LazyProgress /> : content}</div>
  );

  return view;
};

export default Wallet;
