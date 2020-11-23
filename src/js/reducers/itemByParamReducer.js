import {
  FETCH_ITEMBYPARAM_ERROR,
  FETCH_ITEMBYPARAM_PENDING,
  FETCH_ITEMBYPARAM_SUCCESS,
} from "../actions";

const initialState = {
  pending: false,
  projects: [],
  error: null,
};

export default function itemByParamReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ITEMBYPARAM_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_ITEMBYPARAM_SUCCESS: {
      return {
        ...state,
        pending: false,
        item: action.item,
      };
    }
    case FETCH_ITEMBYPARAM_ERROR: {
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

export const getItemByParam = (state) => {
  return state.itemByParam.item;
};
export const getItemByParamPending = (state) => state.itemByParam.pending;
export const getItemByParamError = (state) => state.itemByParam.error;
