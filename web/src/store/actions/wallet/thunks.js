// Axios
import axios from "axios";

// Redux
import { batch } from "react-redux";

// QueryString
import qs from "qs";

// Creators
import * as creators from "./creators";
import { showAlert } from "../";

export const getWalletInfo = (id) => {
  return (dispatch, getState) => {
    dispatch(creators.getWalletInfoStart({ id }));
    const walletUrl = "/info/wallet?id=" + id;

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

export const getWalletTx = (id, source, page = 0, count = 10) => {
  return (dispatch, getState) => {
    dispatch(creators.getWalletTxStart({ source }));
    let queryParams = {
      id: id,
      page: page,
      count: count,
    };

    const walletTxUrl = `/info/transactions/wallet?${qs.stringify(
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

export const getWalletAddress = (id, source, page = 0, count = 10) => {
  return (dispatch, getState) => {
    dispatch(creators.getWalletAddressStart({ source }));
    let queryParams = {
      id: id,
      page: page,
      count: count,
    };

    const walletTxUrl = `/info/addresses/wallet?${qs.stringify(queryParams)}`;
    axios
      .get(walletTxUrl)
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
