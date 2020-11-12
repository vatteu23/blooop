import { db } from '../../firebase';


export const FETCH_PROJECTS_PENDING = 'FETCH_PROJECTS_PENDING';
export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS';
export const FETCH_PROJECTS_ERROR = 'FETCH_PROJECTS_ERROR';
export const FETCH_EMAILS_PENDING = 'FETCH_EMAILS_PENDING';
export const FETCH_EMAILS_SUCCESS = 'FETCH_EMAILS_SUCCESS';
export const FETCH_EMAILS_ERROR = 'FETCH_EMAILS_ERROR';


/** Update user details when the firebase authentication is changed */
export const UPDATE_USER = (auth) => {
    return {
        type: "UPDATE_USER",
        auth: auth
    }
}

/** Update the store as the user signs out */
export const SIGN_OUT = () => {
    return {
        type: "SIGNOUT_USER"
    }
}
/** Update */
export const UPDATE_LOG = (pageName) => {
    let status = true;
    const logID = db.ref('/pagevisitlogs').push();
    logID.set({
        DateVisited: Date.now(),
        Page: pageName
    },
        function (error) {
            if (error) {
                console.log('Unable to save data');
                status = false;
            }
        }
    );
    return {
        type: "UPDATE_LOG",
        status: status
    }
}

// action.js


const initialState = {
    pending: false,
    projects: [],
    error: null
}

export function fetchProjectsPending() {
    return {
        type: FETCH_PROJECTS_PENDING,
        pending: true,
    }
}

export function fetchProjectsSuccess(projects) {
    return {
        type: FETCH_PROJECTS_SUCCESS,
        projects: projects,
        pending: true
    }
}

export function fetchProjectsError(error) {
    return {
        type: FETCH_PROJECTS_ERROR,
        pending: false,
        error: error
    }
}

export function fetchEmailsPending() {
    return {
        type: FETCH_EMAILS_PENDING,
        pending: true,
    }
}
export function fetchEmailsSuccess(emails) {
    return {
        type: FETCH_EMAILS_SUCCESS,
        emails: emails,
        pending: true
    }
}
export function fetchEmailsError(error) {
    return {
        type: FETCH_EMAILS_SUCCESS,
        error: error,
        pending: false
    }
}