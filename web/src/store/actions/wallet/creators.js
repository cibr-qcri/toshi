// Types
import * as types from "./types";

export const getWalletInfoStart = (id) => ({
  type: types.GET_WALLET_INFO_START,
  payload: id,
});

export const getWalletTxStart = () => ({
  type: types.GET_WALLET_TX_START,
});

export const getWalletAddressStart = () => ({
  type: types.GET_WALLET_ADDRESS_START,
});

export const getWalletTopLinksStart = () => ({
  type: types.GET_WALLET_TOP_LINKS_START,
});

export const getWalletLinksStart = () => ({
  type: types.GET_WALLET_LINKS_START,
});

export const getWalletInfoSuccess = (data) => ({
  type: types.GET_WALLET_INFO_SUCCESS,
  payload: data,
});

export const getWalletTxSuccess = (data) => ({
  type: types.GET_WALLET_TX_SUCCESS,
  payload: data,
});

export const getWalletAddressSuccess = (data) => ({
  type: types.GET_WALLET_ADDRESS_SUCCESS,
  payload: data,
});

export const getWalletTopLinksSuccess = (data) => ({
  type: types.GET_WALLET_TOP_LINKS_SUCCESS,
  payload: data,
});

export const getWalletLinksSuccess = (data) => ({
  type: types.GET_WALLET_LINKS_SUCCESS,
  payload: data,
});

export const getWalletInfoFailure = (error) => ({
  type: types.GET_WALLET_INFO_FAILURE,
  payload: error,
});

export const getWalletTxFailure = (error) => ({
  type: types.GET_WALLET_TX_FAILURE,
  payload: error,
});

export const getWalletAddressFailure = (error) => ({
  type: types.GET_WALLET_ADDRESS_FAILURE,
  payload: error,
});

export const getWalletTopLinksFailure = (error) => ({
  type: types.GET_WALLET_TOP_LINKS_FAILURE,
  payload: error,
});

export const getWalletLinksFailure = (error) => ({
  type: types.GET_WALLET_LINKS_FAILURE,
  payload: error,
});

export const reset = () => ({
  type: types.RESET,
});
