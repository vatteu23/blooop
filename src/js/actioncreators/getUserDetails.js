import {
  fetchUserDetailsError,
  fetchUserDetailsPending,
  fetchUserDetailsSuccess,
} from "./../actions/index";
import { db } from "../../firebase";

function fetchUserDetails(user) {
  return (dispath) => {
    dispath(fetchUserDetailsPending());
    let dref = db.ref("/users/");
    dref
      .orderByChild("user_id")
      .equalTo(user.uid)
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          Object.keys(snapshot.val()).map((key) => {
            dispath(fetchUserDetailsSuccess(snapshot.val()[key]));
          });
        } else {
          createNewUser(user.uid, user.email);
          dref
            .orderByChild("user_id")
            .equalTo(user.uid)
            .once("value", (snapshot) => {
              if (snapshot.exists()) {
                Object.keys(snapshot.val()).map((key) => {
                  dispath(fetchUserDetailsSuccess(snapshot.val()[key]));
                });
              }
            });
        }
      });

    // dispath(fetchUserDetailsSuccess({ data: "test" }));
  };
}

const createNewUser = (uid, email) => {
  const userref = db.ref("/users").push();

  userref.set({
    user_id: uid,
    user_created_at: Date.now(),
    user_avatar: "",
    user_email: email,
    user_role: "Employee",
    user_designation: "",
    user_is_admin: false,
    user_first_name: "",
    user_last_name: "",
    user_active: true,
  });
};

export default fetchUserDetails;
