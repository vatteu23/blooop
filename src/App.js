import React, { Component } from "react";
import { Route, Redirect, Switch, Link } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import NavBar from "./components/navbar";
import { fbAuth, fbFirestore } from "./firebase";

import { bindActionCreators } from "redux";
import Particles from "react-particles-js";
import { connect } from "react-redux";
import Dashboard from "./pages/dashboard";
import Login from "./components/login";
import PrivateRoute from "./components/privateroute";
import CardButton from "./components/cardbutton";
import AddNewGroup from "./adminpages/addnewgroup";
import AddNewItem from "./adminpages/addnewitem";
import AddNewTag from "./adminpages/addnewtags";
import AddNewProduct from "./components/addnewproduct";
import Portfolio from "./components/portfolio";
import Report from "./components/report";
import Contact from "./components/contact";
import ScrollToTop from "./components/scrolltotop";
import Email from "./components/email";
import About from "./components/about";
import Footer from "./components/footer";
import Products from "./components/products";
import { UPDATE_USER, SIGN_OUT } from "./js/actions/index";
import {
  getUserDetails,
  getUserDetailsPending,
  getUserDetailsError,
} from "./js/reducers/handleuserReducer";
import fetchUserDetails from "./js/actioncreators/getUserDetails";

const mapStateToProps = (state) => ({
  userDetailsError: getUserDetailsError(state),
  userDetails: getUserDetails(state),
  userDetailsPending: getUserDetailsPending(state),
  useractivity: state.userActivity,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchUserDetails: fetchUserDetails,
      UPDATE_USER: UPDATE_USER,
      SIGN_OUT: SIGN_OUT,
    },
    dispatch
  );

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      authenticated: false,
      user: null,
    };
  }
  handleSignOut = () => {
    fbAuth
      .signOut()
      .then(() => {
        this.props.SIGN_OUT();
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  componentDidMount = () => {
    fbAuth.onAuthStateChanged((user) => {
      if (user) {
        this.props.UPDATE_USER(user);
        this.props.fetchUserDetails(user);
      } else {
        this.setState({
          authenticated: false,
          currentUser: null,
          loading: false,
        });
      }
    });
  };

  render() {
    return (
      <div className="App">
        <ScrollToTop />
        <NavBar />
        <Switch>
          <Route path="/admin-login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/portfolio" component={Portfolio} />
          <Route path="/contact" component={Contact} />
          <Route path="/about" component={About} />
          <Route path="/products" component={Products} />
          <Route path="/product/:productid" component={Products} />
          <PrivateRoute
            exact
            path="/addnewgroup"
            component={AddNewGroup}
            authenticated={this.props.useractivity.authenticated}
            redirecturl="/addnewgroup"
          />
          <PrivateRoute
            exact
            path="/addnewtag"
            component={AddNewTag}
            authenticated={this.props.useractivity.authenticated}
            redirecturl="/addnewtag"
          />
          <PrivateRoute
            exact
            path="/report"
            component={Report}
            authenticated={this.props.useractivity.authenticated}
            redirecturl="/report"
          />
          <PrivateRoute
            exact
            path="/dashboard"
            component={Dashboard}
            authenticated={this.props.useractivity.authenticated}
            redirecturl="/dashboard"
          />
          <PrivateRoute
            exact
            path="/addnewitem"
            component={() => (
              <AddNewItem uid={this.props.userDetails.user_id} />
            )}
            authenticated={this.props.useractivity.authenticated}
            redirecturl="/addnewitem"
          />
          <PrivateRoute
            exact
            path="/emails"
            component={Email}
            authenticated={this.props.useractivity.authenticated}
            redirecturl="/emails"
          />
          <PrivateRoute
            exact
            path="/addnewproduct"
            component={AddNewProduct}
            authenticated={this.props.useractivity.authenticated}
            redirecturl="/addnewproduct"
          />

          <Redirect to="/not-found" />
        </Switch>
        <Footer />
        {this.props.useractivity.authenticated ? (
          <div className="container my-5">
            <div className="row">
              <div className="col-12">
                <div className="card admin-card">
                  <div className="card-header">
                    {this.props.useractivity.currentUser}
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6">
                        <CardButton
                          Link="/dashboard"
                          Title="Dashboard"
                          Description=" "
                        />
                      </div>
                      <div className="col-6">
                        <CardButton
                          Link="/emails"
                          Title="Emails"
                          Description=" "
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="card-footer text-muted "
                    style={{ background: "transparent" }}
                  >
                    <input
                      type="button"
                      className="btn btn-danger mx-4"
                      value="SIGN OUT"
                      onClick={() => this.handleSignOut()}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
