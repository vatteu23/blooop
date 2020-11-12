import React, { Component } from "react";
import { connect } from "react-redux";
import { UPDATE_LOG } from "../js/actions/index";
import { Link } from "react-router-dom";

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
class Home extends Component {
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
    this.props.UPDATE_LOG("HomePage");
  };

  render() {
    return (
      <React.Fragment>
        <div className="home-content">
          <div className="container h-100 justify-content-center d-flex flex-column align-items-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/portfolio-react-f2bc7.appspot.com/o/images%2Favatar.png?alt=media&token=e5152858-5ec0-4523-bf9d-24a16d35dce6"
              className="img img-fluid avatar"
            />
            <h1 className="theme-color-hover">
              Hello, I'm <span  className="gradient-text">Uday Vatti.</span>
              <br />
              <span style={{ fontSize: "2rem" }}>I'm a Web Developer.</span>
            </h1>
            <br />
            <Link to="/portfolio" className="d-block btn btn-primary">
              View my work
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
