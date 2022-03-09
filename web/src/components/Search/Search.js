// React
import React, { Fragment, useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Router
import { useLocation } from 'react-router-dom';

// Querystring
import qs from 'qs';

// Components
import WebResults from './Web/Results/WebResults';
import MoreResults from './MoreResults';
import NoResults from './NoResults';

// Store
import { getBlockchainResults, showAlertDialog } from '../../store/actions';

// Styles
import { useStyles, LazyProgress, SearchBox, Switcher } from './Search-styles';

export const Search = () => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const isBusy = useSelector((state) => state.search.isBusy);
  const query = useSelector((state) => state.search.data.query);
  const type = useSelector((state) => state.search.data.type);
  const count = useSelector((state) => state.search.data.count);
  const results = useSelector((state) => state.search.data.results);
  const noResults = useSelector((state) => state.search.data.noResults);
  const pagination = useSelector((state) => state.search.data.pagination);
  const source = location.pathname.split('/')[2];


  // Hooks
  useEffect(() => {
    const query = qs.parse(location.search, { ignoreQueryPrefix: true }).query;
    const source = location.pathname.split('/')[2];
    if (source === 'blockchain' && !!query) {
      dispatch(getBlockchainResults(query));
    }
  }, [dispatch, location]);

  // Handlers
  const alertHandler = () => {
    dispatch(showAlertDialog(query));
  };

  // JSX
  let moreResults = null;
  if (pagination.next) {
    moreResults = <MoreResults query={query} source={source} />;
  }

  let searchResults;
  if (source === 'blockchain') {
    searchResults = <WebResults items={results} count={count} type={type} />;
  }

  let alertSwitcher = null;
  alertSwitcher = (
    <Switcher
      question="Want to stay updated"
      action="Set an alert"
      clicked={alertHandler}
    />
  );

  let content = (
    <Fragment>
      {searchResults}
      {moreResults}
      {alertSwitcher}
    </Fragment>
  );

  if (noResults) {
    content = <NoResults query={query} type={type} />;
  }
  const view = (
    <div className={classes.root}>
      <SearchBox />
      {isBusy && !pagination.next && query.length > 0 ? <LazyProgress /> : content}
    </div>
  );

  return view;
};

export default Search;
