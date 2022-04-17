// React
import React, { useState, useEffect } from 'react';

// PropTypes
import PropTypes from 'prop-types';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Router
import { useHistory } from 'react-router-dom';

// Material
import { Search as SearchIcon } from '@material-ui/icons';
import { IconButton, InputBase, Paper } from '@material-ui/core';

// Store
import { setRedirect } from '../../store/actions';

const SearchBoxRaw = (props) => {
  // Variables
  const { classes, placeholder = 'Search Bitcoin wallets' } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const [query, setQuery] = useState('');
  const lastQuery = useSelector((state) => state.search.data.query);
  const isAuth = useSelector((state) => state.auth.data.token !== null);

  // Hooks
  useEffect(() => {
    setQuery(lastQuery);
  }, [lastQuery]);

  // Handlers
  const queryChangeHandler = (event) => {
    const query = event.target.value;
    setQuery(query);
  };

  const querySubmitHandler = (event) => {
    event.preventDefault();
    if (query.trim() !== '') {
      const location = {
        pathname: '/search',
        search: '?query=' + query,
      };
      if (isAuth) {
        history.push(location);
      } else {
        dispatch(setRedirect(location));
        history.push('/signin');
      }
    }
  };

  const view = (
    <div className={classes.root}>
      <Paper
        component="form"
        className={classes.paper}
        variant="outlined"
        onSubmit={querySubmitHandler}
      >
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          type="search"
          value={query ?? ''}
          placeholder={placeholder}
          onChange={queryChangeHandler}
          inputProps={{
            autoCorrect: 'off',
            autoCapitalize: 'off',
            spellCheck: 'false',
          }}
        />
      </Paper>
    </div>
  );

  return view;
};

// Typechecking
SearchBoxRaw.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    paper: PropTypes.string.isRequired,
    input: PropTypes.string.isRequired,
  }),
  placeholder: PropTypes.string,
};

// Dynamic styling
SearchBoxRaw.styledAs = 'SearchBoxRaw';

export default SearchBoxRaw;
