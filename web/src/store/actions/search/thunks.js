// Axios
import axios from 'axios';

// QueryString
import qs from 'qs';

// Redux
import { batch } from 'react-redux';

// Creators
import * as creators from './creators';
import { showAlert } from '../';
import {validateBitCoinAddress, validateBitCoinTx} from "../../../utils/common";

const queryType = (query) => {
  if (validateBitCoinAddress(query)) {
    return 'address'
  } else if (validateBitCoinTx(query)) {
    return 'transaction'
  } else {
    return 'label'
  }
}

export const getBlockchainResults = (query, isPaged = false) => {
  return (dispatch, getState) => {

    let queryParams = {
      query,
    };
    const searchType = queryType(queryParams.query);
    queryParams.type = searchType
    dispatch(creators.getResultsStart({ query, isPaged, source: 'blockchain', type: searchType }));

    if (isPaged) {
      const { page, limit } = getState().search.data.pagination.next;
      queryParams = {
        ...queryParams,
        page,
        limit,
      };
    }

    const searchUrl = `/search/blockchain?${qs.stringify(queryParams)}`;

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
