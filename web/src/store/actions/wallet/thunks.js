// Axios
import axios from "axios";

// Redux
import { batch } from "react-redux";

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

export const getWalletTx = (id, source) => {
  return (dispatch, getState) => {
    dispatch(creators.getWalletTxStart({ source }));

    const walletTxUrl = "/info/transactions/wallet?id=" + id;
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
  }
};

export const getWalletAddress = (id, source) => {
  return (dispatch, getState) => {
    dispatch(creators.getWalletAddressStart({ source }));

    const walletTxUrl = "/info/addresses/wallet?id=" + id;
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
  }
};