import {
  FETCH_TAGS_ERROR,
  FETCH_TAGS_PENDING,
  FETCH_TAGS_SUCCESS,
} from "../actions";

const initialState = {
  pending: false,
  emails: [],
  error: null,
};
export default function emailsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TAGS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_TAGS_SUCCESS: {
      return {
        ...state,
        pending: false,
        tags: action.tags,
      };
    }
    case FETCH_TAGS_ERROR: {
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

export const getTags = (state) => state.tags;
export const getTagsPending = (state) => state.pending;
export const getTagsError = (state) => state.error;
