import {
  FETCH_ITEMS_ERROR,
  FETCH_ITEMS_PENDING,
  FETCH_ITEMS_SUCCESS,
} from "../actions";

const initialState = {
  pending: false,
  projects: [],
  error: null,
};

export default function itemsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ITEMS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_ITEMS_SUCCESS: {
      return {
        ...state,
        pending: false,
        items: action.items,
      };
    }
    case FETCH_ITEMS_ERROR: {
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    }

    default:
      return state;
  }
}

export const getItems = (state) => state.items;
export const getItemsPending = (state) => state.pending;
export const getItemsError = (state) => state.error;
