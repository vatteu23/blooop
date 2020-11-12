
import {fetchProjectsPending, fetchProjectsSuccess, fetchProjectsError} from './../actions/index';
import {db} from '../../firebase';

function fetchProjects() {
    return dispatch => {
      
        dispatch(fetchProjectsPending());
        let dref = db.ref("/projects");
        dref.orderByChild("sort").once("value", (snapshot) => {
          
          if (snapshot) {
            dispatch(fetchProjectsSuccess(snapshot.val()));
          }else{
            dispatch(fetchProjectsError("Fetch Error"));
          }
        });
    }
}

export default fetchProjects;