// Axios
import axios from 'axios';

// QueryString
import qs from 'qs';

// Redux
import { batch } from 'react-redux';

// Creators
import * as creators from './creators';
import { showAlert } from '../';

export const getWebResults = (query, isPaged = false) => {
  return (dispatch, getState) => {
    dispatch(creators.getResultsStart({ query, isPaged, source: 'web' }));

    let queryParams = {
      query,
    };

    if (isPaged) {
      const { page, limit } = getState().search.data.pagination.next;
      queryParams = {
        ...queryParams,
        page,
        limit,
      };
    }

    const searchUrl = `/search/web?${qs.stringify(queryParams)}`;

    axios
      .get(searchUrl)
      .then((response) => {
        dispatch(creators.getResultsSuccess(response.data));
      })
      .catch((error) => {
        batch(() => {
          dispatch(creators.getResultsFailure(error));
          dispatch(showAlert());
        });
      });
  };
};
