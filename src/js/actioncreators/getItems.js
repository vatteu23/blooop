import {
  fetchItemsError,
  fetchItemsPending,
  fetchItemsSuccess,
} from "./../actions/index";
import { db } from "../../firebase";

function fetchItems() {
  return (dispatch) => {
    dispatch(fetchItemsPending());
    let dref = db.ref("/items");
    dref.orderByChild("createdat").once("value", (snapshot) => {
      if (snapshot.val()) {
        dispatch(fetchItemsSuccess(snapshot.val()));
      } else {
        dispatch(fetchItemsError("Fetch Error"));
      }
    });
  };
}

export default fetchItems;
