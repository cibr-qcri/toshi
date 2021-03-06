// Types
import * as types from '../actions/wallet/types';

// Shared
import { updateObject } from '../../utils';

// State
const initialState = {
  id: '',
  currency: 'usd',
  data: {
    info: {},
    labels: [],
    isBusy: true,
    error: null,
    noResults: false,
  },
  topLinks: {
    result: {},
    error: null,
    isBusy: true,
    noResults: false,
  },
  links: {
    result: [],
    error: null,
    isBusy: true,
    noResults: false,
    count: 0,
  },
  transactions: {
    result: [],
    noResults: false,
    count: 0,
    pagination: {},
    isBusy: true,
    error: null,
  },
  addresses: {
    result: [],
    noResults: false,
    count: 0,
    pagination: {},
    isBusy: true,
    error: null,
  },
  labels: {
    result: [],
    error: null,
    isBusy: true,
    noResults: false,
    count: 0,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // GetWalletInfo
    case types.GET_WALLET_INFO_START: {
      return updateObject(state, {
        data: updateObject(state.data, {
          isBusy: true,
        }),
        id: action.payload.id,
      });
    }
    case types.GET_WALLET_INFO_SUCCESS: {
      return updateObject(state, {
        data: updateObject(state.data, {
          info: action.payload.data.info,
          labels: action.payload.data.labels,
          isBusy: false,
          noResults: action.payload.count === 0,
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

    // GetWalletTx
    case types.GET_WALLET_TX_START: {
      return updateObject(state, {
        transactions: updateObject(state.transactions, {
          result: state.transactions.result,
          isBusy: true,
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
    case types.GET_WALLET_TX_FAILURE: {
      return updateObject(state, {
        transactions: updateObject(state.transactions, {
          error: action.payload,
          isBusy: false,
          noResults: true,
        }),
      });
    }

    // getWalletAddresses
    case types.GET_WALLET_ADDRESSES_START: {
      return updateObject(state, {
        addresses: updateObject(state.addresses, {
          result: state.addresses.result,
          isBusy: true,
        }),
      });
    }
    case types.GET_WALLET_ADDRESSES_SUCCESS: {
      return updateObject(state, {
        addresses: updateObject(state.addresses, {
          result: action.payload.data,
          pagination: { ...action.payload.pagination },
          count: action.payload.count,
          isBusy: false,
        }),
      });
    }
    case types.GET_WALLET_ADDRESSES_FAILURE: {
      return updateObject(state, {
        addresses: updateObject(state.addresses, {
          error: action.payload,
          isBusy: false,
          noResults: true,
        }),
      });
    }

    // GetWalletTopLinks
    case types.GET_WALLET_TOP_LINKS_START: {
      return updateObject(state, {
        topLinks: updateObject(state.topLinks, {
          result: state.topLinks.result,
          isBusy: true,
        }),
      });
    }
    case types.GET_WALLET_TOP_LINKS_SUCCESS: {
      return updateObject(state, {
        topLinks: updateObject(state.topLinks, {
          result: action.payload.data,
          count: action.payload.count,
          isBusy: false,
        }),
      });
    }
    case types.GET_WALLET_TOP_LINKS_FAILURE: {
      return updateObject(state, {
        topLinks: updateObject(state.topLinks, {
          error: action.payload,
          isBusy: false,
          noResults: true,
        }),
      });
    }

    // GetWalletLinks
    case types.GET_WALLET_LINKS_START: {
      return updateObject(state, {
        links: updateObject(state.links, {
          result: state.links.result,
          isBusy: true,
        }),
      });
    }
    case types.GET_WALLET_LINKS_SUCCESS: {
      return updateObject(state, {
        links: updateObject(state.links, {
          result: action.payload.data,
          count: action.payload.count,
          isBusy: false,
        }),
      });
    }
    case types.GET_WALLET_LINKS_FAILURE: {
      return updateObject(state, {
        links: updateObject(state.links, {
          error: action.payload,
          isBusy: false,
          noResults: true,
        }),
      });
    }

    // GetWalletLabels
    case types.GET_WALLET_LABELS_START: {
      return updateObject(state, {
        labels: updateObject(state.labels, {
          result: state.labels.result,
          isBusy: true,
        }),
      });
    }
    case types.GET_WALLET_LABELS_SUCCESS: {
      return updateObject(state, {
        labels: updateObject(state.labels, {
          result: action.payload.data,
          count: action.payload.count,
          isBusy: false,
        }),
      });
    }
    case types.GET_WALLET_LABELS_FAILURE: {
      return updateObject(state, {
        labels: updateObject(state.labels, {
          error: action.payload,
          isBusy: false,
          noResults: true,
        }),
      });
    }

    // GetWalletCurrencyType
    case types.SET_WALLET_CURRENCY_TYPE: {
      return updateObject(state, {
        currency: action.payload.currencyType,
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
