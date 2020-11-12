import React, { Component } from "react";
import { db } from "../firebase";
import { connect } from "react-redux";
import { UPDATE_LOG } from "../js/actions/index";

import { FaLinkedin, FaGithubSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import CardButton from "./cardbutton";

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    UPDATE_LOG: (PageName) => {
      dispatch(UPDATE_LOG(PageName));
    },
  };
};

class Contact extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      authenticated: false,
      user: null,
    };
  }

  componentDidMount = () => {
    document.title = "Contact | Uday Vatti";
    this.props.UPDATE_LOG("ContactPage");
  };

  handleAddNewProject = (full_name, message, email) => {
    if ((full_name, message, email)) {
      const contactID = db.ref("/contactform").push();
      contactID.set(
        {
          created_at: Date.now(),
          full_name: full_name,
          message: message,
          email: email,
          contactform_viewed: false,
        },
        function (error) {
          if (error) {
            console.log("Unable to save data");
          } else {
            alert("Request submitted successfully!! Thank you!!");
            window.location.reload();
          }
        }
      );
    } else {
      this.setState({ emptyerror: true });
    }
  };

  updateState = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <div className="content">
          <div className="container mt-4">
                
                <div className="d-flex flex-column align-items-center">
             
                <div className="d-flex flex-row mb-3">
                <h2 className="  gradient-text">Get In Touch</h2>
                  <a
                    href="https://www.linkedin.com/in/vattiu/"
                    className="ml-4 social"
                    target="_blank"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href="https://github.com/vatteu23"
                    className="ml-2 social"
                    target="_blank"
                  >
                    <FaGithubSquare />
                  </a>
                </div>
                <div className="mt-3 d-flex flex-column justify-content-center div-contact-form">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.full_name}
                      id="full_name"
                      placeholder="Full Name "
                      onChange={this.updateState}
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      type="textarea"
                      className="form-control"
                      value={this.state.message}
                      id="message"
                      placeholder="Message "
                      onChange={this.updateState}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.email}
                      id="email"
                      placeholder="Email "
                      onChange={this.updateState}
                    />
                  </div>

                  <button
                    onClick={() =>
                      this.handleAddNewProject(
                        this.state.full_name,
                        this.state.message,
                        this.state.email
                      )
                    }
                    className="btn btn-primary"
                  >
                    SUBMIT
                  </button>
                </div>

               
              </div>
              </div>
            
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
