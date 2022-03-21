// Types
import * as types from '../actions/wallet/types';

// Shared
import { updateObject } from '../../utils';

// State
const initialState = {
  id: '',
  data: {
    info: {},
    isBusy: true,
    error: null,
    noResults: false,
  },
  transactions: {
    result: [],
    noResults: false,
    count: 0,
    isPaged: false,
    pagination: {},
    isBusy: true,
    error: null,
  },
  addresses: {
    result: [],
    noResults: false,
    count: 0,
    isPaged: false,
    pagination: {},
    isBusy: true,
    error: null,
  },
  source: 'addresses',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Get
    case types.GET_WALLET_INFO_START: {
      return updateObject(state, {
        data: updateObject(state.data, {
          isBusy: true,
        }),
        id: action.payload.id,
      });
    }
    case types.GET_WALLET_TX_START: {
      return updateObject(state, {
        transactions: updateObject(state.transactions, {
          results: state.data.results,
          isBusy: true,
        }),
        source: action.payload.source,
      });
    }
    case types.GET_WALLET_ADDRESS_START: {
      return updateObject(state, {
        addresses: updateObject(state.addresses, {
          results: state.data.results,
          isBusy: true,
        }),
        source: action.payload.source,
      });
    }
    case types.GET_WALLET_INFO_SUCCESS: {
      return updateObject(state, {
        data: updateObject(state.data, {
          info: action.payload.data,
          isBusy: false,
          noResults: action.payload.count === 0,
        }),
      });
    }
    case types.GET_WALLET_TX_SUCCESS: {
      return updateObject(state, {
        transactions: updateObject(state.transactions, {
          result: action.payload.data,
          pagination: { ...action.payload.pagination },
          count: action.payload.count,
          isBusy: false,
        }),
      });
    }
    case types.GET_WALLET_ADDRESS_SUCCESS: {
      return updateObject(state, {
        addresses: updateObject(state.addresses, {
          result: action.payload.data,
          pagination: { ...action.payload.pagination },
          count: action.payload.count,
          isBusy: false,
        }),
      });
    }
    case types.GET_WALLET_INFO_FAILURE: {
      return updateObject(state, {
        data: updateObject(state.data, {
          error: action.payload,
          isBusy: false,
          noResults: true,
        }),
      });
    }
    case types.GET_WALLET_TX_FAILURE: {
      return updateObject(state, {
        transactions: updateObject(state.transactions, {
          error: action.payload,
          isBusy: false,
          noResults: true,
        }),
      });
    }
    case types.GET_WALLET_ADDRESS_FAILURE: {
      return updateObject(state, {
        addresses: updateObject(state.addresses, {
          error: action.payload,
          isBusy: false,
          noResults: true,
        }),
      });
    }
    case types.SET_WALLET_SOURCE: {
      return updateObject(state, {
        source: action.payload.source,
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
