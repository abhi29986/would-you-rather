import React, { Component, Fragment } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { GoSignOut } from "react-icons/go";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authedUserAction";
import User from "../user/User";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class NavBar extends Component {
  logout = e => {
    e.preventDefault();
    const { history, logoutUser } = this.props;
    //on logout returning back to login page page.
    history.push("/");
    logoutUser();
  };

  render() {
    const { authedUser } = this.props;

    return (
      <div>
        <Navbar className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <NavbarBrand tag={Link} to="/">
            WouldYouRather
          </NavbarBrand>
          {authedUser && (
            <Fragment>
              <Nav className="navbar-nav ml-auto">
                <NavItem>
                  <NavLink tag={Link} to="/leaderboard">
                    Leaderboard
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/add">
                    Add Question
                  </NavLink>
                </NavItem>
                <NavItem>
                  <User id={authedUser} />
                </NavItem>
                <NavItem>
                  <NavLink onClick={this.logout}>
                    {" "}
                    Logout <GoSignOut />
                  </NavLink>
                </NavItem>
              </Nav>
            </Fragment>
          )}
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authedUser: state.authedUser
  };
};

NavBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  authedUser: PropTypes.string,
  history: PropTypes.object.isRequired
};

// Different approach to pass mapDispatchToProps.
export default connect(mapStateToProps, { logoutUser })(withRouter(NavBar));
