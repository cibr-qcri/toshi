// Axios
import axios from 'axios';

// QueryString
import qs from 'qs';

// Redux
import { batch } from 'react-redux';

// Creators
import * as creators from './creators';
import { showAlert } from '../';
import {
  validateBitcoinAddress,
  validateBitcoinTx,
} from '../../../utils/common';

const queryType = (query) => {
  if (validateBitcoinAddress(query)) {
    return 'address';
  } else if (validateBitcoinTx(query)) {
    return 'transaction';
  } else {
    return 'label';
  }
};

export const getWalletResults = (query, isPaged = false) => {
  return (dispatch, getState) => {
    let queryParams = {
      query,
    };

    if (isPaged) {
      const { page } = getState().search.data.pagination.next;
      queryParams = {
        ...queryParams,
        page,
      };
    }

    const searchType = queryType(queryParams.query);
    queryParams.type = searchType;
    dispatch(
      creators.getResultsStart({
        query,
        isPaged,
        source: 'wallet',
        type: searchType,
      })
    );

    const searchUrl = `/search/wallet?${qs.stringify(queryParams)}`;

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
