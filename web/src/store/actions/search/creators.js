// Types
import * as types from './types';

// Get
export const getResultsStart = (query) => ({
  type: types.GET_RESULTS_START,
  payload: query,
});

export const getResultsSuccess = (data) => ({
  type: types.GET_RESULTS_SUCCESS,
  payload: data,
});

export const getResultsFailure = (error) => ({
  type: types.GET_RESULTS_FAILURE,
  payload: error,
});

export const getTopWalletResultsStart = (query) => ({
  type: types.GET_TOP_WALLET_RESULTS_START,
  payload: query,
});

export const getTopWalletResultsSuccess = (data) => ({
  type: types.GET_TOP_WALLET_RESULTS_SUCCESS,
  payload: data,
});

export const getTopWalletResultsFailure = (error) => ({
  type: types.GET_TOP_WALLET_RESULTS_FAILURE,
  payload: error,
});

// Sort
export const setSortBy = (sortBy) => ({
  type: types.SET_SORT_BY,
  payload: sortBy,
});

// Reset
export const reset = () => ({
  type: types.RESET,
});
