import {
  fetchItemByParamError,
  fetchItemByParamSuccess,
  fetchItemByParamPending,
} from "./../actions/index";
import { db } from "../../firebase";

function fetchItemByParam(param) {
  return (dispatch) => {
    dispatch(fetchItemByParamPending());

    if (param.id) {
      let dref = db.ref("/items/" + param.id);
      dref.orderByChild("createdat").once("value", (snapshot) => {
        if (snapshot.val()) {
          dispatch(fetchItemByParamSuccess(snapshot.val()));
        } else {
          dispatch(fetchItemByParamError("Fetch Error"));
        }
      });
    } else if (param.pagename) {
      let dref = db.ref("/items/" + param.id);
      dref
        .orderByChild("createdat")
        .equalTo(param.pagename)
        .once("value", (snapshot) => {
          if (snapshot.val()) {
            dispatch(fetchItemByParamSuccess(snapshot.val()));
          } else {
            dispatch(fetchItemByParamError("Fetch Error"));
          }
        });
    }
  };
}

export default fetchItemByParam;
