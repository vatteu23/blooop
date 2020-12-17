import React, { Component } from "react";
import { db, fbStorage } from "../firebase";
import Select from "react-select";
import { Close } from "grommet-icons";

class AddProjectsToService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
    };
  }

  componentDidMount = () => {
    this.setState({
      details: this.props.details,
      ref: this.props.dbref,
      id: this.props.id,
      alltags: this.props.tags,
    });
    this.filterProjects(this.props.details, this.props.id, this.props.tags);
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    if (this.props.details !== nextProps.details) {
      this.filterProjects(nextProps.details, nextProps.id, nextProps.tags);
      return true;
    } else if (this.state != nextState) {
      return true;
    } else {
      return false;
    }
  };

  updateProjects = () => {
    let newTagsList = [];

    if (this.state.selected.length > 0) {
      this.state.selected.map((res) => {
        return newTagsList.push(res.value);
      });
    }
    if (this.state.newTagsList) {
      this.state.newTagsList.map((res) => {
        return newTagsList.push(res.value);
      });
    }

    if (newTagsList.length > 0) {
      db.ref("/" + this.state.ref + "/" + this.state.id)
        .child("tags")
        .set(newTagsList, (err) => {
          if (err) {
          } else {
            db.ref("/" + this.state.ref + "/" + this.state.id).once(
              "value",
              (snapshot) => {
                if (snapshot.val()) {
                  this.filterProjects(
                    snapshot.val(),
                    this.state.ref,
                    this.state.alltags
                  );
                }
              }
            );
          }
        });
    }
  };

  filterProjects = (details, refid, alltags) => {
    let tags = [],
      selected = [];

    Object.keys(alltags).map((id) => {
      if (details.tags) {
        if (details.tags.indexOf(id) >= 0) {
          selected.push({
            label: alltags[id]["title"],
            value: id,
          });
        } else {
          tags.push({
            label: alltags[id]["title"],
            value: id,
          });
        }
      } else {
        tags.push({
          label: alltags[id]["title"],
          value: id,
        });
      }
    });

    this.setState({
      tags: tags,
      selected: selected,
      selectedTags: details.tags,
      id: refid,
      newTagsList: null,
    });
    this.forceUpdate();
  };

  updateState = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  deleteProject = (id) => {
    let selected = this.state.selectedTags;
    let refid = this.state.id;
    let index = selected.indexOf(id);
    if (selected.indexOf(id) >= 0) {
      selected.splice(index, 1);

      db.ref("/" + this.state.ref + "/" + this.state.id)
        .child("tags")
        .set(selected, (error) => {
          if (error) {
            console.log(error);
            // The write failed...
          } else {
            db.ref("/" + this.state.ref + "/" + this.state.id).once(
              "value",
              (snapshot) => {
                if (snapshot.val()) {
                  this.filterProjects(
                    snapshot.val(),
                    refid,
                    this.state.alltags
                  );
                }
              }
            );
          }
        });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="container page-content">
          <div className="row">
            <div className="col-12 mb-3">
              <h2>Add Tags to Item</h2>

              {this.state.selected ? (
                <div className="d-flex flex-row mb-3">
                  <p className="mr-2">Selected Tags:</p>
                  {this.state.selected.map((res, id) => {
                    return (
                      <div key={id} className="mx-2">
                        <span
                          className="badge badge-pill badge-dark badge-tags"
                          onClick={() => {
                            this.deleteProject(res.value);
                          }}
                        >
                          {res.label}
                          <Close
                            className="social-icon ml-2"
                            color="white"
                          ></Close>
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : null}

              <Select
                onChange={(opt) => {
                  this.setState({ newTagsList: opt });
                }}
                options={this.state.tags}
                isMulti
              ></Select>
            </div>

            <div className="col-12">
              <button
                onClick={() => this.updateProjects()}
                className="btn btn-primary"
              >
                Add Tag(s)
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddProjectsToService;
