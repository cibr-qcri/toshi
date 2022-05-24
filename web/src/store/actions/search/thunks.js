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
  checkValidUUID,
  validateBitcoinAddress,
  validateBitcoinTx,
} from '../../../utils/common';

const queryType = (query) => {
  if (validateBitcoinAddress(query)) {
    return 'address';
  } else if (validateBitcoinTx(query)) {
    return 'transaction';
  } else if (checkValidUUID(query)) {
    return 'wallet';
  } else {
    return 'label';
  }
};

export const getResults = (query, isPaged = false, isMoreResult = false) => {
  return (dispatch, getState) => {
    const { sortBy } = getState().search.data;

    let queryParams = {
      query,
      sortBy,
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
        type: searchType,
        isMoreLoading: isMoreResult,
      })
    );

    const searchUrl = `/search?${qs.stringify(queryParams)}`;

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

export const getTopWalletResults = () => {
  return (dispatch, getState) => {
    const { sortBy } = getState().search.data;
    let queryParams = {
      sortBy,
    };

    dispatch(creators.getTopWalletResultsStart({}));

    const searchUrl = `/top-wallets?${qs.stringify(queryParams)}`;
    axios
      .get(searchUrl)
      .then((response) => {
        dispatch(creators.getTopWalletResultsSuccess(response.data));
      })
      .catch((error) => {
        batch(() => {
          dispatch(creators.getTopWalletResultsFailure(error));
          dispatch(showAlert());
        });
      });
  };
};
