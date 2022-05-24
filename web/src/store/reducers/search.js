// Types
import * as types from '../actions/search/types';

// Shared
import { updateObject } from '../../utils';

// State
const initialState = {
  data: {
    query: '',
    results: [],
    noResults: false,
    isPaged: false,
    pagination: {},
    type: '',
    count: 0,
    sortBy: 'riskScore',
  },
  error: null,
  isBusy: true,
  isMoreLoading: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Get
    case types.GET_RESULTS_START: {
      return updateObject(state, {
        data: updateObject(state.data, {
          results: state.data.results,
          query: action.payload.query,
          isPaged: action.payload.isPaged,
          pagination: state.data.pagination,
          noResults: state.data.noResults,
          type: action.payload.type,
          count: state.data.count,
        }),
        isBusy: true,
        isMoreLoading: action.payload.isMoreLoading,
      });
    }
    case types.GET_TOP_WALLET_RESULTS_START: {
      return updateObject(state, {
        data: updateObject(state.data, {
          results: state.data.results,
          count: state.data.count,
        }),
        isBusy: true,
      });
    }
    case types.GET_RESULTS_SUCCESS: {
      return updateObject(state, {
        data: updateObject(state.data, {
          results: state.data.isPaged
            ? state.data.results.concat(action.payload.data)
            : action.payload.data,
          noResults: !state.data.isPaged && action.payload.data.length === 0,
          pagination: { ...action.payload.pagination },
          count: action.payload.count,
        }),
        isBusy: false,
        isMoreLoading: false,
      });
    }
    case types.GET_TOP_WALLET_RESULTS_SUCCESS: {
      return updateObject(state, {
        data: updateObject(state.data, {
          results: action.payload.data,
          noResults: action.payload.data.length === 0,
          count: action.payload.count,
        }),
        isBusy: false,
      });
    }
    case types.GET_RESULTS_FAILURE: {
      return updateObject(state, {
        data: updateObject(state.data, {
          error: action.payload,
        }),
        isBusy: false,
        isMoreLoading: false,
      });
    }
    case types.GET_TOP_WALLET_RESULTS_FAILURE: {
      return updateObject(state, {
        data: updateObject(state.data, {
          error: action.payload,
        }),
        isBusy: false,
        isMoreLoading: false,
      });
    }
    case types.SET_SORT_BY: {
      return updateObject(state, {
        data: updateObject(state.data, {
          sortBy: action.payload,
          results: [],
        }),
      });
    }
    // Reset
    case types.RESET: {
      return initialState;
    }
    // Default
    default: {
      return state;
    }
  }
};

export default reducer;
