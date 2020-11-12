import React, { Component } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";

class Email extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unreadCount: 0,
      cflist: false,
    };
  }

  componentDidMount = () => {

    this.getEmails();
  };


  getEmails = () => {
    const cf_ref = db.ref("/contactform");
    cf_ref.orderByChild("contactform_name").once("value", (snapshot) => {
      if (snapshot.val()) {
        this.setState({ cflist: snapshot });
      }
    });

    let unreadCount = 0;
    cf_ref
      .orderByChild("contactform_viewed")
      .equalTo(false)
      .once("value", function (snapshot) {
        return unreadCount;
      })
      .then((unreadCount) => {
        let count;
        if (unreadCount.val()) {
          count = Object.keys(unreadCount.val()).length;
        } else {
          count = 0;
        }
        this.setState({ unreadCount: count });

      });
  }


  updateEmailViewedStatus = (updateState,id) => {
    
    let cf_id = id;
    const cf_ref = db.ref("/contactform/" + cf_id);
    cf_ref.update({
      contactform_viewed: updateState
    },
      function (error) {
        if (error) {
          alert("Data could not be saved." + error);
        } else {
          alert("Updated Status Successfully.");
          
        }
      })

      this.getEmails();
  }


  getNumberOfDaysAgo = (date) => {
    const date2 = new Date(Date.now());
    const date1 = new Date(date);
    const diffTime = Math.abs(date2 - date1);

    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  render() {
    return (
      <React.Fragment>
        <div className="container page-content">
          {this.state.cflist ? (
            <div className="my-3">
              <h5 className="gradient-text">{this.state.unreadCount} unread email(s)</h5>
            </div>
          ) : null}
          <div className="list-group emails-list">
            {this.state.cflist
              ? Object.keys(this.state.cflist.val()).map((id) => {
                let cf = this.state.cflist.val();
                return (
                  <div  key={id} className={
                    "text-left list-group-item list-group-item-action no-text-decoration " +
                    (cf[id]["contactform_viewed"] ? " " : "email-unread")
                  }>
                    <Link
                     

                      to={{ pathname: `/emails/${[id]}` }}
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-2 text-dark">
                          <b>From:</b> {cf[id]["email"]}
                        </h6>
                        <small className="text-white">
                          {this.getNumberOfDaysAgo(cf[id]["created_at"])} day(s)
                          ago
                        </small>
                      </div>
                      <small className="text-white text-left">
                        <b>SUBJECT:</b> {cf[id]["message"]}
                      </small><br />

                    </Link>
                    {cf[id]["contactform_viewed"] ?
                      <button onClick={()=>{this.updateEmailViewedStatus(false,[id])}} className="btn btn-primary">Mark as Unread</button>
                      : <button onClick={()=>{this.updateEmailViewedStatus(true,[id])}} className="btn btn-primary">Mark as Read</button>}
                  </div>
                );
              })
              : null}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Email;
