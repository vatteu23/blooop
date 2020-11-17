import { UPDATE_USER, SIGNOUT_USER } from "../constants";

const initialState = {};

export default function userActivity(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER: {
      return {
        ...state,
        loading: false,
        authenticated: true,
        currentUser: action.auth.email,
      };
    }
    case SIGNOUT_USER: {
      return {
        ...state,
        loading: false,
        authenticated: false,
        currentUser: null,
      };
    }
    default:
      return state;
  }
}
