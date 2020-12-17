import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { db, fbStorage } from "../firebase";
import {
  getTags,
  getTagsError,
  getTagsPending,
} from "../js/reducers/tagsReducer";
import fetchTags from "../js/actioncreators/getTags";

const mapStateToProps = (state) => ({
  tagsError: getTagsError(state),
  tags: getTags(state),
  tagsPending: getTagsPending(state),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchTags: fetchTags,
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
    this.props.fetchTags();
  };

  updateKeyValue = (id, k, v) => {
    db.ref("/tags/" + id)
      .child(k)
      .set(v);
    this.props.fetchTags();
  };

  handleAddNewGroup = (title, description, active) => {
    if (title && description && active) {
      const projectID = db.ref("/tags").push();
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
            alert("Added New Tag!!");
          }
        }
      );
      this.props.fetchTags();
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
                    Add New Tag
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
                      placeholder="Tag Title "
                      onChange={this.updateState}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="group_description">Description</label>
                    <textarea
                      className="form-control"
                      value={this.state.group_description}
                      id="group_description"
                      placeholder="Tag Description "
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
                Existing Tags
              </h2>
              <div className="list-group">
                {this.props.tags.tags ? (
                  <>
                    {Object.keys(this.props.tags.tags).map((res, index) => {
                      let tags = this.props.tags.tags;
                      return (
                        <div
                          key={index}
                          className="list-group-item d-flex flex-row"
                        >
                          <div className="d-flex flex-column">
                            <h5 className="text-left gradient-text">
                              {tags[res].title}
                            </h5>
                            <p className="text-left">{tags[res].description}</p>
                          </div>
                          <div className="ml-auto">
                            <div className="form-group">
                              <label htmlFor="group_description">Active</label>
                              <select
                                className="form-control"
                                value={tags[res].active}
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
