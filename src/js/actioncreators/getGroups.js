import {
  fetchGroupsError,
  fetchGroupsPending,
  fetchGroupsSuccess,
} from "./../actions/index";
import { db } from "../../firebase";

function fetchGroups() {
  return (dispatch) => {
    dispatch(fetchGroupsPending());
    let dref = db.ref("/groups");
    dref.orderByChild("createdat").once("value", (snapshot) => {
      if (snapshot.val()) {
        dispatch(fetchGroupsSuccess(snapshot.val()));
      } else {
        dispatch(fetchGroupsError("Fetch Error"));
      }
    });
  };
}

export default fetchGroups;
