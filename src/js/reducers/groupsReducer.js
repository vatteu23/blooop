import {
  FETCH_GROUPS_ERROR,
  FETCH_GROUPS_PENDING,
  FETCH_GROUPS_SUCCESS,
} from "../actions";

const initialState = {
  pending: false,
  projects: [],
  error: null,
};

export default function groupsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_GROUPS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_GROUPS_SUCCESS: {
      return {
        ...state,
        pending: false,
        groups: action.groups,
      };
    }
    case FETCH_GROUPS_ERROR: {
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

export const getGroups = (state) => state.groups;
export const getGroupsPending = (state) => state.pending;
export const getGroupsError = (state) => state.error;
