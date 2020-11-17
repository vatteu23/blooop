import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { db, fbStorage } from "../firebase";
import {
  getGroups,
  getGroupsError,
  getGroupsPending,
} from "../js/reducers/groupsReducer";
import fetchGroups from "../js/actioncreators/getGroups";

const mapStateToProps = (state) => ({
  groupsError: getGroupsError(state),
  groups: getGroups(state),
  groupsPending: getGroupsPending(state),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchGroups: fetchGroups,
    },
    dispatch
  );

class AddNewGroup extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      authenticated: false,
      user: null,
      group_active: true,
    };
  }

  componentDidMount = () => {
    document.title = "Add New Group";
    //this.props.UPDATE_LOG('HomePage')
    this.props.fetchGroups();
  };

  // getGroups = () => {
  //   let dref = db.ref("/groups");
  //   dref.once("value", (snapshot) => {
  //     if (snapshot.val()) {
  //       this.setState({ groups: snapshot.val() });
  //     } else {
  //     }
  //   });
  // };

  updateKeyValue = (id, k, v) => {
    db.ref("/groups/" + id)
      .child(k)
      .set(v);
    this.props.fetchGroups();
  };

  handleAddNewGroup = (title, description, active) => {
    console.log(title);
    console.log(description);
    console.log(active);
    if (title && description && active) {
      const projectID = db.ref("/groups").push();
      projectID.set(
        {
          createdat: Date.now(),
          title: title,
          description: description,
          active: active,
        },
        function (error) {
          if (error) {
            console.log("Unable to save data");
          } else {
            alert("Added New Group!!");
          }
        }
      );
      this.props.fetchGroups();
    } else {
      this.setState({ errorMessage: "Please fill all the fields" });
    }
  };

  updateState = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <div className="content">
          <div className="container pages">
            <div className="admin-form">
              <div className="row">
                <div className="col-12">
                  <h2 className="text-left theme-color-hover mb-3">
                    Add New Group
                  </h2>
                </div>
                <div className="col-12 text-left">
                  <div className="form-group">
                    <label htmlFor="project_title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.group_title || ""}
                      id="group_title"
                      placeholder="Group Title "
                      onChange={this.updateState}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="group_description">Description</label>
                    <textarea
                      className="form-control"
                      value={this.state.group_description}
                      id="group_description"
                      placeholder="Group Description "
                      onChange={this.updateState}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="group_description">Active</label>
                    <select
                      className="form-control"
                      value={this.state.group_active}
                      id="group_active"
                      onChange={this.updateState}
                    >
                      <option value="true">TRUE</option>
                      <option value="false">FALSE</option>
                    </select>
                  </div>

                  <button
                    onClick={() =>
                      this.handleAddNewGroup(
                        this.state.group_title,
                        this.state.group_description,
                        this.state.group_active
                      )
                    }
                    className="btn btn-primary"
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>

            <div className="data-details mt-4">
              <h2 className="text-left theme-color-hover mt-5">
                Existing Groups
              </h2>
              <div className="list-group">
                {this.props.groups.groups ? (
                  <>
                    {Object.keys(this.props.groups.groups).map((res, index) => {
                      let groups = this.props.groups.groups;
                      return (
                        <div
                          key={index}
                          className="list-group-item d-flex flex-row"
                        >
                          <div className="d-flex flex-column">
                            <h5 className="text-left gradient-text">
                              {groups[res].title}
                            </h5>
                            <p className="text-left">
                              {groups[res].description}
                            </p>
                          </div>
                          <div className="ml-auto">
                            <div className="form-group">
                              <label htmlFor="group_description">Active</label>
                              <select
                                className="form-control"
                                value={groups[res].active}
                                id="e_group_active"
                                onChange={(e) => {
                                  this.updateKeyValue(
                                    res,
                                    "active",
                                    e.target.value
                                  );
                                }}
                              >
                                <option value="true">TRUE</option>
                                <option value="false">FALSE</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewGroup);
