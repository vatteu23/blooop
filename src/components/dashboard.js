import React, { Component } from "react";
import { connect } from "react-redux";
import { UPDATE_LOG } from "../js/actions/index";
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
class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      authenticated: false,
      user: null,
    };
  }

  componentDidMount = () => {
    document.title = "Uday K Vatti | Web Developer";
    //this.props.UPDATE_LOG('HomePage');
  };

  render() {
    return (
      <React.Fragment>
        <div className="content">
          <div className="container pages">
            <h2 className="">Dashboard</h2>
            <div className="row mt-5">
              <div className="col-6 col-md-4">
                <CardButton
                  Title="Add New Project"
                  Description="projects will display on portfolio page"
                  Link="/addnewproject"
                />
              </div>
              <div className="col-6 col-md-4">
                <CardButton
                  Title="Add New Product"
                  Description="products will display on products page"
                  Link="/addnewproduct"
                />
              </div>
              <div className="col-6 col-md-4">
                <CardButton
                  Title="Website Stats"
                  Description="Website Views"
                  Link="/report"
                />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
