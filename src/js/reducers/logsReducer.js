import { UPDATE_USER, SIGNOUT_USER, UPDATE_LOG } from "../constants";

const initialState = { };

export default function logsReducer(state = initialState, action)  {
    switch (action.type) {        
        case UPDATE_USER: {
            return {
                ...state,
                loading: false,
                authenticated: true,
                currentUser: action.auth.email
            }
        }
        case SIGNOUT_USER: {
            return {
                ...state,
                loading: false,
                authenticated: false,
                currentUser: null
            }
        }
        case UPDATE_LOG: {
            return {
                ...state,
                logSuccess: action.status
            }
        }
        default:
            return state;
    }
}


