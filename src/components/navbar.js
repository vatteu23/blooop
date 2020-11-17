import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { HamburgerCollapseReverse } from "react-animated-burgers";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNav: false,
    };
  }

  componentDidMount = () => {};
  showHamburgerMenu = (status) => {
    this.setState({ showNav: status });
  };

  render() {
    return (
      <React.Fragment>
        <nav className="p-0 navbar navbar-expand-sm navbar-light">
          <div className="container d-flex flex-column">
            <Link className="brand d-flex flex-row align-items-center" to="/">
              <img
                className="brand-logo mr-2"
                src="https://firebasestorage.googleapis.com/v0/b/blooop-bb011.appspot.com/o/images%2Flogo.jpg?alt=media&token=8b45ed58-6128-4bce-a872-ae8ea1766bc1"
              />
              <h4 className="ml-2 logo-text mb-0 gradient-text">BLoooP</h4>
            </Link>

            <HamburgerCollapseReverse
              className="navbar-toggler"
              buttonWidth={25}
              isActive={this.state.showNav}
              barColor="white"
              onClick={() => this.showHamburgerMenu(!this.state.showNav)}
            />

            <div
              className={
                this.state.showNav
                  ? "navbar-collapse collapse nav-show"
                  : "navbar-collapse collapse"
              }
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto">
                <li className="nav-item mx-2">
                  <NavLink
                    className="nav-link"
                    onClick={() => this.showHamburgerMenu(false)}
                    activeClassName="nav-link-selected"
                    to="/home"
                  >
                    REVIEWS
                  </NavLink>
                </li>
                <li className="nav-item mx-2">
                  <NavLink
                    className="nav-link"
                    onClick={() => this.showHamburgerMenu(false)}
                    activeClassName="nav-link-selected"
                    to="/about"
                  >
                    DEALS
                  </NavLink>
                </li>
                <li className="nav-item mx-2">
                  <NavLink
                    className="nav-link"
                    onClick={() => this.showHamburgerMenu(false)}
                    activeClassName="nav-link-selected"
                    to="/portfolio"
                  >
                    ABOUT
                  </NavLink>
                </li>
                <li className="nav-item mx-2">
                  <NavLink
                    className="nav-link"
                    onClick={() => this.showHamburgerMenu(false)}
                    activeClassName="nav-link-selected"
                    to="/contact"
                  >
                    SUPPORT US
                  </NavLink>
                </li>
                {/* <li className="nav-item mx-2">
                  <NavLink
                    className="nav-link"
                    onClick={() => this.showHamburgerMenu(false)}
                    activeClassName="nav-link-selected"
                    to="/products"
                  >
                    Products
                  </NavLink>
                </li> */}
              </ul>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;
