import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { db, fbStorage } from "../firebase";
import FileUploader from "react-firebase-file-uploader";
import { Link } from "react-router-dom";
import { act } from "@testing-library/react";

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

class AddNewItem extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      authenticated: false,
      user: null,
    };
  }

  componentDidMount = () => {
    document.title = "Add New Item";
    this.props.fetchGroups();
    //this.props.UPDATE_LOG('HomePage')
  };

  handleAddNewProject = (title, description, image, url, group) => {
    if (title && description && image && url && group) {
      const itemID = db.ref("/items").push();
      itemID.set(
        {
          createdat: Date.now(),
          title: title,
          description: description,
          author: this.props.uid,
          image: image,
          url: url,
          groupid: group,
          pagename: title.toLowerCase().replace(/ /g, "-"),
        },
        function (error) {
          if (error) {
            console.log("Unable to save data");
          } else {
            alert("Added New Project!!");
          }
        }
      );
    } else {
      console.log("update fields");
    }
  };

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = (progress) => {
    this.setState({ progress: progress });
  };

  handleUploadError = (error) => {
    this.setState({ isUploading: false });
    alert(error);
  };

  handleUploadSuccess = (filename) => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    fbStorage
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then((url) => this.setState({ avatarURL: url, item_image: url }));
  };

  updateState = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <div className="content">
          <div className="container pages">
            <div className="row">
              <div className="col-12">
                <h2 className="text-left theme-color-hover mb-3">
                  Add New Item(Review or Blog)
                </h2>
              </div>
              <div className="col-12 text-left">
                <div className="form-group">
                  <label htmlFor="item_title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.item_title || ""}
                    id="item_title"
                    placeholder="Title "
                    onChange={this.updateState}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="item_description">Description</label>
                  <textarea
                    className="form-control"
                    value={this.state.item_description || ""}
                    id="item_description"
                    placeholder="Description "
                    onChange={this.updateState}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="item_image">Image / Screenshot</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.item_image || ""}
                    id="item_image"
                    placeholder="Item Image "
                    onChange={this.updateState}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="item_url">Video Embed Url </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.item_url || ""}
                    id="item_url"
                    placeholder="Youtube Embed url"
                    onChange={this.updateState}
                  />
                </div>

                {this.props.groups.groups ? (
                  <div className="form-group">
                    <label htmlFor="item_group">SELECT GROUP</label>
                    <select
                      className="form-control"
                      value={this.state.item_group || ""}
                      id="item_group"
                      onChange={this.updateState}
                    >
                      <option key={-1} value="">
                        SELECT A SERVICE
                      </option>
                      {Object.keys(this.props.groups.groups).map(
                        (res, index) => {
                          let groups = this.props.groups.groups;
                          return (
                            <option key={index} value={res}>
                              {groups[res].title}
                            </option>
                          );
                        }
                      )}
                    </select>
                  </div>
                ) : null}

                <button
                  onClick={() =>
                    this.handleAddNewProject(
                      this.state.item_title,
                      this.state.item_description,
                      this.state.item_image,
                      this.state.item_url,
                      this.state.item_group
                    )
                  }
                  className="btn btn-primary"
                >
                  SUBMIT
                </button>
              </div>

              <div className="col-12 mt-5">
                <h5>Upload Image here</h5>

                {this.state.isUploading && (
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: this.state.progress + "%" }}
                    aria-valuenow={this.state.progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {this.state.progress}
                  </div>
                )}
                {this.state.avatarURL && (
                  <div className="uploaded image">
                    <label>Image:</label>
                    <a
                      target="_blank"
                      rel="noopener  noreferrer"
                      href={this.state.avatarURL}
                    >
                      <img
                        alt="new"
                        className="img img-fluid"
                        src={this.state.avatarURL}
                      />
                    </a>
                  </div>
                )}
                <FileUploader
                  accept="image/*"
                  name="avatar"
                  storageRef={fbStorage.ref("images")}
                  onUploadStart={this.handleUploadStart}
                  onUploadError={this.handleUploadError}
                  onUploadSuccess={this.handleUploadSuccess}
                  onProgress={this.handleProgress}
                />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewItem);
