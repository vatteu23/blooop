import { db } from "../../firebase";

export const FETCH_PROJECTS_PENDING = "FETCH_PROJECTS_PENDING";
export const FETCH_PROJECTS_SUCCESS = "FETCH_PROJECTS_SUCCESS";
export const FETCH_PROJECTS_ERROR = "FETCH_PROJECTS_ERROR";

export const FETCH_ITEMS_PENDING = "FETCH_ITEMS_PENDING";
export const FETCH_ITEMS_SUCCESS = "FETCH_ITEMS_SUCCESS";
export const FETCH_ITEMS_ERROR = "FETCH_ITEMS_ERROR";

export const FETCH_GROUPS_PENDING = "FETCH_GROUPS_PENDING";
export const FETCH_GROUPS_SUCCESS = "FETCH_GROUPS_SUCCESS";
export const FETCH_GROUPS_ERROR = "FETCH_GROUPS_ERROR";

export const FETCH_TAGS_PENDING = "FETCH_TAGS_PENDING";
export const FETCH_TAGS_SUCCESS = "FETCH_TAGS_SUCCESS";
export const FETCH_TAGS_ERROR = "FETCH_TAGS_ERROR";

export const FETCH_EMAILS_PENDING = "FETCH_EMAILS_PENDING";
export const FETCH_EMAILS_SUCCESS = "FETCH_EMAILS_SUCCESS";
export const FETCH_EMAILS_ERROR = "FETCH_EMAILS_ERROR";

export const FETCH_USERDETAILS_PENDING = "FETCH_USERDETAILS_PENDING";
export const FETCH_USERDETAILS_SUCCESS = "FETCH_USERDETAILS_SUCCESS";
export const FETCH_USERDETAILS_ERROR = "FETCH_USERDETAILS_ERROR";

export const FETCH_ITEMBYPARAM_PENDING = "FETCH_ITEMBYPARAM_PENDING";
export const FETCH_ITEMBYPARAM_SUCCESS = "FETCH_ITEMBYPARAM_SUCCESS";
export const FETCH_ITEMBYPARAM_ERROR = "FETCH_ITEMBYPARAM_ERROR";

/** Update user details when the firebase authentication is changed */
export const UPDATE_USER = (auth) => {
  return {
    type: "UPDATE_USER",
    auth: auth,
  };
};

/** Update the store as the user signs out */
export const SIGN_OUT = () => {
  return {
    type: "SIGNOUT_USER",
  };
};
/** Update */
export const UPDATE_LOG = (pageName) => {
  let status = true;
  const logID = db.ref("/pagevisitlogs").push();
  // logID.set({
  //     DateVisited: Date.now(),
  //     Page: pageName
  // },
  //     function (error) {
  //         if (error) {
  //             console.log('Unable to save data');
  //             status = false;
  //         }
  //     }
  // );
  return {
    type: "UPDATE_LOG",
    status: status,
  };
};

// action.js

const initialState = {
  pending: false,
  projects: [],
  error: null,
};

/* PROJECTS ****************************/

export function fetchProjectsPending() {
  return {
    type: FETCH_PROJECTS_PENDING,
    pending: true,
  };
}

export function fetchProjectsSuccess(projects) {
  return {
    type: FETCH_PROJECTS_SUCCESS,
    projects: projects,
    pending: true,
  };
}

export function fetchProjectsError(error) {
  return {
    type: FETCH_PROJECTS_ERROR,
    pending: false,
    error: error,
  };
}

/* ITEM BY PARAM ****************************/

export function fetchItemByParamPending() {
  return {
    type: FETCH_ITEMBYPARAM_PENDING,
    pending: true,
  };
}

export function fetchItemByParamSuccess(item) {
  return {
    type: FETCH_ITEMBYPARAM_SUCCESS,
    item: item,
    pending: true,
  };
}

export function fetchItemByParamError(error) {
  return {
    type: FETCH_ITEMBYPARAM_ERROR,
    pending: false,
    error: error,
  };
}

/* ITEMS ****************************/

export function fetchItemsPending() {
  return {
    type: FETCH_ITEMS_PENDING,
    pending: true,
  };
}

export function fetchItemsSuccess(items) {
  return {
    type: FETCH_ITEMS_SUCCESS,
    items: items,
    pending: true,
  };
}

export function fetchItemsError(error) {
  return {
    type: FETCH_ITEMS_ERROR,
    pending: false,
    error: error,
  };
}

/* GROUPS ****************************/

export function fetchGroupsPending() {
  return {
    type: FETCH_GROUPS_PENDING,
    pending: true,
  };
}

export function fetchGroupsSuccess(groups) {
  return {
    type: FETCH_GROUPS_SUCCESS,
    groups: groups,
    pending: true,
  };
}

export function fetchGroupsError(error) {
  return {
    type: FETCH_GROUPS_ERROR,
    pending: false,
    error: error,
  };
}

/****** EMAILS *********************/

export function fetchEmailsPending() {
  return {
    type: FETCH_EMAILS_PENDING,
    pending: true,
  };
}
export function fetchEmailsSuccess(emails) {
  return {
    type: FETCH_EMAILS_SUCCESS,
    emails: emails,
    pending: true,
  };
}
export function fetchEmailsError(error) {
  return {
    type: FETCH_EMAILS_SUCCESS,
    error: error,
    pending: false,
  };
}

/****** TAGS *********************/

export function fetchTagsPending() {
  return {
    type: FETCH_TAGS_PENDING,
    pending: true,
  };
}
export function fetchTagsSuccess(tags) {
  return {
    type: FETCH_TAGS_SUCCESS,
    tags: tags,
    pending: true,
  };
}
export function fetchTagsError(error) {
  return {
    type: FETCH_TAGS_SUCCESS,
    error: error,
    pending: false,
  };
}

/****** USER DETAILS *********************/

export function fetchUserDetailsPending() {
  return {
    type: FETCH_USERDETAILS_PENDING,
    pending: true,
  };
}
export function fetchUserDetailsSuccess(userDetails) {
  return {
    type: FETCH_USERDETAILS_SUCCESS,
    pending: false,
    userDetails: userDetails,
  };
}
export function fetchUserDetailsError(error) {
  return {
    type: FETCH_USERDETAILS_ERROR,
    error: error,
    pending: false,
  };
}
