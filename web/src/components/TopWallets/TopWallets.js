// React
import React, { Fragment, useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Store
import {
  showAlertDialog,
  getTopWalletResults,
  setWalletCurrencyType,
  setSortBy,
} from '../../store/actions';

// Styles
import {
  useStyles,
  LazyProgress,
  Switcher,
  NoResults,
  WalletResults,
} from './TopWallets-styles';

export const Search = () => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const isBusy = useSelector((state) => state.search.isBusy);
  const count = useSelector((state) => state.search.data.count);
  const results = useSelector((state) => state.search.data.results);
  const noResults = useSelector((state) => state.search.data.noResults);
  const type = 'wallet';
  const query = '';

  // Hooks
  useEffect(() => {
    dispatch(setWalletCurrencyType('btc'));
    dispatch(setSortBy('riskScore'));
    dispatch(getTopWalletResults());
  }, [dispatch]);

  // Handlers
  const alertHandler = () => {
    dispatch(showAlertDialog(query));
  };

  let alertSwitcher;
  alertSwitcher = (
    <Switcher
      question="Want to stay updated"
      action="Set an alert"
      clicked={alertHandler}
    />
  );

  let content = (
    <Fragment>
      <WalletResults
        items={results}
        count={count}
        type={type}
        isTopWalletSearch={true}
      />
      {alertSwitcher}
    </Fragment>
  );

  if (noResults) {
    content = <NoResults query={query} type={type} />;
  }
  const view = (
    <div className={classes.root}>{isBusy ? <LazyProgress /> : content}</div>
  );

  return view;
};

export default Search;
