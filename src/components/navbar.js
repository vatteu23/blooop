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
          <div className="container">
            <Link className="brand" to="/">
              <h6 className="logo-text mb-0 gradient-text">
                Uday <br /> Vatti
              </h6>
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
                    Home
                  </NavLink>
                </li>
                <li className="nav-item mx-2">
                  <NavLink
                    className="nav-link"
                    onClick={() => this.showHamburgerMenu(false)}
                    activeClassName="nav-link-selected"
                    to="/about"
                  >
                    About
                  </NavLink>
                </li>
                <li className="nav-item mx-2">
                  <NavLink
                    className="nav-link"
                    onClick={() => this.showHamburgerMenu(false)}
                    activeClassName="nav-link-selected"
                    to="/portfolio"
                  >
                    Portfolio
                  </NavLink>
                </li>
                <li className="nav-item mx-2">
                  <NavLink
                    className="nav-link"
                    onClick={() => this.showHamburgerMenu(false)}
                    activeClassName="nav-link-selected"
                    to="/contact"
                  >
                    Contact
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
