import React, { Component } from "react";
import { connect } from "react-redux";
import { UPDATE_LOG } from "../js/actions/index";
import { Link } from "react-router-dom";
import CardButton from "../components/cardbutton";

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
                  Title="Add New Item"
                  Description="items are reviews or blogs"
                  Link="/addnewitem"
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
                  Title="Add New Group"
                  Description="Add Groups to assign categories to items"
                  Link="/addnewgroup"
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
