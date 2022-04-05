// Types
import * as types from './types';

// getWalletInfo
export const getWalletInfoStart = (id) => ({
  type: types.GET_WALLET_INFO_START,
  payload: id,
});

export const getWalletInfoSuccess = (data) => ({
  type: types.GET_WALLET_INFO_SUCCESS,
  payload: data,
});

export const getWalletInfoFailure = (error) => ({
  type: types.GET_WALLET_INFO_FAILURE,
  payload: error,
});

// getWalletTx
export const getWalletTxStart = () => ({
  type: types.GET_WALLET_TX_START,
});

export const getWalletTxSuccess = (data) => ({
  type: types.GET_WALLET_TX_SUCCESS,
  payload: data,
});

export const getWalletTxFailure = (error) => ({
  type: types.GET_WALLET_TX_FAILURE,
  payload: error,
});

// getWalletAddresses
export const getWalletAddressesStart = () => ({
  type: types.GET_WALLET_ADDRESSES_START,
});

export const getWalletAddressesSuccess = (data) => ({
  type: types.GET_WALLET_ADDRESSES_SUCCESS,
  payload: data,
});

export const getWalletAddressesFailure = (error) => ({
  type: types.GET_WALLET_ADDRESSES_FAILURE,
  payload: error,
});

// getWalletTopLinks
export const getWalletTopLinksStart = () => ({
  type: types.GET_WALLET_TOP_LINKS_START,
});

export const getWalletTopLinksSuccess = (data) => ({
  type: types.GET_WALLET_TOP_LINKS_SUCCESS,
  payload: data,
});

export const getWalletTopLinksFailure = (error) => ({
  type: types.GET_WALLET_TOP_LINKS_FAILURE,
  payload: error,
});

// getWalletLinks
export const getWalletLinksStart = () => ({
  type: types.GET_WALLET_LINKS_START,
});

export const getWalletLinksSuccess = (data) => ({
  type: types.GET_WALLET_LINKS_SUCCESS,
  payload: data,
});

export const getWalletLinksFailure = (error) => ({
  type: types.GET_WALLET_LINKS_FAILURE,
  payload: error,
});

// getWalletLabels
export const getWalletLabelsStart = () => ({
  type: types.GET_WALLET_LABELS_START,
});

export const getWalletLabelsSuccess = (data) => ({
  type: types.GET_WALLET_LABELS_SUCCESS,
  payload: data,
});

export const getWalletLabelsFailure = (error) => ({
  type: types.GET_WALLET_LABELS_FAILURE,
  payload: error,
});

// setWalletCurrencyType
export const setWalletCurrencyType = (currencyType) => ({
  type: types.SET_WALLET_CURRENCY_TYPE,
  payload: currencyType,
});

// reset
export const reset = () => ({
  type: types.RESET,
});
