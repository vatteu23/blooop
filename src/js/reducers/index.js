import { combineReducers } from 'redux'
import logs from './logsReducer'
import projects from './projectsReducer'
import emails from './emailsReducer'

export default combineReducers({
  logs,
  projects,
  emails
})
