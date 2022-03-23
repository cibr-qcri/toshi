// React
import React, { useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Router
import { useHistory, useLocation } from 'react-router-dom';

// Material
import {Grid, Paper} from '@material-ui/core';

// Components
import Tabs from './Tabs';
import Labels from "./Labels";
import TopLinks from "./TopLinks";

// Store
import { getWalletInfo } from '../../store/actions';

// Styles
import { useStyles, LazyProgress, WalletInfo, NoResults } from './Wallet-styles';
import {getWalletAddress, getWalletTopLinks} from "../../store/actions/wallet/thunks";

export const Wallet = (props) => {
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
    const id = location.pathname.split("/")[2];
    if (!id || id.length === 0) {
      history.push('/main');
    }
    dispatch(getWalletInfo(id));
    dispatch(getWalletAddress(id));
    dispatch(getWalletTopLinks(id));
  }, [dispatch, location, history]);

  let content = (
    <div className={classes.root}>
      <WalletInfo id={id} info={info} />
      <Grid container spacing={2}>
        <Grid xs={12} sm={6} item>
          <Labels />
        </Grid>
        <Grid xs={12} sm={6} item>
          <TopLinks />
        </Grid>
      </Grid>
      <Paper className={classes.paper} variant="outlined">
        <Tabs />
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
