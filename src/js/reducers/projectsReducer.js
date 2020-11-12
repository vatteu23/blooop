import {FETCH_PROJECTS_ERROR, FETCH_PROJECTS_PENDING, FETCH_PROJECTS_SUCCESS} from "../actions";

const initialState = {
    pending: false,
    projects: [],
    error: null
};



export default function projectsReducer(state = initialState, action)  {
    switch (action.type) {
        
        case FETCH_PROJECTS_PENDING:
            return {
                ...state,
                pending: true
            }
        case FETCH_PROJECTS_SUCCESS:
            {
            return {
                ...state,
                pending: false,
                projects: action.projects
            }}
        case FETCH_PROJECTS_ERROR:
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

export const getProjects = state => state.projects;
export const getProjectsPending = state => state.pending;
export const getProjectsError = state => state.error;
export const getProjectsOrderKeys = state => {
    let data = state.projects.projects;
    return state.projects.projects?(
    Object.keys(data).sort((a, b) => {
        return data[a].sort - data[b].sort;
      }) ) : [];
}


