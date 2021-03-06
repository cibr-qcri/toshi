// React
import React, { lazy, useEffect, Suspense, useCallback } from 'react';

// Router
import { Route, Switch, Redirect } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Material
import {
  // Should be fixed in v5 release. See https://bit.ly/2Ali8Ak.
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// Components
import AuthRedirect from '../AuthRedirect';
import Main from '../Main';
import Layout from '../Layout';

// Store
import {
  getThemeMode,
  getToken,
  setThemeMode,
  getStats,
} from '../../store/actions';

// Styles
import { LazyProgress } from './App-styles';

// Code Splitting
const lazyComp = {
  Account: lazy(() => {
    return import('../Account');
  }),
  Activate: lazy(() => {
    return import('../Activate');
  }),
  Alerts: lazy(() => {
    return import('../Alerts');
  }),
  Search: lazy(() => {
    return import('../Search');
  }),
  TopWallets: lazy(() => {
    return import('../TopWallets');
  }),
  SignIn: lazy(() => {
    return import('../SignIn');
  }),
  SignUp: lazy(() => {
    return import('../SignUp');
  }),
  Terms: lazy(() => {
    return import('../Terms');
  }),
  Wallet: lazy(() => {
    return import('../Wallet');
  }),
};

const App = () => {
  // Variables
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.data.token !== null);
  const isAuthInit = useSelector((state) => state.auth.isInit);
  const palette = useSelector((state) => state.theme.palette);
  const theme = createMuiTheme({ palette: palette });

  // Handlers
  const handleThemeModeChange = useCallback(
    (event) => {
      const theme = event.matches ? 'dark' : 'light';
      dispatch(setThemeMode(theme));
    },
    [dispatch]
  );

  // Hooks
  useEffect(() => {
    dispatch(getToken());
    dispatch(getThemeMode());
    dispatch(getStats());
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', handleThemeModeChange);
    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', handleThemeModeChange);
    };
  }, [dispatch, handleThemeModeChange]);

  // JSX
  let routes = (
    <Switch>
      <Route path="/signin" component={lazyComp.SignIn} />
      <Route path="/activate/:token" component={lazyComp.Activate} />
      <Route path="/signup" component={lazyComp.SignUp} />
      <Route path="/top-wallets" component={AuthRedirect} />
      <Route path="/terms" component={lazyComp.Terms} />
      <Route path="/search" component={AuthRedirect} />
      <Route path="/wallet" component={AuthRedirect} />
      <Route path="/" component={Main} exact />
      <Redirect to="/" />
    </Switch>
  );

  if (isAuth) {
    routes = (
      <Switch>
        <Route path="/alerts" component={lazyComp.Alerts} />
        <Route path="/signin" component={lazyComp.SignIn} />
        <Route path="/signup" component={lazyComp.SignUp} />
        <Route path="/account" component={lazyComp.Account} />
        <Route path="/search" component={lazyComp.Search} />
        <Route path="/wallet" component={lazyComp.Wallet} />
        <Route path="/terms" component={lazyComp.Terms} />
        <Route path="/top-wallets" component={lazyComp.TopWallets} />
        <Route path="/" component={Main} exact />
        <Redirect to="/" />
      </Switch>
    );
  }

  let layout = <LazyProgress />;
  if (isAuthInit) {
    layout = (
      <Layout>
        <Suspense fallback={<LazyProgress />}>{routes}</Suspense>
      </Layout>
    );
  }

  const view = (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout}
    </ThemeProvider>
  );
  return view;
};

export default App;
