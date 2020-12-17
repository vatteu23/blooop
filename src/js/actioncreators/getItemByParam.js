import {
  fetchItemByParamError,
  fetchItemByParamSuccess,
  fetchItemByParamPending,
} from "./../actions/index";
import { db } from "../../firebase";

function fetchItemByParam(param) {
  return (dispatch) => {
    dispatch(fetchItemByParamPending());
    let dbUser = db.ref("/users");
    let dbTag = db.ref("/tags");

    if (param.id) {
      let dref = db.ref("/items/" + param.id);

      dref.orderByChild("createdat").once("value", (snapshot) => {
        if (snapshot.val()) {
          let result = {
            itemDetails: null,
            userName: null,
            tags: null,
          };
          dbUser
            .orderByChild("user_id")
            .equalTo(snapshot.val().author)
            .once("value", (s) => {
              if (s.val()) {
                result.itemDetails = snapshot.val();
                result.userName = s.val()[
                  s.node_.children_.root_.key
                ].user_first_name;
                dbTag.orderByChild("createdat").once("value", (snapshot) => {
                  if (snapshot.val()) {
                    result.tags = snapshot.val();
                    dispatch(fetchItemByParamSuccess(result));
                  }
                });
              }
            });
        } else {
          dispatch(fetchItemByParamError("Fetch Error"));
        }
      });
    } else if (param.pagename) {
      let dref = db.ref("/items");

      dref
        .orderByChild("pagename")
        .equalTo(param.pagename)
        .once("child_added", (snapshot) => {
          if (snapshot.val()) {
            let result = {
              itemDetails: null,
              userName: null,
              tags: null,
            };
            dbUser
              .orderByChild("user_id")
              .equalTo(snapshot.val().author)
              .once("value", (s) => {
                if (s.val()) {
                  result.itemDetails = snapshot.val();
                  result.userName = s.val()[
                    s.node_.children_.root_.key
                  ].user_first_name;
                  dbTag.orderByChild("createdat").once("value", (snapshot) => {
                    if (snapshot.val()) {
                      result.tags = snapshot.val();
                      dispatch(fetchItemByParamSuccess(result));
                    }
                  });
                }
              });
          } else {
            dispatch(fetchItemByParamError("Fetch Error"));
          }
        });
    }
  };
}

export default fetchItemByParam;
