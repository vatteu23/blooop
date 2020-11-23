import { combineReducers } from "redux";
import logs from "./logsReducer";
import projects from "./projectsReducer";
import emails from "./emailsReducer";
import groups from "./groupsReducer";
import items from "./itemsReducer";
import users from "./handleuserReducer";
import tags from "./tagsReducer";
import userActivity from "./userActivity";
import itemByParam from "./itemByParamReducer";

export default combineReducers({
  logs,
  projects,
  emails,
  groups,
  items,
  users,
  tags,
  userActivity,
  itemByParam,
});
