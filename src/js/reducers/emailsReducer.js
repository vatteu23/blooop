import {FETCH_EMAILS_ERROR, FETCH_EMAILS_PENDING, FETCH_EMAILS_SUCCESS} from "../actions";

const initialState = {
    pending: false,
    emails: [],
    error: null
};
export default function emailsReducer(state = initialState, action)  {
    switch (action.type) {
        
        case FETCH_EMAILS_PENDING:
            return {
                ...state,
                pending: true
            }
        case FETCH_EMAILS_SUCCESS:
            {
            return {
                ...state,
                pending: false,
                emails: action.emails
            }}
        case FETCH_EMAILS_ERROR:
            {
            return {
                ...state,
                pending: false,
                error: action.error
            }}

        default:
            return state;
    }
}

export const getEmails = state => state.emails;
export const getEmailsPending = state => state.pending;
export const getEmailsError = state => state.error;

