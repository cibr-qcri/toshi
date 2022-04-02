// React
import React, { useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Router
import { useHistory, useLocation } from 'react-router-dom';

// Material
import { Paper } from '@material-ui/core';

// Components
import Tabs from './Tabs';
import TopContent from './TopContent';

// Store
import {
  getWalletAddress,
  getWalletInfo,
  getWalletTopLinks,
} from '../../store/actions';

// Styles
import {
  useStyles,
  LazyProgress,
  WalletInfo,
  NoResults,
} from './Wallet-styles';

export const Wallet = () => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const info = useSelector((state) => state.wallet.data.info);
  const noResults = useSelector((state) => state.wallet.data.noResults);
  const isBusy = useSelector((state) => state.wallet.data.isBusy);
  const id = useSelector((state) => state.wallet.id);

  // Hooks
  useEffect(() => {
    const id = location.pathname.split('/')[2];
    if (!id || id.length === 0) {
      history.push('/main');
    }
    dispatch(getWalletInfo(id));
    dispatch(getWalletAddress(id));
    dispatch(getWalletTopLinks(id));
  }, [dispatch, location, history]);

  // JSX
  let content = (
    <div className={classes.content}>
      <WalletInfo id={id} info={info} />
      <TopContent />
      <Paper className={classes.paper} variant="outlined">
        <Tabs />
      </Paper>
    </div>
  );

  if (noResults) {
    content = <NoResults query={id} type="wallet" />;
  }

  const view = (
    <div className={classes.root}>{isBusy ? <LazyProgress /> : content}</div>
  );

  return view;
};

export default Wallet;
