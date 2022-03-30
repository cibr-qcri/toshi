// Types
import * as types from '../actions/theme/types';

// Shared
import { updateObject } from '../../utils';

// Constants
import THEME from '../../constants/theme';

// State
const initialState = {
  palette: {
    ...THEME.palettes.light,
  },
  error: null,
  isBusy: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Set
    case types.SET_PALETTE_TYPE: {
      return updateObject(state, {
        palette: THEME.palettes[action.payload],
      });
    }
    case types.SET_THEME_MODE_START: {
      return updateObject(state, {
        isBusy: true,
      });
    }
    case types.SET_THEME_MODE_SUCCESS: {
      return updateObject(state, {
        isBusy: false,
      });
    }
    case types.SET_THEME_MODE_FAILURE: {
      return updateObject(state, {
        isBusy: false,
        error: action.payload,
      });
    }
    // Get
    case types.GET_THEME_MODE_START: {
      return updateObject(state, {
        isBusy: true,
      });
    }
    case types.GET_THEME_MODE_SUCCESS: {
      return updateObject(state, {
        isBusy: false,
      });
    }
    case types.GET_THEME_MODE_FAILURE: {
      return updateObject(state, {
        isBusy: false,
        error: action.payload,
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
