import React, { Component } from "react";
import { Route, Redirect, Switch, Link } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import NavBar from "./components/navbar";
import { fbAuth, fbFirestore } from "./firebase";
import Particles from "react-particles-js";
import { connect } from "react-redux";
import Dashboard from "./components/dashboard";
import Login from "./components/login";
import PrivateRoute from "./components/privateroute";
import CardButton from "./components/cardbutton";
import AddNewProject from "./components/addnewproject";
import AddNewProduct from "./components/addnewproduct";
import Portfolio from "./components/portfolio";
import Report from "./components/report";
import Contact from "./components/contact";
import ScrollToTop from "./components/scrolltotop";
import Email from "./components/email";
import About from "./components/about";
import Footer from './components/footer';
import Products from './components/products';
import { UPDATE_USER, SIGN_OUT } from "./js/actions/index";

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    UPDATE_USER: (user) => {
      dispatch(UPDATE_USER(user));
    },
    SIGN_OUT: () => {
      dispatch(SIGN_OUT());
    },
  };
};
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
    // fbFirestore.collection('email').add({
    //   to: "vuday23@gmail.com",
    //   message: {
    //     subject: 'Your reservation is here !',
    //     html: 'Hey This is your reservation for the event and it costs'
        
    //   }
    // }).then(() => console.log('Queued email for delivery!'));

    fbAuth.onAuthStateChanged((user) => {
      if (user) {
       
        this.props.UPDATE_USER(user);
        this.setState({
          authenticated: this.props.logs.authenticated,
          currentUser: this.props.logs.currentUser,
          loading: false,
        });
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
        <Particles
          className="particles-bg"
          params={{
            particles: {
              number: {
                value: 100,
                density: {
                  enable: true,
                  value_area: 1500,
                },
              },
              line_linked: {
                enable: true,
                opacity: 0.02,
              },
              move: {
                direction: "right",
                speed: 0.05,
              },
              size: {
                value: 1,
              },
              opacity: {
                anim: {
                  enable: true,
                  speed: 1,
                  opacity_min: 0.05,
                },
              },
            },
            interactivity: {
              events: {
                onclick: {
                  enable: true,
                  mode: "push",
                },
              },
              modes: {
                push: {
                  particles_nb: 1,
                },
              },
            },
            retina_detect: true,
          }}
        />
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
            path="/report"
            component={Report}
            authenticated={this.props.logs.authenticated}
            redirecturl="/report"
          />
          <PrivateRoute
            exact
            path="/dashboard"
            component={Dashboard}
            authenticated={this.props.logs.authenticated}
            redirecturl="/dashboard"
          />
          <PrivateRoute
            exact
            path="/addnewproject"
            component={AddNewProject}
            authenticated={this.props.logs.authenticated}
            redirecturl="/addnewproject"
          />
          <PrivateRoute
            exact
            path="/emails"
            component={Email}
            authenticated={this.props.logs.authenticated}
            redirecturl="/emails"
          />
          <PrivateRoute
            exact
            path="/addnewproduct"
            component={AddNewProduct}
            authenticated={this.props.logs.authenticated}
            redirecturl="/addnewproduct"
          />

          <Redirect to="/not-found" />
        </Switch>
        <Footer/>
        {this.props.logs.authenticated ? (
          <div className="container my-5">
            <div className="row">
              <div className="col-12">
                <div className="card admin-card">
                  <div className="card-header">{this.props.logs.currentUser}</div>
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
