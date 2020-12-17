import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { db, fbStorage } from "../firebase";
import FileUploader from "react-firebase-file-uploader";
import AddTags from "../components/addTags";
import { Link } from "react-router-dom";
import { act } from "@testing-library/react";

import {
  getGroups,
  getGroupsError,
  getGroupsPending,
} from "../js/reducers/groupsReducer";
import fetchGroups from "../js/actioncreators/getGroups";
import {
  getItemByParam,
  getItemByParamError,
  getItemByParamPending,
} from "../js/reducers/itemByParamReducer";

import fetchItemByParam from "../js/actioncreators/getItemByParam";

import {
  getItems,
  getItemsError,
  getItemsPending,
} from "../js/reducers/itemsReducer";
import fetchItems from "../js/actioncreators/getItems";

import {
  getUserDetails,
  getUserDetailsPending,
  getUserDetailsError,
} from "../js/reducers/handleuserReducer";
import fetchUserDetails from "../js/actioncreators/getUserDetails";
import { each } from "jquery";

const mapStateToProps = (state) => ({
  itemError: getItemByParamError(state),
  itemPending: getItemByParamPending(state),
  item: getItemByParam(state),
  itemsError: getItemsError(state),
  items: getItems(state),
  itemsPending: getItemsPending(state),
  groupsError: getGroupsError(state),
  groups: getGroups(state),
  groupsPending: getGroupsPending(state),

  userDetailsError: getUserDetailsError(state),
  userDetails: getUserDetails(state),
  userDetailsPending: getUserDetailsPending(state),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchItems: fetchItems,
      fetchGroups: fetchGroups,
      fetchItemByParam: fetchItemByParam,
      fetchUserDetails: fetchUserDetails,
    },
    dispatch
  );

class EditItem extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      authenticated: false,
      user: null,
    };
  }

  componentDidMount = () => {
    document.title = "Edit Item";
    this.props.fetchItems();
    this.props.fetchGroups();
  };

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.item) {
      if (nextProps.item.itemDetails.title !== this.state.item_title) {
        this.updateForm(
          nextProps.item.itemDetails.title,
          nextProps.item.itemDetails.description,
          nextProps.item.itemDetails.groupid,
          nextProps.item.itemDetails.image,
          nextProps.item.itemDetails.url,
          nextProps.item.itemDetails.link
        );
      }
    }
  }

  updateForm = (title, description, groupid, image, url, link) => {
    this.setState({
      item_title: title,
      item_description: description,
      item_group: groupid,
      item_image: image,
      item_url: url,
      item_link: link,
    });
  };

  handleAddNewProject = (title, description, image, url, link, group) => {
    if (title && description && image && url && link && group) {
      db.ref("/items/" + this.state.item_selected).update(
        {
          title: title,
          description: description,
          author: this.props.uid,
          image: image,
          url: url,
          groupid: group,
          pagename: title.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"),
        },
        function (error) {
          if (error) {
            console.log("Unable to save data");
          } else {
            alert("Updated Item");
            window.location.reload();
          }
        }
      );
    } else {
      console.log("update fields");
    }
  };

  itemSelected = (e) => {
    //   if(e.target.value !== "" )
    this.setState({ item_selected: e.target.value });

    let param = {
      id: null,
      pagename: null,
    };

    if (e.target.value !== "") {
      param.id = e.target.value;
      this.props.fetchItemByParam(param);
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
                  Edit Item(Review or Blog)
                </h2>
              </div>

              <div className="col-12 my-5">
                <div className="form-group">
                  <select
                    className="form-control"
                    id="item_selected"
                    onChange={this.itemSelected}
                    value={this.state.item_selected || ""}
                  >
                    <option value="">SELECT ITEM</option>
                    {this.props.items.items
                      ? Object.keys(this.props.items.items).map((id) => {
                          let i = this.props.items.items;
                          return (
                            <option key={id} value={id}>
                              {i[id].title}
                            </option>
                          );
                        })
                      : null}
                  </select>
                </div>
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
                <div className="form-group">
                  <label htmlFor="item_url">Youtube Link </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.item_link || ""}
                    id="item_link"
                    placeholder="Youtube link"
                    onChange={this.updateState}
                  />
                </div>
                {this.props.groups.groups ? (
                  <div className="form-group">
                    <label htmlFor="item_group">SELECT GROUP</label>
                    <select
                      className="form-control"
                      value={this.state.item_group}
                      id="item_group"
                      onChange={this.updateState}
                    >
                      <option key={-1} value="">
                        SELECT GROUP
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
                      this.state.item_link,
                      this.state.item_group
                    )
                  }
                  className="btn btn-primary"
                >
                  UPDATE
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

              {this.props.item ? (
                <div className="col-12">
                  <AddTags
                    details={this.props.item.itemDetails}
                    dbref="items"
                    id={this.state.item_selected}
                    tags={this.props.item.tags}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditItem);
