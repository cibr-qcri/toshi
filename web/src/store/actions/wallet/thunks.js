// Axios
import axios from 'axios';

// Redux
import { batch } from 'react-redux';

// QueryString
import qs from 'qs';

// Creators
import * as creators from './creators';
import { showAlert } from '../';

export const getWalletInfo = (id) => {
  return (dispatch, getState) => {
    dispatch(creators.getWalletInfoStart({ id }));
    const walletUrl = '/wallet/' + id;

    axios
      .get(walletUrl)
      .then((response) => {
        dispatch(creators.getWalletInfoSuccess(response.data));
      })
      .catch((error) => {
        batch(() => {
          dispatch(creators.getWalletInfoFailure(error));
          dispatch(showAlert());
        });
      });
  };
};

export const getWalletTopLinks = (id) => {
  return (dispatch, getState) => {
    dispatch(creators.getWalletTopLinksStart());

    const walletTxUrl = `/wallet/${id}/top-links`;
    axios
      .get(walletTxUrl)
      .then((response) => {
        dispatch(creators.getWalletTopLinksSuccess(response.data));
      })
      .catch((error) => {
        batch(() => {
          dispatch(creators.getWalletTopLinksFailure(error));
          dispatch(showAlert());
        });
      });
  };
};

export const getWalletTx = (id, page = 0, count = 10) => {
  return (dispatch, getState) => {
    dispatch(creators.getWalletTxStart());
    let queryParams = {
      page: page,
      count: count,
    };

    const walletTxUrl = `/wallet/${id}/transactions?${qs.stringify(
      queryParams
    )}`;
    axios
      .get(walletTxUrl)
      .then((response) => {
        dispatch(creators.getWalletTxSuccess(response.data));
      })
      .catch((error) => {
        batch(() => {
          dispatch(creators.getWalletTxFailure(error));
          dispatch(showAlert());
        });
      });
  };
};

export const getWalletAddress = (id, page = 0, count = 10) => {
  return (dispatch, getState) => {
    dispatch(creators.getWalletAddressStart());
    let queryParams = {
      page: page,
      count: count,
    };

    const walletAddressUrl = `/wallet/${id}/addresses?${qs.stringify(queryParams)}`;
    axios
      .get(walletAddressUrl)
      .then((response) => {
        dispatch(creators.getWalletAddressSuccess(response.data));
      })
      .catch((error) => {
        batch(() => {
          dispatch(creators.getWalletAddressFailure(error));
          dispatch(showAlert());
        });
      });
  };
};

export const getWalletLinks = (id, page = 0, count = 10) => {
  return (dispatch, getState) => {
    dispatch(creators.getWalletLinksStart());
    let queryParams = {
      page: page,
      count: count,
    };

    const walletLinksUrl = `/wallet/${id}/links?${qs.stringify(queryParams)}`;
    axios
      .get(walletLinksUrl)
      .then((response) => {
        dispatch(creators.getWalletLinksSuccess(response.data));
      })
      .catch((error) => {
        batch(() => {
          dispatch(creators.getWalletLinksFailure(error));
          dispatch(showAlert());
        });
      });
  };
};
