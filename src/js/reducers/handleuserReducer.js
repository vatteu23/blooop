import {
  FETCH_USERDETAILS_PENDING,
  FETCH_USERDETAILS_SUCCESS,
  FETCH_USERDETAILS_ERROR,
} from "../actions";

const initialState = {
  pending: false,
  userDetails: [],
  error: null,
};

export default function handleuserReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERDETAILS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_USERDETAILS_SUCCESS:
      return {
        ...state,
        pending: false,
        userDetails: action.userDetails,
      };
    case FETCH_USERDETAILS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export const getUserDetails = (state) => {
  return state.users.userDetails;
};
export const getUserDetailsPending = (state) => state.users.pending;
export const getUserDetailsError = (state) => state.users.error;
