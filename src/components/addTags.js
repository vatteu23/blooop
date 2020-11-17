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
      ref: this.props.ref,
    });
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    if (this.props.details !== nextProps.details) {
      this.filterProjects(nextProps.ref, nextProps.details, nextProps.refid);
      return true;
    }
    return false;
  };

  updateProjects = () => {
    let newTagsList = [];
    if (this.state.selected.length > 0) {
      this.state.selected.map((res) => {
        return newTagsList.push(res.value);
      });
    }
    this.state.newTagsList.map((res) => {
      return newTagsList.push(res.value);
    });

    if (newTagsList.length > 0) {
      db.ref("/services/" + this.state.serviceId)
        .child("service_projects")
        .set(newTagsList);
      db.ref("/services/" + this.state.serviceId).once("value", (snapshot) => {
        if (snapshot.val()) {
          this.filterProjects(snapshot.val(), this.state.serviceId);
        }
      });
    }
    this.setState({ newTagsList: null });
  };

  filterProjects = (ref, details, refid) => {
    const ref = db.ref(ref);
    ref.once("value", (snapshot) => {
      if (snapshot.val()) {
        let tags = [],
          selected = [];
        Object.keys(snapshot.val()).map((id) => {
          if (details.tags) {
            details.tags.indexOf(id) >= 0
              ? selected.push({
                  label: snapshot.val()[id]["title"],
                  value: id,
                })
              : tags.push({
                  label: snapshot.val()[id]["title"],
                  value: id,
                });
          } else {
            tags.push({
              label: snapshot.val()[id]["title"],
              value: id,
            });
          }
        });
        this.setState({
          tags: tags,
          selected: selected,
          selectedTags: details.tags,
          refid: refid,
        });
        this.forceUpdate();
      }
    });
  };

  updateState = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  deleteProject = (id) => {
    let selected = this.state.selectedTags;
    let refid = this.state.refid;
    let index = selected.indexOf(id);
    if (selected.indexOf(id) >= 0) {
      selected.splice(index, 1);
      db.ref(this.state.ref + this.state.refid)
        .child("tags")
        .set(selected);

      db.ref(this.state.ref + refid).once("value", (snapshot) => {
        if (snapshot.val()) {
          this.filterProjects(snapshot.val(), refid);
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
              <h2>Add Projects to Service</h2>

              {this.state.selected ? (
                <div className="d-flex flex-row mb-3">
                  <p className="mr-2">Selected Projects:</p>
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
                Add Projects
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddProjectsToService;
