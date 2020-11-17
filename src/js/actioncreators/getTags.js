import {
  fetchTagsError,
  fetchTagsPending,
  fetchTagsSuccess,
} from "./../actions/index";
import { db } from "../../firebase";

function fetchTags() {
  return (dispatch) => {
    dispatch(fetchTagsPending());
    let dref = db.ref("/tags");
    dref.orderByChild("createdat").once("value", (snapshot) => {
      if (snapshot.val()) {
        dispatch(fetchTagsSuccess(snapshot.val()));
      } else {
        dispatch(fetchTagsError("Fetch Error"));
      }
    });
  };
}

export default fetchTags;
